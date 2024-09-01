type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
};

export default function Wrapper({
  tag: Tag = "div",
  className = "",
  children,
}: Props) {
  return <Tag className={className}>{children}</Tag>;
}
