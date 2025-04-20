import React from "react";

type Props = {
  tag?: React.ElementType;
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
