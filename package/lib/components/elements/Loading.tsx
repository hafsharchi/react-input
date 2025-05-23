import React from "react";

type Props = {
  tag?: React.ElementType;
  isLoading?: boolean;
  loadingObject: React.ReactNode;
  className?: string;
};

export function Loading({
  tag: Tag = "div",
  className = "",
  isLoading = false,
  loadingObject,
}: Props) {
  if (!isLoading) return;
  return <Tag className={className}>{loadingObject}</Tag>;
}
