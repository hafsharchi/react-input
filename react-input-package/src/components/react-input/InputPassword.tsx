import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CustomValidation, Password, ReactInputContextProps } from "../types";
import { vMaxLength } from "../../utils/vMaxLength";
import { vMinLength } from "../../utils/vMinLength";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import { Wrapper } from "../elements/Wrapper";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";

export const InputPassword = memo(
  forwardRef((_: Password, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const showIcon = _.showIcon ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-eye"
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
    const hideIcon = _.hideIcon ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-eye-off"
      >
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
        <path d="m2 2 20 20" />
      </svg>
    );

    const [errors, setErrors] = useState<Array<string>>([]);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = () => {
      setShowPassword((prev: boolean) => !prev);
    };
    const customized: ReactInputContextProps | undefined = useContext(
      ReactInputContext
    );

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.value ?? "";
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

    const input: React.ReactNode = (
      <>
        <input
          defaultValue={_.defaultValue}
          ref={inputRef}
          className={`${
            isValid ? "" : `${_.notValidClassName ?? "input-not-valid"}`
          } ${_.disabled ? _.disabledClassName : ""} ${_.className}`}
          type={showPassword ? "text" : "password"}
          title={_.title}
          placeholder={_?.placeholder ?? ""}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          disabled={_.disabled}
        />
        <div
          className={`toggle-password-visibility ${_.togglePasswordVisibilityClassName}`}
          onClick={togglePassword}
        >
          {showPassword ? hideIcon : showIcon}
        </div>
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
