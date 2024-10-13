import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Calendar, ReactInputContextProps } from "../types";
import { ReactInputContext } from "../../contexts/ReactInputContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import { Wrapper } from "../elements/Wrapper";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";

export const InputDate = memo(
  forwardRef((_: Calendar, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const [value, setValue] = useState<any>(_?.defaultValue);

    const inputRef = useRef<any>();

    const [errors, setErrors] = React.useState<Array<string>>([]);

    const customized: ReactInputContextProps | undefined =
      useContext(ReactInputContext);

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        setValue(_.defaultValue);
    }, [_.defaultValue]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (value) {
          if (typeof value == "string") return value;
          var date: Date | string = new Date(value);
          if (_.locale == "english") {
            date = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(date);
          } else {
            date = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(value);
          }
          return date;
        }
        return "";
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
      <>
        <DatePicker
          portal={_.portal != undefined && _.portal != false}
          ref={inputRef}
          id={_.id}
          disabled={_.disabled == true ? true : false}
          value={value}
          placeholder={_.placeholder}
          calendar={persian}
          locale={_?.locale == "persian" ? persian_fa : undefined}
          onOpenPickNewDate={false}
          inputClass={`${_.className ? _.className : ""} ${
            _.fullWidth ? "w-full" : ""
          } ${_.disabled && _.disabledClassName ? _.disabledClassName : ""} ${
            isValid
              ? ""
              : `${
                  _.notValidClassName ? _.notValidClassName : "input-not-valid"
                }`
          }`}
          minDate={_.minDate ?? undefined}
          maxDate={_.maxDate ?? undefined}
          onChange={(e: any) => onChange(e)}
          format={_.format}
          onlyMonthPicker={_.onlyMonth}
          editable={_.editable}
          range={_.range}
          className={_.class}
          containerClassName={`${_.fullWidth && "w-full"} flex date-container`}
          rangeHover
          dateSeparator={_.dateSeparator}
          arrow={false}
        />
      </>
    );
    if (!_.componentStructure)
      return (
        <>
          <Wrapper
            className={`${_.wrapperClassName} ${
              value && value != "" ? "value" : ""
            } `}
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
      `${_.wrapperClassName} ${value && value != "" ? "value" : ""} `,
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
