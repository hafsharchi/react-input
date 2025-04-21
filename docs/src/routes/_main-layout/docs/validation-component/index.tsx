import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput, ValidationComponentProps } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute(
  "/_main-layout/docs/validation-component/"
)({
  component: Text,
});

const AbsoluteValidationComponent = (_: ValidationComponentProps) => {
  if (_.errors?.length)
    return (
      <div className="absolute bg-rose-500/90 text-white font-normal px-1 py-0.5 rounded-tr-md rounded-bl-md text-2xs right-0 top-0">
        {_.errors[0]}
      </div>
    );
};

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const codeSnippet = `import { Input, useInput, ValidationComponentProps } from "input-master";
  

const ValidationComponent = (props: ValidationComponentProps) => {
  if (props.errors) {
    return props.errors.map((err: string, index: number) => (
      <div
        key={index}
        className="border border-rose-500 text-rose-500 px-2 py-0.5 w-full mt-1 rounded-sm text-xs"
      >
        {err}
      </div>
    ));
  }
  return null;
};

const AbsoluteValidationComponent = (props: ValidationComponentProps) => {
  if (props.errors?.length)
    return (
      <div
        className="absolute bg-rose-500 px-1 py-0.5 rounded-tr-sm rounded-bl-sm text-xs right-0 top-0"
      >
        {props.errors[0]} {/* Just shows the first error */}
      </div>
    );
  }
  return null;
};

export const TextInput = () => {
  const { useRegister, submit } = useInput();

  return (
    <>
      <Input
        type="text"
        title="First Name *"
        required
        minLength={2}
        name="firstName"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit-blur-change"
        register={useRegister}
      />
      <Input
        type="text"
        title="Last Name *"
        required
        wrapperClassName="relative"
        minLength={2}
        name="lastName"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit-blur-change"
        register={useRegister}
      />
      ...
    </>
  );
};
`;
  return (
    <>
      <DocsBreadcrumb page="Text Type" />

      <div className="relative  my-4">
        <div className="flex gap-2">
          <Button
            active={activeTab == 0}
            onClick={() => {
              setActiveTab(0);
            }}
            variant="tab"
          >
            Preview
          </Button>
          <Button
            active={activeTab == 1}
            onClick={() => {
              setActiveTab(1);
            }}
            variant="tab"
          >
            Code
          </Button>
        </div>
        <div className="h-[1px] absolute bottom-[1px] bg-foreground opacity-10 w-full"></div>
      </div>
      {activeTab == 0 ? (
        <>
          <PreviewBox>
            <Input
              type="text"
              title="First Name *"
              required
              minLength={3}
              name="firstName"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit-blur-change"
              register={useRegister}
            />
            <Input
              type="text"
              title="Last Name *"
              required
              minLength={3}
              name="lastName"
              notValidClassName="border !border-rose-500/50"
              validationComponent={AbsoluteValidationComponent}
              validationOn="submit-blur-change"
              register={useRegister}
            />
            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() =>
                submit((d) =>
                  alert(`firstName: ${d.firstName}, lastName: ${d.lastName}`)
                )
              }
            >
              Sumbit
            </Button>
          </PreviewBox>
        </>
      ) : (
        <>
          <CodeHighlighter
            language="tsx"
            className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
            code={codeSnippet}
          />
        </>
      )}
      <br />
      <h2>Description</h2>
      <p>
        The<code>validationComponent</code>prop allows you to handle and
        customize how validation errors are displayed for each input field. By
        passing a custom component to this prop, you can fully control the
        rendering, styling, and behavior of the validation error messages in
        your form. This gives you the flexibility to create a seamless and
        visually consistent user experience across your application.
      </p>
      <p>
        Your custom component will receive the validation errors as props and
        can then render them in any way you choose. Below is an example
        demonstrating how to create a custom validation component and use it
        within the input library:
      </p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`
import { ValidationComponentProps } from "input-master";

const ValidationComponent = (props: ValidationComponentProps) => {
  if (props.errors) {
    return props.errors.map((err: string, index: number) => (
      <div
        key={index}
        className="border border-rose-500 text-rose-500 px-2 py-0.5 w-full mt-1 rounded-sm text-xs"
      >
        {err}
      </div>
    ));
  }
  return null;
};

export default ValidationComponent;
              `}
      />
      <p>
        In this example, the component iterates over the list of validation
        errors and renders each one with a custom style. You can modify this
        style or add additional logic based on your application's requirements.
        To apply this custom validation component to an input field, simply pass
        it as a prop:
      </p>

      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`   <Input
  ...
  validationComponent={ValidationComponent}
  ...
/>
              `}
      />

      <p>
        Now, any validation errors for that input field will be displayed using
        your custom<code>ValidationComponent</code>.
      </p>
    </>
  );
}
