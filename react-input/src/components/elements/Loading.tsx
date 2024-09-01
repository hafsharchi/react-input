type Props = {
  tag?: keyof JSX.IntrinsicElements;
  isLoading?: boolean;
  loadingObject: React.ReactNode;
  className?: string;
};

export default function Loading({
  tag: Tag = "div",
  className = "",
  isLoading = false,
  loadingObject,
}: Props) {
  if (!isLoading) return;
  return <Tag className={className}>{loadingObject}</Tag>;
}
