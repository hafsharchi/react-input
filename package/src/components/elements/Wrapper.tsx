import React from "react";

type Props = {
  tag?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  key?: React.Key;
};

export function Wrapper({ tag: Tag = "div", className = "", children, key }: Props) {
  return <Tag id={key} className={className}>{children}</Tag>;
}
