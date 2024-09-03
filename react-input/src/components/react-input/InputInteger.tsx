import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  memo,
  useState,
  useContext,
} from "react";
import { CustomValidation, Integer, ReactInputContextProps } from "../types";
import { vMinValue } from "../../utils/vMinValue";
import { vMaxValue } from "../../utils/vMaxValue";
import { vInteger } from "../../utils/vInteger";
import { separate } from "../../utils/Separate";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import After from "../elements/After";
import Before from "../elements/Before";
import Loading from "../elements/Loading";
import Title from "../elements/Title";
import Wrapper from "../elements/Wrapper";

export const InputInteger = memo(
  forwardRef((_: Integer, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);
    const customized: ReactInputContextProps | undefined =
      useContext(ReactInputContext);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current && inputRef.current.value) {
          return inputRef.current?.value.replace(_.separator ?? "", "") ?? "";
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

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef?.current?.value ?? ""));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);
      vInteger({ ref: inputRef });

      if (_.separator) separate({ ref: inputRef, seperator: _.separator });

      if (
        _.validationOn == "submit-blur-change" ||
        _.validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef?.current?.value ?? ""));
    };

    const checkValidation = (currentValue: string): boolean => {
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
            currentValue: currentValue.replace(_.separator ?? "", ""),
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          res = false;
      });

      if (
        _.minValue &&
        !vMinValue({
          currentValue: currentValue.replace(_.separator ?? "", ""),
          minValue: _.minValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.minValue ?? undefined,
        })
      )
        res = false;

      if (
        _.maxValue &&
        !vMaxValue({
          currentValue: currentValue.replace(_.separator ?? "", ""),
          maxValue: _.maxValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.maxValue ?? undefined,
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
          className={`${
            isValid ? "" : `${_.notValidClassName ?? "input-not-valid"}`
          } ${_.disabled ? _.disabledClassName : ""} ${_.className}`}
          type="text"
          title={_.title}
          placeholder={_?.placeholder ?? ""}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          disabled={_.disabled}
        />
      </>
    );
    if (!_.componentStructure)
      return (
        <>
          <Wrapper className={_.wrapperClassName}>
            <Before className={_.beforeClassName} before={_.before} />
            {input}
            <Title title={_.title} className={_.titleClassName} />
            <Loading
              className={_.loadingClassName}
              isLoading={_.loading}
              loadingObject={_.loadingObject}
            />
            {_.validationComponent && _.validationComponent({ errors: errors })}
            <After className={_.afterClassName} after={_.after} />
          </Wrapper>
        </>
      );

    return renderComponent(
      _.componentStructure,
      input,
      _.validationComponent,
      _.title,
      _.before,
      _.after,
      _.wrapperClassName,
      _.beforeClassName,
      _.loadingClassName,
      _.titleClassName,
      _.afterClassName,
      _.loading,
      _.loadingObject,
      errors
    );
  })
);
