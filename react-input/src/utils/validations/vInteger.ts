import { handleNegative } from "./HandleNegative";

type VInteger = {
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>;
  };
  
  export const vInteger = ({ event }: VInteger) => {
    let { value } = event.target as HTMLInputElement;
    value = value.replace(/[^0-9-]/g, "");

    event.target.value = handleNegative(value)  
  };
  