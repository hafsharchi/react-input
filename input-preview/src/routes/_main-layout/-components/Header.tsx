import { LayoutDashboardIcon } from "lucide-react";
import { useTheme } from "../-contexts/ThemeContext";

type Props = {};

export default function Header({}: Props) {
  const { toggleTheme } = useTheme();
  return (
    <div className="px-10 h-14 flex items-center justify-between font-black z-20 italic bg-background/95 dark:bg-background/50 backdrop-blur-lg w-4/5 mx-auto content-center sticky top-0">
      <div className="flex gap-2 items-center">
        <LayoutDashboardIcon /> Form Master
      </div>
      <div onClick={toggleTheme}>
        Change theme
      </div>
    </div>
  );
}
