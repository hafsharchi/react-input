import { createContext, ReactNode } from 'react';
import { ErrorTypes, ReactInputContextProps } from '../components/types';


export const ReactInputContext = createContext<ReactInputContextProps | undefined>(undefined);

interface ReactInputProviderProps {
  children: ReactNode
}

export const ReactInputProvider = ({ children }: ReactInputProviderProps) => {
  const validationErrors : ErrorTypes = {
    minValue: "Less than the minimum value",
    maxValue: "More than the maximum value",
    minLength: "Shorter than minimum length",
    maxLength: "Longer than the maximum length",
    email: "Not a valid email",
    phoneNumber: "Not a valid phone number",
    required: "This field cannot be empty", 
    etc: "not valid",
  }

  const contextValue: ReactInputContextProps = {
    validationErrors,
  };

  return (
    <ReactInputContext.Provider value={contextValue}>
      {children}
    </ReactInputContext.Provider>
  );
};
