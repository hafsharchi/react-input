import React from "react";
import { ComponentDescriptor } from "./components/types";



const componentStructure: ComponentDescriptor = {
  type: "wrapper",
  tag: "div",
  props: { className: "wrapper" },
  children: [
    {
      type: "other",
      tag: "span",
      props: { className: "inner-span" },
      content: <div>salam</div>,
    },
    {
      type: "title",
      tag: "div",
      props: { className: "inner-div" },
      children: [
        {
          type: "other",
          tag: "p",
          content: "Hi - ",
        },
      ],
    },
    {
      type: "after",
      props: { message: "This is a custom component" },
    },
    {
      type: "input",    
    },
  ],
};

const renderComponent = (descriptor: ComponentDescriptor): React.ReactNode => {

  if (descriptor.type === "input") {
    return React.createElement(
      tag,
      props,
      content,
      ...(childrenElements ?? "")
    );
  } else if (type === "custom" && component) {
    const childrenElements = children ? children.map(renderComponent) : null;

    return React.createElement(component, props, ...(childrenElements ?? ""));
  }

  return null;
};

// Usage
const App = () => {
  return <div>{renderComponent(componentStructure)}</div>;
};

export default App;
