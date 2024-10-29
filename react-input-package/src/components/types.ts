// import { GroupBase, OptionsOrGroups } from "react-select";

import React from "react";
import { SelectComponentsConfig } from "react-select";
import { Props as SelectProps } from "react-select";

export type ValidationPatterns = "email" | "website" | string;

export type BaseInput = {
  id?: string;
  title?: string;
  type: Type;
  name: string;
  register: any;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (e?: any) => any;
  onBlur?: (e?: any) => any;
  placeholder?: string;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  customValidations?: CustomValidations;
  validationComponent?: React.FC<ValidationComponentProps>;
  validationOn?: "submit-blur-change" | "submit-blur" | "submit";
  notValidClassName?: string;
  before?: any;
  after?: any;
  beforeClassName?: string;
  afterClassName?: string;
  defaultValue?: any;
  updateDefaultValueOnChange?: boolean;
  loadingClassName?: string;
  loadingObject?: React.ReactNode;
  componentStructure?: ComponentDescriptor;
  disabledClassName?: string;
  wrapInside?: boolean;
};

export type DefaultProps = {
  componentStructure?: ComponentDescriptor;
  disabledClassName?: string;
  notValidClassName?: string;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  loadingClassName?: string;
  loadingObject?: React.ReactNode;
  beforeClassName?: string;
  afterClassName?: string;
  class?: string;
  fullWidth?: boolean;
  unstyled?: boolean;
  portal?: any;
  components?: SelectComponentsConfig<any, any, any>;
  classNamePrefix?: string;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  validationOn?: "submit-blur-change" | "submit-blur" | "submit";
  validationComponent?: React.FC<ValidationComponentProps>;
};

export type Text = BaseInput & {
  type: "text";
  mask?: string;
  maskChar?: string;
  maxLength?: number;
  minLength?: number;
};

export type Checkbox = BaseInput & {
  type: "checkbox";
  titleClickable?: boolean;
};

export type Password = BaseInput & {
  type: "password";
  showIcon?: any;
  hideIcon?: any;
  togglePasswordVisibilityClassName?: string;
  maxLength?: number;
  minLength?: number;
};

export type Decimal = BaseInput & {
  type: "decimal";
  maxValue?: number;
  minValue?: number;
  separator?: string;
};

export type Integer = BaseInput & {
  type: "integer";
  maxValue?: number;
  minValue?: number;
  separator?: string;
  maxLength?: number;
  minLength?: number;
};

export type Calendar = BaseInput & {
  type: "calendar";
  locale: "persian" | "english";
  range?: boolean;
  maxDate?: Date | string;
  minDate?: Date | string;
  onlyMonth?: boolean;
  separator?: string;
  format?: string;
  dateSeparator?: string;
  class?: string;
  fullWidth?: boolean;
  portal?: any;
  editable?: boolean;
};

export type Select = BaseInput &
  Omit<SelectProps, "isDisabled" | "isMulti" | "defaultValue" | "value"> & {
    type: "select";
    multiple?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    portal?: any;
  };

export type Textarea = BaseInput & {
  type: "textarea";
  maxLength?: number;
  minLength?: number;
};

export type File = BaseInput & {
  type: "file";
  maxValue?: number;
  minValue?: number;
};

export type Type =
  | "text"
  | "integer"
  | "decimal"
  | "calendar"
  | "select"
  | "textarea"
  | "checkbox"
  | "password";

export type ErrorTypes =
  | undefined
  | {
      minValue: string;
      maxValue: string;
      minLength: string;
      maxLength: string;
      email: string;
      phoneNumber: string;
      required: string;
      etc: string;
    };

export interface InputMasterContextProps {
  validationErrors: ErrorTypes;
  defaultProps?: DefaultProps;
  setValidationErrors: React.Dispatch<React.SetStateAction<ErrorTypes>>;
  onValidationFailed: Function;
}

export type ValidationComponentProps = {
  errors?: Array<string>;
};

export type CustomValidation = {
  func: (value: any) => boolean;
  error?: string;
};

export type CustomValidations = Array<CustomValidation>;

export type ComponentDescriptor =
  | InputComponent
  | {
      type:
        | "wrapper"
        | "after"
        | "before"
        | "title"
        | "validation"
        | "loading"
        | "other";
      tag?: keyof JSX.IntrinsicElements;
      props?: { [key: string]: any };
      children?: ComponentDescriptor[];
      content?: React.ReactNode;
    };

export type InputComponent = {
  type: "input";
  props?: { [key: string]: any };
  content?: React.ReactNode;
};

export type ErrorState = {
  [key: string]: string[];
};
