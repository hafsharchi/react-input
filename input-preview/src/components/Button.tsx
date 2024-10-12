import { MouseEvent } from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  variant?: "tab" | "default" | "submit";
  className?: string;
};

export const Button = ({
  children,
  disabled,
  active,
  onClick,
  variant = "default",
  className
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${className}  cursor-pointer w-min  ${
        disabled
          ? ""
          : active && variant == "tab"
            ? "text-foreground border-b-2 border-foreground px-3 py-3 "
            : !active && variant == "tab"
              ? "text-foreground px-3 py-3 "
              : active && variant == "default"
                ? "bg-foreground/90 text-xs py-1 cursor-pointer  transition-all text-background px-2 rounded-lg"
                : !active && variant == "default" ? "bg-foreground/10 text-xs py-1 cursor-pointer  transition-all text-foreground px-2 rounded-lg" :
                "bg-foreground/10 backdrop-blur-lg text-xs text-foreground/80 rounded-lg px-2 py-1.5 hover:bg-foreground/15 transition-colors hover:ring-1 ring-foreground/30"
      }`}
    >
      {children}
    </div>
  );
};
