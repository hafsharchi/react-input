import { cn } from "../../../lib/utils";

type Props = {
    className?: string;
}

export default function Rightbar({className}: Props) {
  return (
    <div className={cn(className,"shrink-0 ")}>Rightbar</div>
  )
}