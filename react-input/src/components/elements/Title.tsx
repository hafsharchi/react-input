
type Props = {
  tag?: keyof JSX.IntrinsicElements;
  title: React.ReactNode;
  className?: string;
};

export default function Title({
  tag: Tag = "div",
  className = "",
  title,
}: Props) {
  return <Tag className={className}>{title}</Tag>;
}
