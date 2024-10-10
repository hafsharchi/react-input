import React, { createContext, ReactNode, useState } from "react";
import { ErrorTypes, ReactInputContextProps } from "../components/types";

export const ReactInputContext = createContext<
  ReactInputContextProps | undefined
>(undefined);

interface ReactInputProviderProps {
  children: ReactNode;
  errors?: ErrorTypes;
  onValidationFailedFunction?: Function;
}

export const ReactInputProvider = ({
  children,
  errors,
  onValidationFailedFunction = () => {},
}: ReactInputProviderProps) => {
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

  const contextValue: ReactInputContextProps = {
    validationErrors,
    setValidationErrors,
    onValidationFailed: onValidationFailed,
  };

  return (
    <ReactInputContext.Provider value={contextValue}>
      {children}
    </ReactInputContext.Provider>
  );
};
