import { VALIDATION_ERROR } from "../../constants/validatonErrors";
import { addToStateArrayByValue, removeFromStateArrayByValue } from "../StateArray";

type VMinValue = {
  currentValue: string;
  minValue: number;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  error: string | undefined;
};

export const vMinValue = ({
  currentValue,
  minValue,
  setErrors,
  error,
}: VMinValue) => {
  if (parseFloat(currentValue) < minValue) {
    addToStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.MIN_VALUE
    );
    return false;
  }
  removeFromStateArrayByValue<string>(
    setErrors,
    error ?? VALIDATION_ERROR.MIN_VALUE
  );
  return true;
};
