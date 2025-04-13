import React from "react";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  key?: any;
};

export function Wrapper({ tag: Tag = "div", className = "", children, key }: Props) {
  return <Tag id={key} className={className}>{children}</Tag>;
}
