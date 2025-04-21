import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/disabled/")({
  component: Disabled,
});

function Disabled() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
export const TextInput = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>
      <Input
        type="text"
        title="Disabled Input *"
        required
        minLength={2}
        name="firstName"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        disabled
        disabledClassName="!bg-foreground/10 cursor-not-allowed"
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
              {...inputConfigs()}
              type="text"
              title="First Name *"
              required
              minLength={2}
              name="firstName"
              disabled
              disabledClassName="!bg-foreground/10 cursor-not-allowed"
              register={useRegister}
              notValidClassName="border !border-rose-500/50"
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
        The<code>disabled</code>functionality allows you to disable an input field,
        preventing user interaction, and provides a way to customize its
        appearance when it is<code>disabled</code>. This is useful for scenarios where an
        input should be temporarily non-interactive, such as during form
        submissions or when certain conditions are not met.
      </p>
      <ul>
        <li><b>disabled: </b>
        A boolean that indicates whether the input should be disabled. When set to true, the input is non-interactive.
        </li>
        <li><b>disabledClassName: </b>
        A string that defines the CSS class to apply to the input when it is disabled, allowing for customized styling.
        </li>
      </ul>
    </>
  );
}
