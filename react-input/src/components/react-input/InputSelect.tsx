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
} from "../types";
import { vRequired } from "../../utils";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import { renderComponent } from "../../utils/RenderComponent";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";
import { cn } from "../../utils/cn";

export const InputSelect = memo(
  forwardRef((_: Select, ref: any) => {
    const [value, setValue] = React.useState<
      OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
    >(_?.defaultValue);
    const [inputValue, setInputValue] = React.useState<string>();
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<any>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

    const validationOn = _.validationOn
      ? _.validationOn
      : customized?.defaultProps?.validationOn ?? "submit";

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    type ddd = { label: string; value: string };
    const prevDefaultValueRef = useRef<ddd>();

    useEffect(() => {
      if (
        inputRef.current &&
        _.updateDefaultValueOnChange &&
        _.defaultValue &&
        _.defaultValue?.value != prevDefaultValueRef.current?.value
      ) {
        setValue(_.defaultValue);
        prevDefaultValueRef.current = _.defaultValue;
      }
    }, [_.defaultValue]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (value) {
          if (_.multiple && value.length <= 0) return "";
          return value;
        }
        return "";
      },
      updateValue: (
        newValue: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
      ) => {
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
      },
    }));

    const onChange = (e?: any) => {
      setHasChanged(true);
      if (_.onChange) _.onChange(e);
      setValue(e);
    };

    useEffect(() => {
      if (hasChanged) {
        if (_.onChange && value) _.onChange(value);
        if (validationOn == "submit-blur-change" || !isValid)
          setIsValid(checkValidation(value));
      }
    }, [value]);

    const onBlur = (e?: any) => {
      if (validationOn == "submit-blur" || validationOn == "submit-blur-change")
        setIsValid(checkValidation(value));
      if (_.onBlur) _.onBlur(e);
    };

    const checkValidation = (currentValue: any): boolean => {
      if (Array.isArray(currentValue) && currentValue.length === 0) {
        currentValue = null;
      }

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

      return res;
    };

    const {
      portal,
      disabled,
      disabledClassName,
      onChange: _onChange,
      onBlur: _onBlur,
      onInputChange,
      register,
      name,
      type,
      after,
      afterClassName,
      before,
      beforeClassName,
      className,
      title,
      titleClassName,
      loading,
      loadingClassName,
      loadingObject,
      multiple,
      componentStructure,
      wrapperClassName,
      validationComponent,
      validationOn: v,
      notValidClassName,
      ...rest
    } = _;

    const input: React.ReactNode = (
      <>
        <ReactSelect
          onInputChange={(e) => {
            setInputValue(e);
            if (onInputChange) onInputChange;
          }}
          components={
            _.components ? _.components : customized?.defaultProps?.components
          }
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
            )} ${
              (value && !_.multiple) ||
              (_.multiple && value && value.length != 0) ||
              inputValue
                ? "has-value"
                : ""
            }`}
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
              _.validationComponent({ errors: errors })
            ) : customized?.defaultProps?.validationComponent ? (
              customized?.defaultProps?.validationComponent({ errors: errors })
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
      )} ${
        (value && !_.multiple) ||
        (_.multiple && value && value.length != 0) ||
        inputValue
          ? "has-value"
          : ""
      }`,
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
      value && value.length > 0
    );
  })
);
