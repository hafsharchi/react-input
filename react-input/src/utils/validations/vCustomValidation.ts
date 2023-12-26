import { VALIDATION_ERROR } from "../../constants/validatonErrors";
import { CustomValidation } from "../../types";
import {
  addToStateArrayByValue,
  removeFromStateArrayByValue,
} from "../StateArray";

type VCustomValidation = {
  currentValue: string;
  setErrors: React.Dispatch<React.SetStateAction<Array<string>>>;
  customValidation: CustomValidation;
};

export const vCustomValidation = ({
  currentValue,
  setErrors,
  customValidation,
}: VCustomValidation) => {
  console.log("er");
  console.log(customValidation?.error);
  if (!customValidation.func(currentValue)) {
    addToStateArrayByValue<string>(
      setErrors,
      customValidation?.error ?? VALIDATION_ERROR.DEFAULT
    );
    return false;
  }
  removeFromStateArrayByValue<string>(
    setErrors,
    customValidation?.error ?? VALIDATION_ERROR.DEFAULT
  );
  return true;
};
