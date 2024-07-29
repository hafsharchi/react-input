import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CustomValidation, ReactInputContextProps, Text } from "../types";
import { vMaxLength } from "../../utils/validations/vMaxLength";
import { vMinLength } from "../../utils/validations/vMinLength";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/validations/vCustomValidation";

const InputText = memo(
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

      if (_.maxLength) vMaxLength({ event: e, maxLength: _.maxLength });

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(e.target?.value ?? ""));
    };

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (_.maxLength) vMaxLength({ event: e, maxLength: _.maxLength });

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

export default InputText;
