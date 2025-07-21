import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import { vRequired } from "../../utils";
import { cn } from "../../utils/cn";
import { formatValue } from "../../utils/FormatValue";
import { handleMask } from "../../utils/HandleMask";
import { renderComponent } from "../../utils/RenderComponent";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vMaxLength } from "../../utils/vMaxLength";
import { vMinLength } from "../../utils/vMinLength";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import {
  ComponentDescriptor,
  CustomValidation,
  InputMasterContextProps,
  InputRef,
  MaskPattern,
  Text,
} from "../types";

export const InputText = memo(
  forwardRef<InputRef<string>, Text>((_, ref) => {
    const placeholderChar = _.placeholderChar ?? "_";
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

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
      formatValue(
        _?.defaultValue ?? "",
        maskArray,
        tokens,
        _.guide,
        placeholderChar
      )
    );
    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current.value.replaceAll(placeholderChar, "");
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
      if (_.mask) {
        handleMask({
          inputValue: e.target.value,
          event: e,
          guide: _.guide,
          maskPattern: maskArray,
          maskTokens: tokens,
          placeholderChar: placeholderChar,
          currentMaskedValue: maskedValue,
          updateMaskedValue: setMaskedValue,
          keepCharPositions: _.keepCharPositions,
          overwrite: _.overwrite,
        });
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
      setIsFocused(false);
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
    const handleFocus = () => {
      setIsFocused(true);
    };

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
            tokens,
            _.guide,
            placeholderChar
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
      _.guide,
      placeholderChar,
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
        onMouseDown={(e) => {
          if (!isFocused) {
            const firstPlaceHolderPosition: number =
              inputRef?.current?.value.indexOf(placeholderChar) ?? 0;
            e.preventDefault();
            inputRef?.current?.focus();
            inputRef?.current?.setSelectionRange(
              firstPlaceHolderPosition,
              firstPlaceHolderPosition
            );
          }
        }}
        onClick={() => {
          setIsFocused(true);
        }}
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
      Boolean(maskedValue)
    );
  })
);
