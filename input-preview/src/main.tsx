import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./global.css";
import "./input.css";
import { ThemeProvider } from "./routes/_main-layout/-contexts/ThemeContext";
import {
  ComponentDescriptor,
  components,
  DefaultProps,
  InputMasterProvider,
} from "input-master";
import { ChevronDown, X } from "lucide-react";
import ValidationComponent from "./ValidationComponent";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

const cs: ComponentDescriptor = {
  type: "wrapper",
  children: [
    {
      type: "before",
    },
    {
      type: "input",
    },
    {
      type: "title",
    },
    {
      type: "loading",
    },
    {
      type: "after",
    },
    {
      type: "validation",
    },
  ],
};

const DropdownIndicator = (props: any) => {
  console.log(props);
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ChevronDown
          strokeWidth={1}
          className={`${props.selectProps.menuIsOpen ? "-rotate-180" : ""} transition-transform duration-300`}
          size={20}
        />
      </components.DropdownIndicator>
    )
  );
};

const ClearIndicator = (props: any) => {
  console.log(props);
  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <X strokeWidth={0.8} size={18} />
      </components.ClearIndicator>
    )
  );
};

const MultiValueRemove = (props: any) => {
  console.log(props);
  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <X strokeWidth={1} size={15} className="cursor-pointer" />
      </components.MultiValueRemove>
    )
  );
};

const defaultProps: DefaultProps = {
  unstyled: true,
  loadingClassName: "default-input-loading",
  disabledClassName: "default-input-disabled",
  wrapperClassName: "default-input-wrapper",
  notValidClassName: "default-input-not-valid",
  afterClassName: "default-input-after",
  beforeClassName: "default-input-before",
  titleClassName: "default-input-title",
  componentStructure: cs,
  classNamePrefix: "filter",
  validationOn: "submit-blur-change",
  components: {
    DropdownIndicator,
    ClearIndicator,
    MultiValueRemove,
  },
  validationComponent: ValidationComponent,
  portal: document.querySelector("body"),
};

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider>
      <InputMasterProvider defaultProps={defaultProps}>
        <RouterProvider router={router} />
      </InputMasterProvider>
    </ThemeProvider>
  );
}
