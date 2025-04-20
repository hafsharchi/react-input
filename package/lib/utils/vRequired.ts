import { VALIDATION_ERROR } from "../constants";
import {
  addToStateArrayByValue,
  removeFromStateArrayByValue,
} from "./StateArray";

type VRequired = {
  required?: boolean;
  currentValue: unknown;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  error: string | undefined;
};

export const vRequired = ({
  required = false,
  currentValue,
  setErrors,
  error,
}: VRequired) => {
  if (currentValue || !required) {
    removeFromStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.REQUIRED
    );
    return true;
  }
  addToStateArrayByValue<string>(setErrors, error ?? VALIDATION_ERROR.REQUIRED);

  return false;
};
