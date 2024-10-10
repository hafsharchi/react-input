import { MouseEvent } from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  variant?: "tab" | "default";
};

export const Button = ({
  children,
  disabled,
  active,
  onClick,
  variant = "default",
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={` text-sm  rounded-t-lg cursor-pointer  ${
        disabled
          ? ""
          : active && variant == "tab"
            ? "text-foreground border-b-2 border-foreground px-3 py-3 "
            : !active && variant == "tab"
              ? "text-foreground px-3 py-3 "
              : active && variant == "default"
                ? "bg-foreground/90 text-xs py-1 cursor-pointer  transition-all text-background px-2 rounded-lg"
                : "bg-foreground/10 text-xs py-1 cursor-pointer  transition-all text-foreground px-2 rounded-lg"
      }`}
    >
      {children}
    </div>
  );
};
