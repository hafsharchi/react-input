import { RefObject } from "react";

type VMaxLength = {
  ref: RefObject<HTMLInputElement>;
  // | React.FocusEvent<HTMLInputElement, Element>;
  maxLength: number;
};

export const vMaxLength = ({ ref, maxLength }: VMaxLength) => {
  if (ref.current) {
    var value = ref.current.value;
    value = value + "";
    if (value.length > maxLength) {
      ref.current.value = value.slice(0, maxLength);
    }
  }
};
