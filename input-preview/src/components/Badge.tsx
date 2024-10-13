
type Props = {
    children: React.ReactNode;
    variant?: "default" | "d"
}

export default function Badge({children, variant = "default"}: Props) {
    let className = "";
    switch (variant) {
        case "d":
            className = ""
            break;
    
        default:
            className="bg-foreground/20 text-background text-xs px-2 py-0.5"
            break;
    }
  return (
    <div className={className}>{children}</div>
  )
}