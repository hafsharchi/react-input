import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, ReactInputContextProps } from "../types";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vRequired } from "../../utils";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { Loading } from "../elements/Loading";
import { Before } from "../elements/Before";
import { After } from "../elements/After";
import { renderComponent } from "../../utils/RenderComponent";

export const InputCheckbox = memo(
  forwardRef((_: Checkbox, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        inputRef.current.checked = _.defaultValue;
    }, [_.defaultValue]);

    const customized: ReactInputContextProps | undefined =
      useContext(ReactInputContext);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.checked ?? "";
        }
      },
      updateValue: (newValue: boolean) => {
        if (inputRef.current) {
          inputRef.current.checked = newValue;
          onChange();
        }
      },
      checkValidation: () => {
        if (inputRef.current) {
          setIsValid(checkValidation(inputRef.current.checked ?? false));
          return checkValidation(inputRef.current.checked ?? false);
        }
      },
    }));

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) _.onChange(e);

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef?.current?.checked ?? false));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (
        _.validationOn == "submit-blur-change" ||
        _.validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef?.current?.checked ?? false));
    };

    const checkValidation = (currentValue: boolean): boolean => {
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

      return res;
    };

    const input: React.ReactNode = (
      <input
        defaultValue={_.defaultValue}
        id={_.id ? _.id : `${_.name}_checkbox`}
        ref={inputRef}
        className={`${
          isValid
            ? ""
            : `${_.notValidClassName ? _.notValidClassName : "input-not-valid"}`
        }${_.disabled && _.disabledClassName ? _.disabledClassName : ""}${
          _.className ? _.className : ""
        }`}
        type="checkbox"
        title={_.title}
        placeholder={_?.placeholder ?? ""}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        disabled={_.disabled}
      />
    );

    if (!_.componentStructure)
      return (
        <>
          <Wrapper className={_.wrapperClassName}>
            <Before className={_.beforeClassName} before={_.before} />
            <Title
              tag="label"
              htmlFor={
                _.titleClickable ? _.id ?? `${_.name}_checkbox` : undefined
              }
              title={_.title}
              className={_.titleClassName}
            />
            {input}
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
