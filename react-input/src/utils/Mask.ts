import { RefObject } from "react";

type Maks = {
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  mask?: string;
  maskChar?: string;
};

export const applyMask = ({ ref, mask, maskChar }: Maks) => {
  if (ref.current){
    if (mask && maskChar) {
      let maskedValue = "";
      let valueIndex = 0;
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === maskChar) {
          if (ref?.current?.value[valueIndex]) {
            maskedValue += ref.current.value[valueIndex];
            valueIndex++;
          } else {
            maskedValue += maskChar;
          }
        } else {
          maskedValue += mask[i];
        }
      }
    }
  return maskedValue;

  }




};
