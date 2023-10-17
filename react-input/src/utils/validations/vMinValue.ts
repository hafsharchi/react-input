type VMinValue = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
  minValue: number;
};

export const vMinValue = ({ event, minValue }: VMinValue) => {
  const { value } = event.target as HTMLInputElement;

  if (parseInt(value) < minValue) {
    return false;
  }
  return true;
};
