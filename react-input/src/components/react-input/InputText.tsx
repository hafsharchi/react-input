import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CustomValidation, ReactInputContextProps, Text } from "../types";
import { vMaxLength } from "../../utils/vMaxLength";
import { vMinLength } from "../../utils/vMinLength";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vRequired } from "../../utils";

export const InputText = memo(
  forwardRef((_: Text, ref: any) => {
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

      if (_.maxLength) vMaxLength({ ref: inputRef, maxLength: _.maxLength });

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (_.maxLength) vMaxLength({ ref: inputRef, maxLength: _.maxLength });

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
            currentValue: currentValue,
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          res = false;
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
