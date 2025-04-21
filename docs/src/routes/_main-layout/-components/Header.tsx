import { Github, LayoutDashboardIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "../-contexts/ThemeContext";
import { Link } from "@tanstack/react-router";

type Props = {};

export default function Header({}: Props) {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="px-10 md:px-16 lg:px-24 xl:px-44 2xl:px-64 h-14 flex items-center w-full justify-between font-black z-20 bg-background/40 dark:bg-background/20 backdrop-blur-lg mx-auto content-center sticky top-0 border-b">
      <div className="flex gap-2 items-center font-semibold text-sm">
        <LayoutDashboardIcon strokeWidth={3} className="bg-gradient-to-br from-sky-400 to-rose-500 p-1 rounded-md" />
        <p className="text-foreground font-bold tracking-wide">Input Master</p>
        <p className="bg-foreground/10 px-2 rounded-md text-xs font-semibold border py-1 text-foreground mr-5">Beta</p>
        <Link to="/docs/introduction" className="hover:text-foreground/80 mx-2 text-foreground/50 transition-colors text-sm">Docs</Link>
        <Link to="/docs/introduction" className="hover:text-foreground/80 mx-2 text-foreground/50 transition-colors text-sm">Examples</Link>
      </div>
      <div className="flex gap-4 items-center font-semibold text-sm">
        <div className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <Github strokeWidth={1} />
        </div>
        <div
          onClick={toggleTheme}
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        >
          {theme === "light" ? (
            <Moon strokeWidth={1} className="spin-once" />
          ) : (
            <Sun strokeWidth={1.3} className="spin-once" />
          )}
        </div>
      </div>
    </div>
  );
}
