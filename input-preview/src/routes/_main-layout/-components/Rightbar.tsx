import { cn } from "../../../lib/utils";

type Props = {
    className?: string;
}

export default function Rightbar({className}: Props) {
  return (
    <div className={cn(className,"")}>Rightbar</div>
  )
}