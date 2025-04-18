import { createContext, ReactNode, useState } from "react";
import {
  DefaultProps,
  ErrorTypes,
  InputMasterContextProps,
} from "../components/types";

// eslint-disable-next-line react-refresh/only-export-components
export const InputMasterContext = createContext<
  InputMasterContextProps | undefined
>(undefined);

interface InputMasterProviderProps {
  children: ReactNode;
  errors?: ErrorTypes;
  defaultProps?: DefaultProps;
  onValidationFailedFunction?: () => void;
}

export const InputMasterProvider = ({
  children,
  errors,
  defaultProps,
  onValidationFailedFunction = () => {},
}: InputMasterProviderProps) => {
  const [validationErrors, setValidationErrors] = useState<ErrorTypes>({
    minValue: errors?.minValue ?? "Less than the minimum value",
    maxValue: errors?.maxValue ?? "More than the maximum value",
    minLength: errors?.minLength ?? "Shorter than minimum length",
    maxLength: errors?.maxLength ?? "Longer than the maximum length",
    email: errors?.email ?? "Not a valid email",
    phoneNumber: errors?.phoneNumber ?? "Not a valid phone number",
    required: errors?.required ?? "This field cannot be empty",
    etc: errors?.etc ?? "not valid",
  });
  const onValidationFailed = onValidationFailedFunction;

  const contextValue: InputMasterContextProps = {
    validationErrors,
    setValidationErrors,
    onValidationFailed: onValidationFailed,
    defaultProps: defaultProps,
  };

  return (
    <InputMasterContext.Provider value={contextValue}>
      {children}
    </InputMasterContext.Provider>
  );
};
