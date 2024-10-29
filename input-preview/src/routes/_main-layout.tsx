import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "./_main-layout/-components/Header";
import Sidebar from "./_main-layout/-components/Sidebar";
import Footer from "./_main-layout/-components/Footer";
import Rightbar from "./_main-layout/-components/Rightbar";
import { ThemeProvider } from "./_main-layout/-contexts/ThemeContext";
import { ComponentDescriptor, components, DefaultProps, InputMasterProvider } from "input-master";
import ValidationComponent from "../ValidationComponent";
import { ChevronDown, X } from "lucide-react";
export const Route = createFileRoute("/_main-layout")({
  component: MainLayout,
});

function MainLayout() {
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

  const defaultProps :DefaultProps = {
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
    components:{
      DropdownIndicator,
      ClearIndicator,
      MultiValueRemove,
    },
    validationComponent: ValidationComponent,
    portal: document.querySelector("body"),
  };
  return (
    <ThemeProvider>
      <InputMasterProvider defaultProps={defaultProps}>
        <Header />
        <div className="flex w-3/4 overflow-hidden mx-auto min-h-screen gap-20">
          <Sidebar className="shrink-0 w-60" />
          <div className="w-full overflow-hidden">
            <Outlet />
          </div>
          <Rightbar className="w-60 hidden 2xl:block shrink-0" />
        </div>
        <Footer />
      </InputMasterProvider>
    </ThemeProvider>
  );
}


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
