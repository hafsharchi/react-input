import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  memo,
  useState,
  useContext,
  useEffect,
} from "react";
import { ComponentDescriptor, CustomValidation, Integer, ReactInputContextProps } from "../types";
import { vMinValue } from "../../utils/vMinValue";
import { vMaxValue } from "../../utils/vMaxValue";
import { vInteger } from "../../utils/vInteger";
import { separate } from "../../utils/Separate";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vMaxLength, vMinLength, vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { cn } from "../../utils/cn";

export const InputInteger = memo(
  forwardRef((_: Integer, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);
    const customized: ReactInputContextProps | undefined =
      useContext(ReactInputContext);

    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        inputRef.current.value = _.defaultValue;
      separate({ ref: inputRef, seperator: _.separator ?? "" });
    }, [_.defaultValue]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current && inputRef.current.value) {
          return (
            inputRef.current?.value.replaceAll(_.separator ?? "", "") ?? ""
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
          setIsValid(checkValidation(inputRef.current.value ?? ""));
          return checkValidation(inputRef.current.value ?? "");
        }
      },
    }));

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) _.onChange(e);
      vInteger({ ref: inputRef });
      if (_.separator) separate({ ref: inputRef, seperator: _.separator });

      if (_.maxLength) vMaxLength({ ref: inputRef, maxLength: _.maxLength });

      if (validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef?.current?.value ?? ""));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);
      vInteger({ ref: inputRef });

      if (_.separator) separate({ ref: inputRef, seperator: _.separator });

      if (
        validationOn == "submit-blur-change" ||
        validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef?.current?.value ?? ""));
    };

    const checkValidation = (currentValue: string): boolean => {
      if (currentValue == "-") return false;
      var res = true;

      if (
        _.required &&
        !vRequired({
          currentValue: currentValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.required,
        })
      )
        res = false;

      _.customValidations?.forEach((customValidation: CustomValidation) => {
        if (
          !vCustomValidation({
            currentValue: currentValue.replaceAll(_.separator ?? "", ""),
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          res = false;
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
        res = false;

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
        res = false;

      if (
        _.minLength &&
        !vMinLength({
          currentValue: currentValue,
          minLength: _.minLength,
          setErrors: setErrors,
          error: customized?.validationErrors?.minLength ?? undefined,
        })
      )
        res = false;
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
              : `${
                  _.notValidClassName ? _.notValidClassName : "input-not-valid"
                }`
          } ${_.disabled && _.disabledClassName ? _.disabledClassName : ""} ${
            _.className ? _.className : ""
          }`}
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
              _.validationComponent({ errors: errors })
            ) : customized?.defaultProps?.validationComponent ? (
              customized?.defaultProps?.validationComponent({ errors: errors })
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
      _.validationComponent,
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
      errors
    );
  })
);
