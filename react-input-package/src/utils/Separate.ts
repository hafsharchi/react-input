import { RefObject } from "react";

type TSeparate = {
  ref: RefObject<HTMLInputElement>;
  seperator: string;
};

export const separate = ({ ref, seperator }: TSeparate) => {
  if (ref.current) {
    var value = ref.current.value;
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
    ref.current.value = parts.join(".");
  }
};

