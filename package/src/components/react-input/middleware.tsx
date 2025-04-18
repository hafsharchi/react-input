import { memo } from "react";
import {
  BaseInput,
  Calendar,
  Checkbox,
  Decimal,
  File,
  Integer,
  Password,
  Select,
  Text,
  Textarea,
  CalendarValue,
  SelectValue,
} from "../types";
import { InputCheckbox } from "./InputCheckbox";
import { InputDate } from "./InputDate";
import { InputDecimal } from "./InputDecimal";
import { InputInteger } from "./InputInteger";
import { InputPassword } from "./InputPassword";
import { InputSelect } from "./InputSelect";
import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";

type InputType =
  | Text
  | Decimal
  | Integer
  | Calendar
  | Select
  | Textarea
  | File
  | Password
  | Checkbox;

export const Input = memo((_: InputType) => {
  const getBaseInput = () => {
    const base = {
      id: _.id,
      register: _.register,
      title: _.title,
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

    return base;
  };

  const baseInput = getBaseInput();

  switch (_.type) {
    case "text":
      return <InputText {...(baseInput as BaseInput<string>)} {..._} />;

    case "decimal":
      return <InputDecimal {...(baseInput as BaseInput<string>)} {..._} />;

    case "integer":
      return <InputInteger {...(baseInput as BaseInput<number>)} {..._} />;

    case "calendar":
      return <InputDate {...(baseInput as BaseInput<CalendarValue>)} {..._} />;

    case "select":
      return <InputSelect {...(baseInput as BaseInput<SelectValue>)} {..._} />;

    case "password":
      return <InputPassword {...(baseInput as BaseInput<string>)} {..._} />;

    case "textarea":
      return <InputTextArea {...(baseInput as BaseInput<string>)} {..._} />;

    case "checkbox":
      return (
        <InputCheckbox
          titleClickable={_.titleClickable}
          {...(baseInput as BaseInput<boolean>)}
          type="checkbox"
        />
      );

    default:
      return <InputText {...(baseInput as BaseInput<string>)} type="text" />;
  }
});
