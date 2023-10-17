type VMaxLength = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
  maxLength: number;
};

export const vMaxLength = ({ event, maxLength }: VMaxLength) => {
  const { value } = event.target as HTMLInputElement;
  if (value.length > maxLength) {
    event.target.value = value.slice(0, maxLength);
  }
};
