import { RefObject } from "react";
import { handleNegative } from "./HandleNegative";

type VDecimal = {
  ref: RefObject<HTMLInputElement>;
};

export const vDecimal = ({ ref }: VDecimal) => {
  if (ref.current) {
    let value = ref.current.value;
    value = value.replaceAll(/[^0-9-.]/g, "");

    const splittedValue = value.split(".");
    const dotCount = splittedValue.length - 1;
    if (dotCount > 1) {
      value =
        splittedValue[0] +
        "." +
        splittedValue
          .splice(1, splittedValue.length)
          .join("")
          .replaceAll(/,/g, "");
    }

    ref.current.value = handleNegative(value);
  }
};
