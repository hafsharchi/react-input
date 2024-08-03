import { RefObject } from "react";
import { handleNegative } from "./HandleNegative";

type VDecimal = {
  ref: RefObject<HTMLInputElement>;
};

export const vDecimal = ({ ref }: VDecimal) => {
  if (ref.current) {
    let value = ref.current.value;
    value = value.replace(/[^0-9-.]/g, "");

    let splittedValue = value.split(".");
    const dotCount = splittedValue.length - 1;
    if (dotCount > 1) {
      value =
        splittedValue[0] +
        "." +
        splittedValue
          .splice(1, splittedValue.length)
          .join("")
          .replace(/,/g, "");
    }

    ref.current.value = handleNegative(value);
  }
};
