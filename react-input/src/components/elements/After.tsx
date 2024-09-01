
type Props = {
  tag?: keyof JSX.IntrinsicElements;
  after: React.ReactNode;
  className?: string;
};

export default function After({
  tag: Tag = "div",
  className = "",
  after,
}: Props) {
  return <Tag className={className}>{after}</Tag>;
}
