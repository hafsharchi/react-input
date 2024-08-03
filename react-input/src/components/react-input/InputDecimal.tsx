import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { vMinValue } from "../../utils/vMinValue";
import { vMaxValue } from "../../utils/vMaxValue";
import { separate } from "../../utils/Separate";
import { vDecimal } from "../../utils/vDecimal";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { CustomValidation, Decimal, ReactInputContextProps } from "../types";
import { vRequired } from "../../utils";

export const InputDecimal = memo(
  forwardRef((_: Decimal, ref: any) => {
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
          // .replace(_.separator,"")
        }
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
        }
      },
    }));

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) _.onChange(e);
      vDecimal({ ref: inputRef });
      if (_.separator) separate({ ref: inputRef, seperator: _.separator });

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (
        _.validationOn == "submit-blur-change" ||
        _.validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    const checkValidation = (currentValue: string): boolean => {
      var res = true;

      if (
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
    return (
      <>
        <div className={_.wrapperClassName}>
          <div className={_.titleClassName}>{_.title}</div>
          <div className="flex items-center">
            {_.before && <div className={_.beforeClassName}>{_.before}</div>}
            <input
              ref={inputRef}
              className={`${
                isValid ? "" : `${_.notValidClassName ?? "input-not-valid"}`
              } ${_.className}`}
              type="text"
              title={_.title}
              placeholder={_.placeholder}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur(e)}
              disabled={_.disabled}
            />
            {_.after && <div className={_.afterClassName ?? ""}>{_.after}</div>}
          </div>

          {_.validationComponent && _.validationComponent({ errors: errors })}
        </div>
      </>
    );
  })
);
