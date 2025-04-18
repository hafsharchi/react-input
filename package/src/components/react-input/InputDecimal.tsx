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
  Decimal,
  InputMasterContextProps,
  InputRef,
} from "../types";
import { vMinValue } from "../../utils/vMinValue";
import { vMaxValue } from "../../utils/vMaxValue";
import { separate } from "../../utils/Separate";
import { vDecimal } from "../../utils/vDecimal";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import { Wrapper } from "../elements/Wrapper";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { cn } from "../../utils/cn";
import { toEnglishNubmer } from "../../utils/pa2e";

export const InputDecimal = memo(
  forwardRef<InputRef<string>, Decimal>((_, ref) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>(
      _?.defaultValue?.toString() ?? ""
    );

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);
    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        inputRef.current.value = _.defaultValue;
      if (inputRef.current) {
        separate({ ref: inputRef as React.RefObject<HTMLInputElement>, seperator: _.separator ?? "" });
      }
    }, [_.defaultValue, _.updateDefaultValueOnChange, _.separator]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current && inputRef.current.value) {
          return (
            inputRef.current?.value?.replaceAll(_.separator ?? "", "") ?? ""
          );
        }
        return "";
      },
      updateValue: (newValue: string) => {
        if (inputRef.current) {
          inputRef.current.value = newValue;
          onChange();
        }
      },
      checkValidation: () => {
        if (inputRef.current) {
          const result = checkValidation(inputRef.current.value ?? "");
          setIsValid(result);
          return result;
        }
        return false;
      },
    }));

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        toEnglishNubmer({ ref: inputRef as React.RefObject<HTMLInputElement> });
      }

      setValue(e?.target.value ?? "");

      if (inputRef.current) {
        vDecimal({ ref: inputRef as React.RefObject<HTMLInputElement> });
        if (_.separator) separate({ ref: inputRef as React.RefObject<HTMLInputElement>, seperator: _.separator });
      }

      if (validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    const onBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (
        validationOn == "submit-blur-change" ||
        validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    const checkValidation = (currentValue: string): boolean => {
      if (
        currentValue == "-" ||
        currentValue == "." ||
        currentValue[currentValue.length - 1] == "."
      )
        return false;
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
            currentValue: currentValue.replaceAll(_.separator ?? "", ""),
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          return false;
      });
      if (
        _.minValue != undefined &&
        _.minValue != null &&
        !vMinValue({
          currentValue: currentValue.replaceAll(_.separator ?? "", ""),
          minValue: _.minValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.minValue ?? undefined,
        })
      )
        return false;

      if (
        _.maxValue != undefined &&
        _.maxValue != null &&
        !vMaxValue({
          currentValue: currentValue.replaceAll(_.separator ?? "", ""),
          maxValue: _.maxValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.maxValue ?? undefined,
        })
      )
        return false;

      return res;
    };

    const input: React.ReactNode = (
      <>
        <input
          defaultValue={_.defaultValue}
          ref={inputRef}
          id={_.id}
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
          } ${cn(
            customized?.defaultProps?.className ?? "",
            _.className ?? ""
          )}`}
          type="text"
          title={_.title}
          placeholder={_?.placeholder ?? ""}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          disabled={_.disabled}
        />
      </>
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
              React.createElement(customized.defaultProps.validationComponent, { errors: errors })
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
