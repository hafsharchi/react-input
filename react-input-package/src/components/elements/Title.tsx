import React from "react";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  title: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export function Title({
  tag: Tag = "div",
  htmlFor,
  className = "",
  title,
}: Props) {
  return (
    <Tag htmlFor={htmlFor} className={className}>
      {title}
    </Tag>
  );
}
