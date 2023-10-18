type TSeparate = {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>;
  seperator: string;
};

export const separate = ({ event, seperator }: TSeparate) => {
  var { value } = event.target as HTMLInputElement;
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
  event.target.value = parts.join(".");
};
