import { Link } from "@tanstack/react-router";
import { cn } from "../../../lib/utils";

type Props = {
  to: string;
  className?: string;
  children?: any;
};

export default function SidebarLink({ to, className, children }: Props) {
  return (
    <>
      <Link
        to={to}
        className={cn(
          className,
          "px-1 text-subtext hover:underline cursor-pointer"
        )}
      >
        {children}
      </Link>
      <br />
    </>
  );
}
