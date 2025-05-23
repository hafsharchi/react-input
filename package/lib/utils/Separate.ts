import { RefObject } from "react";

type TSeparate = {
  ref: RefObject<HTMLInputElement>;
  seperator: string;
};

export const separate = ({ ref, seperator }: TSeparate) => {
  if (ref.current) {
    const value = ref.current.value;
    const parts = value.split(".");
    parts[0] = parts[0].replaceAll(/\B(?=(\d{3})+(?!\d))/g, seperator);
    ref.current.value = parts.join(".");
  }
};

