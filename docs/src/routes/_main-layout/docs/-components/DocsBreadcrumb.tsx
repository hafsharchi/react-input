import { ChevronRight } from "lucide-react";

type Props = {
  page: string;
};

export default function DocsBreadcrumb({ page }: Props) {
  return (
    <div className="flex my-6 text-sm items-center gap-1 text-foreground">
      Docs <ChevronRight size={16} strokeWidth={1} />
      <span className="text-subtext">{page}</span>
    </div>
  );
}
