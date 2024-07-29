import React,{
  forwardRef,
  useImperativeHandle,
  useRef,
  memo,
  useState,
  useContext,
} from "react";
import { CustomValidation, Integer, ReactInputContextProps } from "../types";
import { vMinValue } from "../../utils/validations/vMinValue";
import { vMaxValue } from "../../utils/validations/vMaxValue";
import { vInteger } from "../../utils/validations/vInteger";
import { separate } from "../../utils/Separate";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/validations/vCustomValidation";

const InputInteger = memo(
  forwardRef((_: Integer, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);
    const customized: ReactInputContextProps | undefined = useContext(
      ReactInputContext
    );

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.value;
        }
      },
      updateValue: (newValue: string) => {
        if (inputRef.current) {
          inputRef.current.value = newValue;
          checkValidation(newValue);
        }
      },
      checkValidation: () => {
        if (inputRef.current) {
          setIsValid(checkValidation(inputRef.current.value ?? ""));
        }
      },
    }));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) _.onChange(e);
      vInteger({ event: e });
      if (_.separator) separate({ event: e, seperator: _.separator });

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(e.target?.value ?? ""));
    };

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);
      vInteger({ event: e });
      
      if (_.separator) separate({ event: e, seperator: _.separator });

      if (
        _.validationOn == "submit-blur-change" ||
        _.validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(e.target?.value ?? ""));
    };

    const checkValidation = (currentValue: string): boolean => {
      var res = true;

      _.customValidations?.forEach((customValidation: CustomValidation) => {
        if (
          !vCustomValidation({
            currentValue: currentValue,
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          res = false;
      });

      if (
        _.minValue &&
        !vMinValue({
          currentValue: currentValue,
          minValue: _.minValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.minValue ?? undefined,
        })
      )
        res = false;

      if (
        _.maxValue &&
        !vMaxValue({
          currentValue: currentValue,
          maxValue: _.maxValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.maxValue ?? undefined,
        })
      )
        res = false;

      return res;
    };

    return (
      <>
        <div className={_.wrapperClassname}>
          <div className={_.titleClassName}>{_.title}</div>
          <input
            ref={inputRef}
            className={`${
              isValid ? "" : `${_.notValidClassname ?? "input-not-valid"}`
            } ${_.className}`}
            type="text"
            title={_.title}
            placeholder={_.placeholder}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
          />
          {_.validationComponent && _.validationComponent({ errors: errors })}
        </div>
      </>
    );
  })
);

export default InputInteger;
