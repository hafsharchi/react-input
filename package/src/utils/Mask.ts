import { RefObject } from "react";
import { vMaxLength } from "./vMaxLength";

type Maks = {
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  mask?: string;
  maskChar?: string;
};

export const applyMask = ({ ref, mask, maskChar }: Maks) => {
  if (ref.current && mask) {
    var value = ref.current.value.split("");

    let res: Array<string> = [];
    
    for (let i = 0; i < value.length; i++) {
      if (mask.split("")[i] == maskChar || mask.split("")[i] == value[i]) {
        res.push(value[i]);
      } else {
        res.push(mask[i]);
        res.push(value[i]);
      }
    }
    ref.current.value = res.join("");
    vMaxLength({ref:ref, maxLength:mask.length})
  }
};
