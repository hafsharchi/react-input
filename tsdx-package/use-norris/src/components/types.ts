// import { GroupBase, OptionsOrGroups } from "react-select";

export type ValidationPatterns = "email" | "website" | string;

export type BaseInput = Validation & {
  id: string;
  title: string;
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
  wrapperClassname?: string;
  titleClassName?: string;
  customValidations?: CustomValidations;
  validationComponent?: React.FC<ValidationComponentProps>;
  notValidClassname?: string;
};

export type Validation = {
  validationPattern?: ValidationPatterns;
  validationOn: "submit-blur-change" | "submit-blur" | "submit";
};

export type NoValidation = {
  validation: false;
};
export type Text = BaseInput & {
  type: "text";
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

export type Date = BaseInput & {
  type: "calendar";
  locale: "persian" | "english" | "arabic";
};

export type Select = BaseInput & {
  type: "select";
  // options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  multiple?: boolean;
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
  | "file";

export type ErrorTypes =
  | undefined
  | {
      minValue: string;
      maxValue: string;
      minLength: string;
      maxLength: string;
      email: string;
      phoneNumber: string;
      etc: string;
    };

export interface ReactInputContextProps {
  validationErrors: ErrorTypes;
}

export type ValidationComponentProps = {
  errors?: Array<string>;
};

export type CustomValidation = {
  func: (value: string | number) => boolean;
  error?: string;
};

export type CustomValidations = Array<CustomValidation>;
