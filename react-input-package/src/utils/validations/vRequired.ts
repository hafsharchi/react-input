type VRequired = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
};

export const vRequired = ({ event }: VRequired) => {
  const { value } = event.target as HTMLInputElement;
  if (value) {
    return false;
  }
  return true;
};
