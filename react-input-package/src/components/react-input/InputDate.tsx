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
    const [value, setValue] = useState<any>(_?.defaultValue);

    const inputRef = useRef<any>();

    const [errors, setErrors] = React.useState<Array<string>>([]);

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
      <div
        className={`${_.wrapperClassName} ${
          value && value != "" ? "value" : ""
        } `}
      >
        <DatePicker
          portal={_.portal != undefined && _.portal != false}
          ref={inputRef}
          disabled={_.disabled == true ? true : false}
          value={value}
          calendar={persian}
          locale={_?.locale == "persian" ? persian_fa : undefined}
          onOpenPickNewDate={false}
          inputClass={`${_.className} ${_.fullWidth && "w-full"} ${_.disabled?_.disabledClassName:''} ${
            isValid ? "" : "input-not-valid"
          }`}
          minDate={_.minDate ?? undefined}
          maxDate={_.maxDate ?? undefined}
          onChange={(e: any) => onChange(e)}
          format={_.format}
          onlyMonthPicker={_.onlyMonth}
          editable={false}
          range={_.range}
          className={_.class}
          containerClassName={`${_.fullWidth && "w-full"} flex date-container`}
          rangeHover
          dateSeparator={_.dateSeparator}
          arrow={false}
        />
        <div className={_.titleClassName}>{_.title}</div>
        {_.loading && (
          <div className={_.loadingClassName}>{_.loadingObject}</div>
        )}
        {_.validationComponent && _.validationComponent({ errors: errors })}
      </div>
    );
  })
);
