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
  Checkbox,
  ComponentDescriptor,
  InputMasterContextProps,
} from "../types";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import { vRequired } from "../../utils";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { Loading } from "../elements/Loading";
import { Before } from "../elements/Before";
import { After } from "../elements/After";
import { renderComponent } from "../../utils/RenderComponent";
import { cn } from "../../utils/cn";

export const InputCheckbox = memo(
  forwardRef((_: Checkbox, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        inputRef.current.checked = _.defaultValue;
    }, [_.defaultValue]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);
    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";
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

      if (validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(inputRef?.current?.checked ?? false));
    };

    const onBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onBlur) _.onBlur(e);

      if (
        validationOn == "submit-blur-change" ||
        validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(inputRef?.current?.checked ?? false));
    };

    const checkValidation = (currentValue: boolean): boolean => {
      var res = true;
      if (
        !vRequired({
          required: _.required,
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
            : `${cn(
                customized?.defaultProps?.notValidClassName ?? "",
                _.notValidClassName
              )}`
        } ${
          _.disabled
            ? cn(
                customized?.defaultProps?.disabledClassName ?? "",
                _.disabledClassName ?? ""
              )
            : ""
        } ${cn(customized?.defaultProps?.className ?? "", _.className ?? "")}`}
        type="checkbox"
        title={_.title}
        placeholder={_?.placeholder ?? ""}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        disabled={_.disabled}
      />
    );

    if (!_.componentStructure && !customized?.defaultProps?.componentStructure)
      return (
        <>
          <Wrapper
            className={cn(
              customized?.defaultProps?.wrapperClassName,
              _.wrapperClassName
            )}
          >
            <Before
              className={cn(
                customized?.defaultProps?.beforeClassName,
                _.beforeClassName
              )}
              before={_.before}
            />
            <Title
              tag="label"
              htmlFor={
                _.titleClickable ? _.id ?? `${_.name}_checkbox` : undefined
              }
              title={_.title}
              className={cn(
                customized?.defaultProps?.titleClassName,
                _.titleClassName
              )}
            />
            {input}
            <Loading
              isLoading={_.loading}
              loadingObject={
                _.loadingObject ?? customized?.defaultProps?.loadingObject
              }
              className={cn(
                customized?.defaultProps?.loadingClassName,
                _.loadingClassName
              )}
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
                customized?.defaultProps?.afterClassName,
                _.afterClassName
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
      errors
    );
  })
);
