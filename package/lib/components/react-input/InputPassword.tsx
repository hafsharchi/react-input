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
  Password,
  InputMasterContextProps,
  InputRef,
} from "../types";
import { vMaxLength } from "../../utils/vMaxLength";
import { vMinLength } from "../../utils/vMinLength";
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

export const InputPassword = memo(
  forwardRef<InputRef<string>, Password>((_, ref) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>(_?.defaultValue?.toString() ?? "");

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        inputRef.current.value = _.defaultValue;
    }, [_.defaultValue, _.updateDefaultValueOnChange]);

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
    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.value ?? "";
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
        return false;
      },
    }));

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (e?.target.value !== undefined) {
        setValue(e.target.value);
      }
      if (_.maxLength && inputRef.current) {
        vMaxLength({ 
          ref: inputRef as React.RefObject<HTMLInputElement | HTMLTextAreaElement>, 
          maxLength: _.maxLength 
        });
      }

      if (validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
      if (_.onChange) _.onChange(inputRef.current?.value);
    };

    const onBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (_.maxLength && inputRef.current) {
        vMaxLength({ 
          ref: inputRef as React.RefObject<HTMLInputElement | HTMLTextAreaElement>, 
          maxLength: _.maxLength 
        });
      }

      if (
        validationOn == "submit-blur-change" ||
        validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef.current?.value ?? ""));
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

    const input: React.ReactNode = (
      <>
        <div
          className={cn(
            customized?.defaultProps?.togglePasswordVisibilityClassName ?? "",
            _.togglePasswordVisibilityClassName
          )}
          onClick={togglePassword}
        >
          {showPassword ? hideIcon : showIcon}
        </div>
        <input
          defaultValue={_.defaultValue}
          ref={inputRef}
          id={_.id}
          className={`${
            isValid
              ? ""
              : `${cn(
                  customized?.defaultProps?.notValidClassName,
                  _.notValidClassName
                )}`
          } ${cn(
            customized?.defaultProps?.disabledClassName,
            _.disabledClassName
          )} ${cn(customized?.defaultProps?.className, _.className)}`}
          type={showPassword ? "text" : "password"}
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
