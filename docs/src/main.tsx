import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./assets/styles/global.css";
import "./assets/styles/input.css";
import { ThemeProvider } from "./routes/_main-layout/-contexts/ThemeContext";
import { InputMasterProvider } from "input-master";
import { defaultInputProps } from "./configs/defaultInput";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider>
      <InputMasterProvider defaultProps={defaultInputProps}>
        <RouterProvider router={router} />
      </InputMasterProvider>
    </ThemeProvider>
  );
}
