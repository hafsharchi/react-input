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
} from "../../types";
import InputText from "./InputText";
import InputInteger from "./InputInteger";

const Input = memo(
  (_: Text | Decimal | Integer | Date | Select | Textarea | File) => {
    var baseInput: BaseInput = {
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
          <InputInteger
            {...baseInput}
            maxValue={_.maxValue}
            minValue={_.minValue}
            separator={_.separator}
            type="integer"
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
      case "date":
        return <InputText {...baseInput} type="text" />;

      case "file":
        return <InputText {...baseInput} type="text" />;

      case "select":
        return <InputText {...baseInput} type="text" />;

      case "textarea":
        return <InputText {...baseInput} type="text" />;

      default:
        return <InputText {...baseInput} type="text" />;
    }
  }
);

export default Input;
