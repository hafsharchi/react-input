export type ValidationPatterns = "email" | "website" | string;

export type BaseInput = Validation & {
  title: string;
  type: Type;
  name: string;
  register: any;
  loading?: boolean;
  disabled?: boolean;
  onChange?: () => any;
  onBlur?: () => any;
  placeholder?: string;
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
  type: "date";
  maxValue?: number;
  minValue?: number;
};

export type Select = BaseInput & {
  type: "select";
  maxValue?: number;
  minValue?: number;
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
  | "date"
  | "select"
  | "textarea"
  | "file";
