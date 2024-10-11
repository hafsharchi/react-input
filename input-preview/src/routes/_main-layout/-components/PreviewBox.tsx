import React from "react";
import DotPattern from "../../../components/magicui/dot-pattern";
import { cn } from "../../../lib/utils";

type Props = {
  children: React.ReactNode;
  settings?: React.ReactNode;
};

export default function PreviewBox({ children, settings }: Props) {
  return (
    <>
      <div className="relative flex h-[300px] w-full flex-col items-center justify-center rounded-lg border border-border bg-background">
        {settings}
        <p className="z-10 whitespace-pre-wrap relative grid gap-3">{children}</p>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </>
  );
}
