import React from "react";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  before: React.ReactNode;
  className?: string;
};

export function Before({
  tag: Tag = "div",
  className = "",
  before,
}: Props) {
  return <Tag className={className}>{before}</Tag>;
}
