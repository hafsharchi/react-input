import { handleNegative } from "../HandleNegative";

type VDecimal = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
};

export const vDecimal = ({ event }: VDecimal) => {
  let { value } = event.target as HTMLInputElement;
  value = value.replace(/[^0-9-.]/g, "");

  let splittedValue = value.split(".");
  const dotCount = splittedValue.length - 1;
  if (dotCount > 1) {
    value =
      splittedValue[0] +
      "." +
      splittedValue.splice(1, splittedValue.length).join("").replace(/,/g, "");
  }

  event.target.value = handleNegative(value);
};
