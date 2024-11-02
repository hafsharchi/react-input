import { createFileRoute, Link } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/styling/")({
  component: Text,
});

function Text() {
  return (
    <>
      <DocsBreadcrumb page="Styling guide" />
      <br />
      <h2>Styling</h2>
      <p>
        The only thing that might be slightly challenging when using this
        library is the styling; however, it's not more challenging than with
        default inputs or other input libraries. While styling can be a bit
        different at first, trust me, it pays off. With the flexibility of class
        name props and the ability to customize the component structure, you can
        ensure your inputs fit seamlessly into your application's design—and the
        best part is, it’s completely customizable!
      </p>
      <h2>Setting Up Default Styles</h2>
      <p>
        To maintain a consistent look and feel across all your inputs, you can
        use the<code>InputMasterProvider</code>. By wrapping your components
        within this provider, you define default styling properties that can be
        easily overridden where necessary.
      </p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`import { DefaultProps, InputMasterProvider } from "input-master";


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

...
<InputMasterProvider defaultProps={defaultProps}>
  {/* Your inputs */}
</InputMasterProvider>;
...
`}
      />
      <p>
        In this example, when you specify props for your input, they will apply
        alongside the default properties. For instance, if the defaults set a
        border radius for your input, you can customize a specific input to have
        a blue background while retaining that border radius like this:
      </p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`<Input
  ...
  className="bg-blue-500"
  ...
/>
`}
      />
      <p>
        This way, you can easily combine default styles with specific
        customizations for a tailored look.
      </p>
      <h2>Key Styling Elements</h2>
      <ul>
        <li>
          <b>Wrapper: </b>The main container for your input components. It can
          be styled using<code>wrapperClassName</code> prop.
        </li>
        <li>
          <b>Main Input Element: </b>The input field itself can be styled using
          the<code>className</code>prop, allowing for easy customization of its
          appearance.
        </li>
        <li>
          <b>Title</b>Use the<code>titleClassName</code>prop to style the title
          of the input. This ensures the title stands out and provides clarity
          to the user.
        </li>
        <li>
          <b>Before Element: </b>Styled with the<code>beforeClassName</code>
          prop, this element appears before the input, perfect for icons or
          supplementary information.
        </li>
        <li>
          <b>After Element:</b>Similarly, the<code>afterClassName</code>prop
          styles this element, which appears immediately after the input and can
          be used for actions like clearing the input.
        </li>
        <li>
          <b>Loading Object:</b>When the<code>loading</code>prop is active, a
          loading indicator is displayed inside the wrapper. Style this using
          the<code>loadingClassName</code>, which will appear after the after
          element by default.
        </li>
        <li>
          <b>Validation Component: </b>Manage and style validation error
          messages using the<code>validationComponent</code>prop. For detailed
          handling of validation errors, refer to the{" "}
          <Link to="/docs/validation-component" className="text-blue-400">
            Validation Component documentation
          </Link>
          .
        </li>
      </ul>
      <h2>Default Structure of the Input</h2>
      <p>This is how the default structure of the input looks:</p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`<div class="wrapperClassName">
  <div class="beforeClassName">Before ...</div>
  <div class="titleClassName">Title ...</div>
  <input
    class="disabledClassName(when disabled prop is true) className"
    title="Title ..."
  />
  <div class="loadingClassName">Loading ...</div>
  <div class="afterClassName">After ...</div>
</div>

`}
      />
      <div>
        You can customize this structure using the following guide on component
        structure.
      </div>
      <h2>Customizing Component Structure</h2>
      <p>
        One of the standout features of our library is the ability to define a
        custom structure for your inputs through the
        <code>componentStructure</code>prop. This allows you to control the
        order and arrangement of elements with ease.
      </p>
      <b>Example Structure Definition:</b>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`const componentStructure = {
  type: 'wrapper',
  children: [
    {
      type: 'title',
    },
    {
      type: 'other',
      props: {
        className: 'default-inside-wrapper',
      },
      children: [
        {
          type: 'other',
          props: {
            className: 'default-input-row',
          },
          children: [
            {
              type: 'input',
            },
            {
              type: 'loading',
            },
            {
              type: 'after',
            },
          ],
        },
        {
          type: 'validation',
        },
      ],
    },
  ],
};

...

<Input
  ...
  componentStructure={componentStructure}
  ...
/>

...

`}
      />
      <b>Resulting HTML Structure:</b>
      <p>Using the above structure, your HTML will be organized as follows:</p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`<div class="default-inside-wrapper">
  <div class="default-input-row">
    <input type="text" />
    <div class="default-input-loading">Loading...</div>
    <div class="default-input-after">X</div>
  </div>
  <!-- Validation component here -->
</div>
`}
      />
      <p>
        The component structure allows you to define the hierarchy and
        arrangement of elements in your input component. Each element is
        identified by its type, which specifies its purpose and position within
        the layout. The types you can use include:
        <br />
        <code>wrapper</code> <code>title</code>
        <code>input</code>
        <code>loading</code>
        <code>validation</code>
        <code>before</code>
        <code>after</code>
        <br />
        And:
        <br />
        <code>other</code> : A flexible type for any other custom elements you
        might want to include in the structure.
        <br />
        <br />
        By using these types, you can create a highly customizable and organized
        input layout that fits your specific needs.
        <br />
        The componentStructure prop empowers you to easily modify the order of
        elements or include new ones as needed. For example, if you want the
        validation messages to appear above the input, you can adjust the
        hierarchy accordingly. This flexibility allows for tailored layouts that
        meet your design needs.
      </p>

      <p className="bg-foreground/5 p-3 rounded-md border border-foreground/15 text-sm">
        Additionally, for styling the select and calendar types, you can refer
        to the documentation for react-select and react-multi-datepicker. We
        also provide examples to help guide you through the customization
        process.
      </p>
    </>
  );
}
