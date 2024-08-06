import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Date, ReactInputContextProps } from "../types";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { vRequired } from "../../utils";

export const InputDate = memo(
  forwardRef((_: Date, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const [value, setValue] = useState<any>();

    const inputRef = useRef<any>();

    // const handleDatePickerClose = useCallback(() => {
      // inputRef.current.closeCalendar();
    // }, [inputRef]);
    // useOnClickOutside(inputRef, handleDatePickerClose);

    const [errors, setErrors] = useState<Array<string>>([]);

    const customized: ReactInputContextProps | undefined = useContext(
      ReactInputContext
    );

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return `${value}`;
      },
      updateValue: (newValue: any) => {
        setValue(newValue);
      },
      checkValidation: () => {
        return checkValidation(value);
      },
    }));

    const onChange = (e?: any) => {
      setValue(e);
      setIsValid(checkValidation(e));
    };

    useEffect(() => {
      if (_.onChange) _.onChange(value);
    }, [value]);

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
      return res;
    };

    return (
      <>
        <div className={_.wrapperClassName}>
          <div className={_.titleClassName}>{_.title}</div>
          <div className="flex items-center">
            {_.before && <div className={_.beforeClassName}>{_.before}</div>}
            <DatePicker
              ref={inputRef}
              disabled={_.disabled == true ? true : false}
              value={value}
              calendar={persian}
              locale={_?.locale == "persian" ? persian_fa : undefined}
              onOpenPickNewDate={false}
              inputClass={`${_.className} ${isValid ? "" : "input-not-valid"}`}
              minDate={_.minDate ?? undefined}
              maxDate={_.maxDate ?? undefined}
              onChange={(e: any) => onChange(e)}
              format={_.format}
              onlyMonthPicker={_.onlyMonth}
              editable={false}
              range={_.range}
              className={_.class}
              rangeHover
              dateSeparator={_.dateSeparator}
            />
            {_.after && <div className={_.afterClassName ?? ""}>{_.after}</div>}
          </div>

          {_.validationComponent && _.validationComponent({ errors: errors })}
        </div>
      </>
    );
  })
);
