import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "./_main-layout/-components/Header";
import Sidebar from "./_main-layout/-components/Sidebar";
import Footer from "./_main-layout/-components/Footer";
import Rightbar from "./_main-layout/-components/Rightbar";
import { ThemeProvider } from "./_main-layout/-contexts/ThemeContext";

export const Route = createFileRoute("/_main-layout")({
  component: MainLayout,
});

function MainLayout() {
  return (
    <ThemeProvider>
      <Header />
      <div className="flex w-3/4 overflow-hidden mx-auto min-h-screen gap-20">
        <Sidebar className="shrink-0 w-60" />
        <div className="w-full overflow-hidden">
          <Outlet />
        </div>
        <Rightbar className="w-60 hidden 2xl:block shrink-0" />
      </div>
      <Footer />
    </ThemeProvider>
  );
}
