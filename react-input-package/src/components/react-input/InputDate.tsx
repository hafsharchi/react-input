import React, { memo, useCallback, useState } from "react";
import { Date } from "../types";
import { useRef } from 'react';
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
import useOnClickOutside from "../useOutside";

export const InputDate = memo((_: Date) => {
  const datePickerRef = useRef<any>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleDatePickerClose = useCallback(
    () => datePickerRef.current.closeCalendar(),
    [datePickerRef]
  );
  useOnClickOutside(datePickerRef, handleDatePickerClose);

  const onChange = (e: any) => {
    console.log(e);
    if (_.onChange) return _.onChange;
    setIsValid(e != null);
  };

  return (
    <>
      {/* <DatePicker
        {..._.register(_.name, _.type)}
        disabled={_.disabled == true ? true : false}
        calendar={persian}
        locale={persian_fa}
        onOpenPickNewDate={false}
        inputClass={`${isValid ? "" : "input-not-valid"}`}
        className="datepickerColor "
        onChange={(e: any) => onChange(e)}
      /> */}
    </>
  );
});

