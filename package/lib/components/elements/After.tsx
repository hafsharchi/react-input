import React from "react";

type Props = {
  tag?: React.ElementType;
  after: React.ReactNode;
  className?: string;
};

export function After({
  tag: Tag = "div",
  className = "",
  after,
}: Props) {
  return <Tag className={className}>{after}</Tag>;
}
