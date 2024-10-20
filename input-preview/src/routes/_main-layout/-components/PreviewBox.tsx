import React from "react";
import DotPattern from "../../../components/magicui/dot-pattern";
import { cn } from "../../../lib/utils";

type Props = {
  children: React.ReactNode;
  settings?: React.ReactNode;
  className?: string;
};

export default function PreviewBox({ children, settings,className }: Props) {
  return (
    <>
      <div className={cn('relative flex h-[300px] w-full flex-col items-center justify-center rounded-lg border border-border bg-background',className)}>
        {settings}
        <p className="z-10 whitespace-pre-wrap relative grid gap-3 w-full px-4 lg:w-2/3 xl:w-3/5 2xl:w-2/5">{children}</p>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </>
  );
}
