type VMinLength = {
  event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement, Element>;
  minLength: number;
};

export const vMinLength = ({ event, minLength }: VMinLength) => {
  const { value } = event.target as HTMLInputElement;

  if (value.length < minLength) {
    return false;
  }
  return true
};