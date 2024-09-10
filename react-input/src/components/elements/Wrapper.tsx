import React from "react";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
};

export function Wrapper({
  tag: Tag = "div",
  className = "",
  children,
}: Props) {
  return <Tag className={className}>{children}</Tag>;
}
