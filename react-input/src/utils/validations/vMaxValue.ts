type VMaxValue = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
  maxValue: number;
};

export const vMaxValue = ({ event, maxValue }: VMaxValue) => {
  const { value } = event.target as HTMLInputElement;

  if (parseFloat(value) > maxValue) {
    return false;
  }
  return true;
};
