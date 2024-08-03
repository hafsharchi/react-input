import { RefObject } from "react";
import { handleNegative } from "./HandleNegative";

type VInteger = {
  ref: RefObject<HTMLInputElement>;
};

export const vInteger = ({ ref }: VInteger) => {
  if (ref.current) {
    let value = ref.current.value;
    value = value.replace(/[^0-9-]/g, "");

    ref.current.value = handleNegative(value);
  }
};
