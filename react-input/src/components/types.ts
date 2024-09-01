// import { GroupBase, OptionsOrGroups } from "react-select";

import { GroupBase, OptionsOrGroups } from "react-select";

export type ValidationPatterns = "email" | "website" | string;

export type BaseInput = {
  id?: string;
  title?: string;
  titleAfter?: boolean;
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
  loadingClassName?: string;
  loadingObject?: any;
  componentStructure?: ComponentDescriptor;
  disabledClassName?: string;
  wrapInside?: boolean;
};

export type Text = BaseInput & {
  type: "text";
  maxLength?: number;
  minLength?: number;
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
};

export type Calendar = BaseInput & {
  type: "calendar";
  locale: "persian" | "english";
  range?: boolean;
  maxDate?: string;
  minDate?: string;
  onlyMonth?: boolean;
  separator?: string;
  format?: string;
  dateSeparator?: string;
  class?: string;
  fullWidth?: boolean;
  portal?: any;
};

export type Select = BaseInput & {
  type: "select";
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  multiple?: boolean;
  classNamePrefix?: string;
  fullWidth?: boolean;
  noOptionsMessage?: any;
  portal?: any;
  menuIsOpen?: boolean;
  unstyled?: boolean;
};

export type Textarea = BaseInput & {
  type: "textarea";
  maxValue?: number;
  minValue?: number;
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
  | "file"
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

export interface ReactInputContextProps {
  validationErrors: ErrorTypes;
  setValidationErrors: React.Dispatch<React.SetStateAction<ErrorTypes>>;
}

export type ValidationComponentProps = {
  errors?: Array<string>;
};

export type CustomValidation = {
  func: (value: string | number) => boolean;
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
