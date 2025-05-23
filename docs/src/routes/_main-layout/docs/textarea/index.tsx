import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";
import Table from "../../../../components/Table";

export const Route = createFileRoute("/_main-layout/docs/textarea/")({
  component: TextArea,
});

function TextArea() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
export const Form = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>
      <Input
        type="textarea"
        title="Description *"
        required
        minLength={5}
        maxLength={80}
        name="description"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit-blur-change"
        register={useRegister}
      />
      <button
        onClick={() =>
          submit((formData) => // automatically checks validation and if is valid:
            alert('description: ' + formData.description)
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
          <PreviewBox>
            <Input
              type="textarea"
              title="Description *"
              required
              minLength={5}
              maxLength={80}
              name="description"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit-blur-change"
              register={useRegister}
            />

            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() =>
                submit((d) => alert(`description: ${d.description}`))
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

      <h2>Props</h2>
      <Table
        columns={["Prop", "Type", "Description"]}
        data={[
          [
            <code>maxLength</code>,
            <>
              <code>number</code>{" "}
            </>,
            "Enforces length restrictions on the password.",
          ],
          [
            <code>minLength</code>,
            <>
              <code>number</code>{" "}
            </>,
            "Enforces length restrictions on the password.",
          ],
        ]}
      />
    </>
  );
}
