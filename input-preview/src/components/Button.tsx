type Props = {
  children: any;
  disabled?: boolean;
  active?: boolean;
};

export const Button = ({ children, disabled, active }: Props) => {
  return (
    <div
      className={`bg-sky-50 transition-colors rounded-lg px-3 py-1  cursor-pointer  ${
        disabled
          ? "text-sky-200 bg-white hover:bg-sky-50 hover:text-sky-400"
          : active
          ? "text-white bg-sky-600 hover:bg-sky-700"
          : "text-sky-600 hover:bg-sky-600 hover:text-white"
      }`}
    >
      {children}
    </div>
  );
};
