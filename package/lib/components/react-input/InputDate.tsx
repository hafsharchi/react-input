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
  Calendar,
  CalendarValue,
  ComponentDescriptor,
  InputMasterContextProps,
  InputRef,
} from "../types";
import { InputMasterContext } from "../../contexts/InputMasterContext";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { vRequired } from "../../utils";
import { renderComponent } from "../../utils/RenderComponent";
import { Wrapper } from "../elements/Wrapper";
import { After } from "../elements/After";
import { Before } from "../elements/Before";
import { Loading } from "../elements/Loading";
import { Title } from "../elements/Title";
import { cn } from "../../utils/cn";
import { p2e } from "../../utils/pa2e";

export const InputDate = memo(
  forwardRef<InputRef<CalendarValue>, Calendar>((_, ref) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const convertToDateObject = (date: CalendarValue | CalendarValue[]) => {
      if (Array.isArray(date)) {
        return date.map(
          (d) =>
            new DateObject({
              date: d,
              calendar: _.locale === "persian" ? persian : undefined,
              locale: _.locale === "persian" ? persian_fa : undefined,
            })
        );
      } else {
        return new DateObject({
          date: date,
          calendar: _.locale === "persian" ? persian : undefined,
          locale: _.locale === "persian" ? persian_fa : undefined,
        });
      }
    };
    const [value, setValue] = useState<DateObject | DateObject[] | undefined>(
      convertToDateObject(_.defaultValue)
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = React.useState<Array<string>>([]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

    useEffect(() => {
      if (inputRef.current && _.updateDefaultValueOnChange && _.defaultValue)
        setValue(convertToDateObject(_.defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_.defaultValue, _.updateDefaultValueOnChange]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (value) {
          return p2e(value.toString());
        }
        return "";
      },
      updateValue: (newValue: CalendarValue | CalendarValue[]) => {
        setValue(convertToDateObject(newValue));
      },
      checkValidation: () => {
        setIsValid(checkValidation(value?.toString()));
        return checkValidation(value?.toString());
      },
    }));

    const onChange = (e: DateObject) => {
      console.log(e);
      setValue(e);
      setIsValid(checkValidation(e?.toString()));
    };

    useEffect(() => {
      if (_.onChange) _.onChange(value?.toString());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const checkValidation = (currentValue?: CalendarValue): boolean => {
      let res = true;
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
    const portal = _.portal != undefined;
    const defaultPortal = customized?.defaultProps?.portal != undefined;
    const input: React.ReactNode = (
      <>
        <DatePicker
          portal={_.portal == undefined ? defaultPortal : portal}
          ref={inputRef}
          id={_.id}
          disabled={_.disabled == true ? true : false}
          value={value}
          placeholder={_.placeholder}
          calendar={_?.locale == "persian" ? persian : undefined}
          locale={_?.locale == "persian" ? persian_fa : undefined}
          onOpenPickNewDate={false}
          zIndex={_.zIndex}
          inputClass={`${cn(
            customized?.defaultProps?.className ?? "",
            _.className ?? ""
          )} ${
            _.disabled
              ? cn(
                  customized?.defaultProps?.disabledClassName ?? "",
                  _.disabledClassName ?? ""
                )
              : ""
          } ${
            isValid
              ? ""
              : `${cn(
                  customized?.defaultProps?.notValidClassName ?? "",
                  _.notValidClassName ?? ""
                )}`
          }`}
          minDate={_.minDate ?? undefined}
          maxDate={_.maxDate ?? undefined}
          onChange={(e: DateObject) => onChange(e)}
          format={_.format}
          onlyMonthPicker={_.onlyMonth}
          editable={_.editable}
          range={_.range}
          className={cn(customized?.defaultProps?.class, _.class)}
          containerClassName={`date-container`}
          rangeHover
          dateSeparator={_.dateSeparator}
          arrow={false}
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
            )} ${value && value.toString() != "" ? "has-value" : ""} `}
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
      _.loadingObject ?? customized?.defaultProps?.loadingObject,
      errors,
      Boolean(value)
    );
  })
);
