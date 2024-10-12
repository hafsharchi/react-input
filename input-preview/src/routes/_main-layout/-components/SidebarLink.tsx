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
        activeProps={
          {className:"!text-foreground bg-foreground/10 w-full rounded-md py-0.5 px-2"}
        }
        className={cn(
          className,
          "px-1 text-subtext hover:underline cursor-pointer transition-all"
        )}
      >
        {children}
      </Link>
      <br />
    </>
  );
}
