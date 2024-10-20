import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/text copy/")({
  component: Text,
});

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [styled, setStyled] = useState<boolean>(true);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
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
        validationOn="submit"
        register={useRegister}
      />
      <Input
        type="text"
        title="Last Name"
        name="lastName"
        validationOn="submit-blur-change"
        register={useRegister}
        maxLength={7}
      />
      <button
        onClick={() =>
          submit((formData) => // automatically checks validation and if is valid:
            alert("firstName: " + formData.firstName + "lastName: " + formData.lastName)
          )
        }
      >
        submit
      </button>
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
          <PreviewBox
            settings={
              <div className="flex absolute left-4 top-4 gap-1">
                <Button
                  active={styled}
                  onClick={() => {
                    setStyled(true);
                  }}
                >
                  styled
                </Button>
                <Button
                  active={!styled}
                  onClick={() => {
                    setStyled(false);
                  }}
                >
                  default
                </Button>
              </div>
            }
          >
            <Input
              {...inputConfigs(styled)}
              type="text"
              title="First Name *"
              required
              minLength={2}
              name="firstName"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit"
              register={useRegister}
            />
            <Input
              {...inputConfigs(styled)}
              type="text"
              title="Last Name"
              name="lastName"
              validationOn="submit-blur-change"
              register={useRegister}
              maxLength={7}
            />
            <Button variant="submit" className="mx-auto mt-3" onClick={() => submit((d) => alert(`firstName: ${d.firstName}, lastName: ${d.lastName}`))}>Sumbit</Button>
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
        The Text input type is perfect for capturing single-line text from
        users, like names or short responses! It automatically includes all the
        shared features available across our input types. If you're curious
        about these shared properties, feel free to check them out here.
      </p>
      <p>
        Below is a table of specific properties unique to the Text input type:
      </p>
      <h2>Props</h2>
      <table className="w-full text-center text-sm rounded-lg  border-1 border-red-400">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody className="font-light">
          <tr>
            <td>MaxLength</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>MinLength</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          
        </tbody>
      </table>
    </>
  );
}
