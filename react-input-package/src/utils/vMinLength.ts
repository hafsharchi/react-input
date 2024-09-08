import { VALIDATION_ERROR } from "../constants/validatonErrors";
import { addToStateArrayByValue, removeFromStateArrayByValue } from "./StateArray";

type VMinLength = {
  currentValue: string;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  minLength: number;
  error: string | undefined;
};

export const vMinLength = ({ currentValue, minLength,setErrors, error }: VMinLength) => {
  var value = currentValue + "";
  if (value.length < minLength) {
    addToStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.MIN_LENGTH
    );
    console.log("err " + value)
    return false;
  }
  removeFromStateArrayByValue<string>(
    setErrors,
    error ?? VALIDATION_ERROR.MIN_LENGTH
  );
  return true
};