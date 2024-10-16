import React, { memo } from "react";
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
  Checkbox,
} from "../types";
import { InputDecimal } from "./InputDecimal";
import { InputInteger } from "./InputInteger";
import { InputSelect } from "./InputSelect";
import { InputDate } from "./InputDate";
import { InputPassword } from "./InputPassword";
import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputCheckbox } from "./InputCheckbox";

export const Input = memo(
  (
    _:
      | Text
      | Decimal
      | Integer
      | Calendar
      | Select
      | Textarea
      | File
      | Password
      | Checkbox
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
      updateDefaultValueOnChange: _?.updateDefaultValueOnChange ?? true,
      loadingClassName: _?.loadingClassName,
      disabledClassName: _?.disabledClassName,
      loadingObject: _?.loadingObject,
      componentStructure: _?.componentStructure,
      ..._.register(_.name, _.type),
    };

    switch (_.type) {
      case "text":
        return <InputText {...baseInput} {..._} />;

      case "decimal":
        return <InputDecimal {...baseInput} {..._} />;
      case "integer":
        return <InputInteger {...baseInput} {..._} />;
      case "calendar":
        return <InputDate {...baseInput} {..._} />;

      case "select":
        return <InputSelect {...baseInput} {..._} />;
      case "password":
        return <InputPassword {...baseInput} {..._} />;

      case "textarea":
        return <InputTextArea {...baseInput} {..._} />;

      case "checkbox":
        return (
          <InputCheckbox
            titleClickable={_.titleClickable}
            {...baseInput}
            type="checkbox"
          />
        );

      default:
        return <InputText {...baseInput} type="text" />;
    }
  }
);
