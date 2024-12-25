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
  ComponentDescriptor,
  InputMasterContextProps,
} from "../types";
import { InputMasterContext } from "../../contexts/InputMasterContext";
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
import { cn } from "../../utils/cn";

export const InputDate = memo(
  forwardRef((_: Calendar, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const [value, setValue] = useState<any>(_?.defaultValue);

    const inputRef = useRef<any>();

    const [errors, setErrors] = React.useState<Array<string>>([]);

    const customized: InputMasterContextProps | undefined =
      useContext(InputMasterContext);

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
        setIsValid(checkValidation(value));
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
          required: _.required,
          currentValue: currentValue,
          setErrors: setErrors,
          error: customized?.validationErrors?.required,
        })
      )
        res = false;

      return res;
    };
    const portal = _.portal != undefined && _.portal != false;
    const defaultPortal =
      customized?.defaultProps?.portal != undefined &&
      customized?.defaultProps?.portal != false;
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
          onChange={(e: any) => onChange(e)}
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
            )} ${value && value != "" ? "has-value" : ""} `}
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
