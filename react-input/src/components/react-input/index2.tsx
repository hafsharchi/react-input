import { memo } from "react";
import {
  BaseInput,
  Date,
  Decimal,
  File,
  Integer,
  Select,
  Text,
  Textarea,
} from "../types";
import { InputText } from "./InputText";
import { InputDecimal } from "./InputDecimal";
import { InputInteger } from "./InputInteger";
import { InputSelect } from "./InputSelect";
import { InputDate } from "./InputDate";

export const Input = memo(
  (_: Text | Decimal | Integer | Date | Select | Textarea | File) => {
    var baseInput: BaseInput = {
      id: _.id,
      type: _.type,
      name: _.name,
      register: _.register,
      title: _.title,
      disabled: _?.disabled,
      loading: _?.loading,
      onBlur: _?.onBlur,
      onChange: _?.onChange,
      placeholder: _?.placeholder,
      validationOn: _.validationOn,
      validationPattern: _.validationPattern,
      validationComponent: _?.validationComponent,
      customValidations: _.customValidations,
      required: _?.required,
      wrapperClassName: _.wrapperClassName,
      className: _.className,
      notValidClassName: _.notValidClassName,
      titleClassName: _.titleClassName,
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
            locale={_.locale}
            minDate={_.minDate}
            maxDate={_.maxDate}
            onlyMonth={_.onlyMonth}
            range={_.range}
            dateSeparator={_.dateSeparator}
            format={_.format}
            class={_.class}
            {...baseInput}
            type="calendar"
          />
        );

      case "file":
        return <InputText {...baseInput} type="text" />;

      case "select":
        return <InputSelect {...baseInput} type="select" />;
      // return <InputSelect {...baseInput} type="select" options={_.options} />;

      case "textarea":
        return <InputText {...baseInput} type="text" />;

      default:
        return <InputText {...baseInput} type="text" />;
    }
  }
);
