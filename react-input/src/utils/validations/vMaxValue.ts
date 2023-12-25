type VMaxValue = {
  currentValue: string;
  maxValue: number;
};

export const vMaxValue = ({ currentValue, maxValue }: VMaxValue) => {
  if (parseFloat(currentValue) > maxValue) {
    return false;
  }
  return true;
};
