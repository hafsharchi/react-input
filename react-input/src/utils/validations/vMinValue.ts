type VMinValue = {
  currentValue: string;
  minValue: number;
};

export const vMinValue = ({ currentValue, minValue }: VMinValue) => {
  if (parseFloat(currentValue) < minValue) {
    return false;
  }
  return true;
};
