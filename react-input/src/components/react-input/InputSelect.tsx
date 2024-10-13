import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import { vCustomValidation } from "../../utils/vCustomValidation";
import { CustomValidation, ReactInputContextProps, Select } from "../types";
import { vRequired } from "../../utils";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import { renderComponent } from "../../utils/RenderComponent";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { Wrapper } from "../elements/Wrapper";

export const InputSelect = memo(
  forwardRef((_: Select, ref: any) => {
    const [value, setValue] = React.useState<
      OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
    >(_?.defaultValue);
    const [inputValue, setInputValue] = React.useState<string>();
    const [isValid, setIsValid] = useState<boolean>(true);

    const inputRef = useRef<any>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: ReactInputContextProps | undefined =
      useContext(ReactInputContext);

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
          if (_.validationOn != "submit" || !isValid)
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
        if (_.validationOn == "submit-blur-change" || !isValid)
          setIsValid(checkValidation(value));
      }
    }, [value]);

    const onBlur = (e?: any) => {
      if (
        _.validationOn == "submit-blur" ||
        _.validationOn == "submit-blur-change"
      )
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
    const input: React.ReactNode = (
      <>
        <ReactSelect
          unstyled={_.unstyled}
          onInputChange={(e: any) => setInputValue(e)}
          menuPortalTarget={_.portal}
          ref={inputRef}
          isDisabled={_.disabled}
          noOptionsMessage={() => _.noOptionsMessage}
          id={_.id}
          placeholder={_.placeholder}
          defaultValue={_?.defaultValue}
          classNamePrefix={_?.classNamePrefix}
          className={`${_.disabled ? _.disabledClassName : ""} ${
            isValid
              ? ""
              : `${
                  _.notValidClassName ? _.notValidClassName : "input-not-valid"
                }`
          } ${_.fullWidth ? "w-full" : ""}`}
          options={_.options}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isMulti={_.multiple}
          menuIsOpen={_.menuIsOpen}
          isOptionDisabled={_.isOptionDisabled}
          isOptionSelected={_.isOptionSelected}
        />
      </>
    );

    if (!_.componentStructure)
      return (
        <>
          <Wrapper
            className={`${_.wrapperClassName} ${
              (value && !_.multiple) ||
              (_.multiple && value && value.length != 0) ||
              inputValue
                ? "has-value"
                : ""
            }`}
          >
            <Before className={_.beforeClassName} before={_.before} />
            <Title title={_.title} className={_.titleClassName} />
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
      `${_.wrapperClassName} ${
        (value && !_.multiple) ||
        (_.multiple && value && value.length != 0) ||
        inputValue
          ? "has-value"
          : ""
      }`,
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

{
  /* <div
  className={`${_.wrapperClassName} ${
    (value && value?.length > 0) || inputValue ? "value" : ""
  } `}
></div>; */
}
