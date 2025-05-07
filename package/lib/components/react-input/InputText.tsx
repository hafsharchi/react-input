import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ComponentDescriptor,
  CustomValidation,
  InputMasterContextProps,
  Text,
  InputRef,
  MaskPattern,
} from "../types";
import { vMaxLength } from "../../utils/vMaxLength";
import { vMinLength } from "../../utils/vMinLength";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vRequired } from "../../utils";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { Loading } from "../elements/Loading";
import { Before } from "../elements/Before";
import { After } from "../elements/After";
import { renderComponent } from "../../utils/RenderComponent";
import { cn } from "../../utils/cn";
import { formatValue } from "../../utils/FormatValue";
import { extractRawValue } from "../../utils/ExtractRawValue";

export const InputText = memo(
  forwardRef<InputRef<string>, Text>((_, ref) => {
    // const placeholderChar = "_"; //%
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);
    const [value, setValue] = useState<string>(
      _?.defaultValue?.toString() ?? ""
    );

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    const maskPattern: MaskPattern =
      typeof _.mask === "string"
        ? { pattern: _.mask, tokens: { "9": /\d/ } }
        : _.mask ?? { pattern: "", tokens: { "9": /\d/ } };

    const { pattern: maskText, tokens = { "9": /\d/ } } = maskPattern;

    const maskArray = maskText.split("");

    const [maskedValue, setMaskedValue] = useState(
      formatValue(_?.defaultValue ?? "", maskArray, tokens)
    );
    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.value;
        }
        return "";
      },
      updateValue: (newValue: string) => {
        if (inputRef.current) {
          inputRef.current.value = newValue;
          // onChange();
        }
      },
      checkValidation: () => {
        if (inputRef.current) {
          setIsValid(checkValidation(inputRef.current.value ?? ""));
          return checkValidation(inputRef.current.value ?? "");
        }
        return false;
      },
    }));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      if (_.mask) {
        if (inputValue.length < maskedValue.length) {
          const start = e.target.selectionStart;
          const parts = [
            inputValue.slice(0, start ?? 0),
            inputValue.slice(start ?? 0),
          ];
          const withUnderlineValue =
            parts[0] +
            "_".repeat(maskedValue.length - inputValue.length) +
            parts[1];
          if (_.keepCharPositions) {
            inputValue = withUnderlineValue;
          } else {
            inputValue = extractRawValue(withUnderlineValue, maskArray, tokens);
          }
        } else if (inputValue.length > maskedValue.length) {
          const start = e.target.selectionStart ?? 0;
          inputValue = inputValue.slice(0, start) + inputValue.slice(start + 1);
        }
        
        const newMaskedValue = formatValue(inputValue, maskArray, tokens);
        // const newRawValue = extractRawValue(inputValue, maskArray, tokens);
        // setValue(newRawValue);
        setMaskedValue(newMaskedValue);
        if (inputRef.current) {
          const start = e.target.selectionStart;
          e.target.value = newMaskedValue;
          e.target.setSelectionRange(start, start);
          setValue(newMaskedValue);
        }
      }

      // const newCaretPosition = e?.target.selectionStart || 0;
      // setCaretPosition(newCaretPosition);

      if (inputRef.current) {
        if (_.maxLength) {
          vMaxLength({
            ref: inputRef as React.RefObject<
              HTMLInputElement | HTMLTextAreaElement
            >,
            maxLength: _.maxLength,
          });
        }
      }

      if (validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
      if (_.onChange) _.onChange(inputRef.current?.value);
      // e.target.setSelectionRange(1, 1);
    };

    const onBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (_.maxLength && inputRef.current) {
        vMaxLength({
          ref: inputRef as React.RefObject<
            HTMLInputElement | HTMLTextAreaElement
          >,
          maxLength: _.maxLength,
        });
      }

      if (
        validationOn == "submit-blur-change" ||
        validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    // Handle focus event
    const handleFocus = () => {};

    const checkValidation = (currentValue: string): boolean => {
      const res = true;

      if (
        !vRequired({
          required: _.required,
          currentValue: currentValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.required,
        })
      )
        return false;

      _.customValidations?.forEach((customValidation: CustomValidation) => {
        if (
          !vCustomValidation({
            currentValue: currentValue,
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          return false;
      });

      if (
        _.minLength &&
        !vMinLength({
          currentValue: currentValue,
          minLength: _.minLength,
          setErrors: setErrors,
          error: customized?.validationErrors?.minLength ?? undefined,
        })
      )
        return false;
      return res;
    };

    useEffect(() => {
      if (_.defaultValue && _.updateDefaultValueOnChange) {
        if (_.mask) {
          const initialMaskedValue = formatValue(
            _.defaultValue,
            maskArray,
            tokens
          );
          setMaskedValue(initialMaskedValue);
          if (inputRef.current) {
            inputRef.current.value = initialMaskedValue;
          }
        } else if (inputRef.current) {
          inputRef.current.value = _.defaultValue;
        }
      }
    }, [
      _.defaultValue,
      _.updateDefaultValueOnChange,
      _.mask,
      maskArray,
      tokens,
    ]);

    const input: React.ReactNode = (
      <input
        defaultValue={_.mask ? maskedValue : _.defaultValue}
        id={_.id}
        ref={inputRef}
        className={`${
          isValid
            ? ""
            : `${cn(
                customized?.defaultProps?.notValidClassName ?? "",
                _.notValidClassName ?? ""
              )}`
        } ${
          _.disabled
            ? cn(
                customized?.defaultProps?.disabledClassName ?? "",
                _.disabledClassName ?? ""
              )
            : ""
        } ${cn(customized?.defaultProps?.className ?? "", _.className ?? "")}`}
        // type="text"
        title={_.title}
        placeholder={_?.placeholder ?? ""}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        onFocus={handleFocus}
        disabled={_.disabled}
      />
    );

    if (!_.componentStructure && !customized?.defaultProps?.componentStructure)
      return (
        <>
          <Wrapper
            className={`${cn(
              customized?.defaultProps?.wrapperClassName ?? "",
              _.wrapperClassName ?? ""
            )}`}
          >
            <Before
              className={cn(
                customized?.defaultProps?.beforeClassName ?? "",
                _.beforeClassName ?? ""
              )}
              before={_.before}
            />
            <Title
              title={_.title}
              className={cn(
                customized?.defaultProps?.titleClassName ?? "",
                _.titleClassName ?? ""
              )}
            />
            {input}
            <Loading
              className={cn(
                customized?.defaultProps?.loadingClassName ?? "",
                _.loadingClassName
              )}
              isLoading={_.loading}
              loadingObject={
                _.loadingObject ?? customized?.defaultProps?.loadingObject
              }
            />
            {_.validationComponent ? (
              React.createElement(_.validationComponent, { errors: errors })
            ) : customized?.defaultProps?.validationComponent ? (
              React.createElement(customized.defaultProps.validationComponent, {
                errors: errors,
              })
            ) : (
              <></>
            )}
            <After
              className={cn(
                customized?.defaultProps?.afterClassName ?? "",
                _.afterClassName ?? ""
              )}
              after={_.after}
            />
          </Wrapper>
        </>
      );

    return renderComponent(
      _.componentStructure
        ? _.componentStructure
        : (customized?.defaultProps?.componentStructure as ComponentDescriptor),
      input,
      _.validationComponent
        ? _.validationComponent
        : customized?.defaultProps?.validationComponent,
      _.title,
      _.before,
      _.after,
      cn(
        customized?.defaultProps?.wrapperClassName ?? "",
        _.wrapperClassName ?? ""
      ),
      cn(
        customized?.defaultProps?.beforeClassName ?? "",
        _.beforeClassName ?? ""
      ),
      cn(
        customized?.defaultProps?.loadingClassName ?? "",
        _.loadingClassName ?? ""
      ),
      cn(
        customized?.defaultProps?.titleClassName ?? "",
        _.titleClassName ?? ""
      ),
      cn(
        customized?.defaultProps?.afterClassName ?? "",
        _.afterClassName ?? ""
      ),
      _.loading,
      _.loadingObject ?? customized?.defaultProps?.loadingObject,
      errors,
      Boolean(value)
    );
  })
);
