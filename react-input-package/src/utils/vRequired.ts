import { VALIDATION_ERROR } from "../constants";
import {
  addToStateArrayByValue,
  removeFromStateArrayByValue,
} from "./StateArray";

type VRequired = {
  currentValue: any;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  error: string | undefined;
};

export const vRequired = ({ currentValue, setErrors, error }: VRequired) => {
  if (currentValue) {
    removeFromStateArrayByValue<string>(
      setErrors,
      error ?? VALIDATION_ERROR.REQUIRED
    );
    return true;
  }
  addToStateArrayByValue<string>(setErrors, error ?? VALIDATION_ERROR.REQUIRED);

  return false;
};
