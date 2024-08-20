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

export const InputSelect = memo(
  forwardRef((_: Select, ref: any) => {
    const [value, setValue] = React.useState<
      OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
    >(_?.defaultValue);
    const [inputValue, setInputValue] = React.useState<string>();

    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<any>(null);

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: ReactInputContextProps | undefined = useContext(
      ReactInputContext
    );

    useEffect(() => {
      console.log(inputValue);
    }, [inputValue]);

    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return value;
        }
      },
      updateValue: (
        newValue: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
      ) => {
        if (inputRef.current) {
          setValue(newValue);
          checkValidation(newValue);
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
        checkValidation(value);
      }
    }, [value]);

    const onBlur = (e?: any) => {
      checkValidation(value);
      if (_.onBlur) _.onBlur(e);
    };

    const checkValidation = (currentValue: any): boolean => {
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

      return res;
    };
    return (
      <>
        <div
          className={`${_.wrapperClassName} ${
            value && value?.length > 0 || inputValue ? "value" : ""
          } `}
        >
          <ReactSelect
            unstyled
            onInputChange={(e : any) => setInputValue(e)}
            menuPortalTarget={_.portal}
            ref={inputRef}
            isDisabled={_.disabled}
            noOptionsMessage={() => _.noOptionsMessage}
            id={_.id}
            placeholder={_.placeholder}
            defaultValue={_?.defaultValue}
            classNamePrefix={_?.classNamePrefix}
            className={`${
              isValid ? "" : `${_.notValidClassName ?? "input-not-valid"}`
            } ${_.fullWidth && "w-full"}`}
            options={_.options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isMulti={_.multiple}
            menuIsOpen
          />
          <div className={_.titleClassName}>{_.title}</div>

          {_.validationComponent && _.validationComponent({ errors: errors })}
        </div>
      </>
    );
  })
);
