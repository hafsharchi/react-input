
type Props = {
  tag?: keyof JSX.IntrinsicElements;
  before: React.ReactNode;
  className?: string;
};

export default function Before({
  tag: Tag = "div",
  className = "",
  before,
}: Props) {
  return <Tag className={className}>{before}</Tag>;
}
