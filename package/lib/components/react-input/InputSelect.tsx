/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import {
  ComponentDescriptor,
  CustomValidation,
  InputMasterContextProps,
  Select,
  InputRef,
  SelectValue,
  OptionType,
} from "../types";
import { vRequired } from "../../utils";
import ReactSelect, {
  GroupBase,
  SelectInstance,
  SingleValue,
  MultiValue,
} from "react-select";
import { renderComponent } from "../../utils/RenderComponent";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { cn } from "../../utils/cn";

export const InputSelect = memo(
  forwardRef<InputRef<SelectValue>, Select>((_, ref) => {
    const [value, setValue] = React.useState<SelectValue>(_?.defaultValue);
    const [inputValue, setInputValue] = React.useState<string>();
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef =
      useRef<SelectInstance<OptionType, boolean, GroupBase<OptionType>>>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    const prevDefaultValueRef = useRef<OptionType | undefined>(undefined);

    useEffect(() => {
      if (
        inputRef.current &&
        _.updateDefaultValueOnChange &&
        _.defaultValue &&
        Array.isArray(_.defaultValue) &&
        _.defaultValue[0]?.value !== prevDefaultValueRef.current?.value
      ) {
        setValue(_.defaultValue);
        prevDefaultValueRef.current = _.defaultValue[0] as OptionType;
      }
    }, [_.defaultValue, _.updateDefaultValueOnChange]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (value) {
          if (_.multiple && Array.isArray(value) && value.length <= 0)
            return undefined;
          return value;
        }
        return undefined;
      },
      updateValue: (newValue: SelectValue) => {
        if (inputRef.current) {
          setValue(newValue);
          if (validationOn != "submit" || !isValid)
            setIsValid(checkValidation(newValue));
        }
      },
      checkValidation: () => {
        if (inputRef.current) {
          setIsValid(checkValidation(value));
          return checkValidation(value);
        }
        return false;
      },
    }));

    const [hasChanged, setHasChanged] = useState(false);

    const onChange = (
      newValue: SingleValue<OptionType> | MultiValue<OptionType>
    ) => {
      setHasChanged(true);
      setValue(newValue);
    };

    useEffect(() => {
      if (hasChanged) {
        if (validationOn == "submit-blur-change" || !isValid)
          setIsValid(checkValidation(value));
        if (_.onChange) _.onChange(value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const onBlur = (e?: React.FocusEvent<HTMLDivElement>) => {
      if (validationOn == "submit-blur" || validationOn == "submit-blur-change")
        setIsValid(checkValidation(value));
      if (_.onBlur) _.onBlur(e);
    };

    const checkValidation = (currentValue: SelectValue): boolean => {
      if (Array.isArray(currentValue) && currentValue.length === 0) {
        currentValue = undefined;
      }

      const res = true;

      if (
        !vRequired({
          required: _.required,
          currentValue: currentValue ? String(currentValue) : "",
          setErrors: setErrors,
          error: customized?.validationErrors?.required,
        })
      )
        return false;

      _.customValidations?.forEach((customValidation: CustomValidation) => {
        if (
          !vCustomValidation({
            currentValue: currentValue ? String(currentValue) : "",
            setErrors: setErrors,
            customValidation: customValidation,
          })
        )
          return false;
      });

      return res;
    };

    // Destructure only what we need
    const {
      onInputChange,
      components,
      menuPortalTarget,
      classNamePrefix,
      className,
      onChange: changeHandler,
      unstyled,
      noOptionsMessage,
      onBlur: blurHandler,
      ...rest
    } = _;

    const input: React.ReactNode = (
      <>
        <ReactSelect<OptionType, boolean, GroupBase<OptionType>>
          onInputChange={(e, x) => {
            setInputValue(e);
            if (onInputChange) onInputChange(e, x);
          }}
          components={_.components}
          menuPortalTarget={
            _.portal ? _.portal : customized?.defaultProps?.portal
          }
          classNamePrefix={
            _.classNamePrefix
              ? _.classNamePrefix
              : customized?.defaultProps?.classNamePrefix ?? ""
          }
          ref={inputRef}
          isDisabled={_.disabled}
          className={`${
            _.disabled
              ? cn(
                  customized?.defaultProps?.disabledClassName ?? "",
                  _.disabledClassName ?? ""
                )
              : ""
          } ${
            isValid
              ? ""
              : `${
                  _.notValidClassName
                    ? cn(
                        customized?.defaultProps?.notValidClassName ?? "",
                        _.notValidClassName ?? ""
                      )
                    : ""
                }`
          } ${cn(customized?.defaultProps?.className, _.className ?? "")}`}
          value={value}
          onChange={onChange}
          unstyled={_.unstyled ?? customized?.defaultProps?.unstyled ?? false}
          noOptionsMessage={
            customized?.defaultProps?.noOptionsMessage ?? _.noOptionsMessage
          }
          onBlur={onBlur}
          isMulti={_.multiple}
          {...rest}
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
            )} `}
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
                _.loadingClassName ?? ""
              )}
              isLoading={_.loading}
              loadingObject={
                _.loadingObject
                  ? _.loadingObject
                  : customized?.defaultProps?.loadingObject ?? ""
              }
            />
            {_.validationComponent ? (
              React.createElement(_.validationComponent, { errors: errors })
            ) : customized?.defaultProps?.validationComponent ? (
              React.createElement(customized.defaultProps.validationComponent, {
                errors: errors,
              })
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
      `${cn(
        customized?.defaultProps?.wrapperClassName ?? "",
        _.wrapperClassName ?? ""
      )}`,
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
      _.loadingObject
        ? _.loadingObject
        : customized?.defaultProps?.loadingObject,
      errors,
      Boolean(
        (value && !_.multiple) ||
          (_.multiple && Array.isArray(value) && value.length > 0) ||
          inputValue
      )
    );
  })
);
