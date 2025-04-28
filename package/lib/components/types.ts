// import { GroupBase, OptionsOrGroups } from "react-select";

import React, { RefObject } from "react";
import {
  SelectComponentsConfig,
  GroupBase,
  Props as SelectProps,
  SingleValue,
  MultiValue,
} from "react-select";

export type ValidationPatterns = "email" | "website" | string;

export type OptionType = { label: string; value: string };
export type SelectValue =
  | SingleValue<OptionType>
  | MultiValue<OptionType>
  | undefined;

export type BaseInput<T> = {
  id?: string;
  title?: string;
  type: Type;
  name: string;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value?: T) => void;
  onBlur?: (e?: React.FocusEvent) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  customValidations?: CustomValidations;
  validationComponent?: React.FC<ValidationComponentProps>;
  validationOn?: "submit-blur-change" | "submit-blur" | "submit";
  notValidClassName?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  beforeClassName?: string;
  afterClassName?: string;
  defaultValue?: T;
  updateDefaultValueOnChange?: boolean;
  loadingClassName?: string;
  loadingObject?: React.ReactNode;
  componentStructure?: ComponentDescriptor;
  disabledClassName?: string;
  wrapInside?: boolean;
  register: (name: string, type: Type) => Input;
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
  togglePasswordVisibilityClassName?: string;
  class?: string;
  unstyled?: boolean;
  portal?: HTMLElement | null;
  components?: SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>;
  classNamePrefix?: string;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  validationOn?: "submit-blur-change" | "submit-blur" | "submit";
  validationComponent?: React.FC<ValidationComponentProps>;
};

export type Text = BaseInput<string> & {
  type: "text";
  mask?: string | MaskPattern;
  maxLength?: number;
  minLength?: number;
};

export type Checkbox = BaseInput<boolean> & {
  type: "checkbox";
  titleClickable?: boolean;
};

export type Password = BaseInput<string> & {
  type: "password";
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
  togglePasswordVisibilityClassName?: string;
  maxLength?: number;
  minLength?: number;
};

export type Decimal = BaseInput<string> & {
  type: "decimal";
  maxValue?: number;
  minValue?: number;
  separator?: string;
};

export type Integer = BaseInput<number> & {
  type: "integer";
  maxValue?: number;
  minValue?: number;
  separator?: string;
  maxLength?: number;
  minLength?: number;
};

export type CalendarValue = string | undefined;
export type Calendar = BaseInput<CalendarValue> & {
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
  portal?: HTMLElement;
  editable?: boolean;
};

export type Select = Omit<
  SelectProps<OptionType, boolean, GroupBase<OptionType>>,
  "isDisabled" | "isMulti" | "defaultValue" | "value" | "isLoading"
> &
  BaseInput<SelectValue> & {
    type: "select";
    multiple?: boolean;
    disabled?: boolean;
    portal?: HTMLElement | null;
  };

export type Textarea = BaseInput<string> & {
  type: "textarea";
  maxLength?: number;
  minLength?: number;
};

export type FileValue = string;
export type File = BaseInput<FileValue> & {
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
  onValidationFailed: () => void;
}

export type ValidationComponentProps = {
  errors?: Array<string>;
};

export type CustomValidation = {
  func: (value: unknown) => boolean;
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
      tag?: keyof React.JSX.IntrinsicElements;
      hasValueClassName?: string;
      props?: Record<string, unknown>;
      children?: ComponentDescriptor[];
      content?: React.ReactNode;
    };

export type InputComponent = {
  type: "input";
  props?: Record<string, unknown>;
  content?: React.ReactNode;
  hasValueClassName?: string;
};

export type ErrorState = {
  [key: string]: string[];
};

export type InputRef<T> = {
  getValue: () => T;
  updateValue: (newValue: T) => void;
  checkValidation: () => boolean;
};

export type Input = {
  type: Type;
  name: string;
  ref: RefObject<InputRef<unknown>>;
};

export type MaskPattern = {
  pattern: string;
  // placeholder?: string;
  tokens?: Record<string, RegExp>;
};
