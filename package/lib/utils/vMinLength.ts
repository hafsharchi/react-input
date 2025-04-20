import { VALIDATION_ERROR } from "../constants/validatonErrors";
import { addToStateArrayByValue, removeFromStateArrayByValue } from "./StateArray";

type VMinLength = {
  currentValue: string;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  minLength: number;
  error: string | undefined;
};

export const vMinLength = ({ currentValue, minLength,setErrors, error }: VMinLength) => {
  const value = currentValue + "";
  if (value.length < minLength && value.length !== 0) {
    addToStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.MIN_LENGTH
    );
    return false;
  }
  removeFromStateArrayByValue<string>(
    setErrors,
    error ?? VALIDATION_ERROR.MIN_LENGTH
  );
  return true
};