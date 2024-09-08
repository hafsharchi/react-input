import React,{ memo } from "react";
import {
  BaseInput,
  Calendar,
  Decimal,
  File,
  Integer,
  Select,
  Text,
  Textarea,
  Password,
} from "../types";
import { InputDecimal } from "./InputDecimal";
import { InputInteger } from "./InputInteger";
import { InputSelect } from "./InputSelect";
import { InputDate } from "./InputDate";
import { InputPassword } from "./InputPassword";
import { InputText } from "./InputText";

export const Input = memo(
  (
    _: Text | Decimal | Integer | Calendar | Select | Textarea | File | Password
  ) => {
    var baseInput: BaseInput = {
      id: _.id,
      type: _.type,
      name: _.name,
      register: _.register,
      title: _.title,
      titleAfter: _.titleAfter,
      disabled: _?.disabled,
      loading: _?.loading,
      onBlur: _?.onBlur,
      onChange: _?.onChange,
      placeholder: _?.placeholder,
      validationOn: _.validationOn,
      validationComponent: _?.validationComponent,
      customValidations: _.customValidations,
      required: _?.required,
      wrapperClassName: _?.wrapperClassName,
      className: _?.className,
      notValidClassName: _?.notValidClassName,
      titleClassName: _?.titleClassName,
      before: _?.before,
      after: _?.after,
      beforeClassName: _?.beforeClassName,
      afterClassName: _?.afterClassName,
      defaultValue: _?.defaultValue,
      loadingClassName: _?.loadingClassName,
      disabledClassName: _?.disabledClassName,
      loadingObject: _?.loadingObject,
      componentStructure: _?.componentStructure,
      ..._.register(_.name, _.type),
    };

    switch (_.type) {
      case "text":
        return (
          <InputText
            {...baseInput}
            maxLength={_.maxLength}
            minLength={_.minLength}
            type="text"
          />
        );

      case "decimal":
        return (
          <InputDecimal
            {...baseInput}
            maxValue={_.maxValue}
            minValue={_.minValue}
            separator={_.separator}
            type="decimal"
          />
        );
      case "integer":
        return (
          <InputInteger
            {...baseInput}
            maxValue={_.maxValue}
            minValue={_.minValue}
            separator={_.separator}
            type="integer"
          />
        );
      case "calendar":
        return (
          <InputDate
            locale={_?.locale}
            minDate={_?.minDate}
            maxDate={_?.maxDate}
            onlyMonth={_?.onlyMonth}
            range={_?.range}
            separator={_?.separator}
            dateSeparator={_?.dateSeparator}
            format={_?.format}
            class={_?.class}
            fullWidth={_?.fullWidth}
            {...baseInput}
            type="calendar"
            portal={_?.portal}
          />
        );

      case "file":
        return <InputText {...baseInput} type="text" />;

      case "select":
        return (
          <InputSelect
            {...baseInput}
            type="select"
            options={_.options}
            classNamePrefix={_.classNamePrefix}
            multiple={_?.multiple}
            fullWidth={_?.fullWidth}
            portal={_?.portal}
            noOptionsMessage={_?.noOptionsMessage}
            unstyled={_?.unstyled}
            menuIsOpen={_?.menuIsOpen}
          />
        );
      case "password":
        return (
          <InputPassword
            {...baseInput}
            maxLength={_.maxLength}
            minLength={_.minLength}
            showIcon={_.showIcon}
            hideIcon={_.hideIcon}
            togglePasswordVisibilityClassName={
              _.togglePasswordVisibilityClassName
            }
            type="password"
          />
        );

      case "textarea":
        return <InputText {...baseInput} type="text" />;

      default:
        return <InputText {...baseInput} type="text" />;
    }
  }
);
