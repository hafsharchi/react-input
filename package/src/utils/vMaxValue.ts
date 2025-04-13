import { VALIDATION_ERROR } from "../constants/validatonErrors";
import { addToStateArrayByValue, removeFromStateArrayByValue } from "./StateArray";

type VMaxValue = {
  currentValue: string;
  maxValue: number;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  error: string | undefined;
};

export const vMaxValue = ({
  currentValue,
  maxValue,
  setErrors,
  error,
}: VMaxValue) => {
  if (parseFloat(currentValue) > maxValue) {
    addToStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.MAX_VALUE
    );
    return false;
  }
  removeFromStateArrayByValue<string>(
    setErrors,
    error ?? VALIDATION_ERROR.MAX_VALUE
  );
  return true;
};
