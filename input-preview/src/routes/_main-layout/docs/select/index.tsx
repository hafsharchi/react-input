import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput, components } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";
import { ChevronDown, X } from "lucide-react";
import Table from "../../../../components/Table";

export const Route = createFileRoute("/_main-layout/docs/select/")({
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
        type="select"
        options={[
          { label: "Blue", value: 1 },
          { label: "Red", value: 2 },
          { label: "Green", value: 3 },
        ]}
        name="color"
        classNamePrefix="filter"
        fullWidth
        placeholder=""
        title="Color *"
        required
        notValidClassName="select-not-valid"
        validationComponent={ValidationComponent}
        validationOn="submit"
        register={useRegister}
      />
      <Input
        type="select"
        options={[
          { label: "Blue", value: 1 },
          { label: "Red", value: 2 },
          { label: "Green", value: 3 },
        ]}
        name="colors"
        classNamePrefix="filter"
        fullWidth
        placeholder=""
        title="Colors *"
        multiple
        required
        notValidClassName="select-not-valid"
        validationComponent={ValidationComponent}
        validationOn="submit"
        register={useRegister}
      />
      <button
        onClick={() =>
          submit((formData) => // automatically checks validation and if is valid:
            alert('color:' + formData.color.value + 'colors:' + formData.colors.map(c => c.value))
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
              type="select"
              options={[
                { label: "Blue", value: 1 },
                { label: "Red", value: 2 },
                { label: "Green", value: 3 },
              ]}
              name="color"
              placeholder=""
              title="Color *"
              required
              notValidClassName="select-not-valid"
              validationOn="submit"
              register={useRegister}
              isClearable
            />
            <Input
              type="select"
              options={[
                { label: "Blue", value: 1 },
                { label: "Red", value: 2 },
                { label: "Green", value: 3 },
              ]}
              placeholder=""
              name="colors"
              multiple
              title="Colors *"
              required
              notValidClassName="select-not-valid"
              validationOn="submit"
              register={useRegister}
            />
            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() =>
                submit((d) =>
                  alert(
                    `color: ${d.color.value}, colors: ${d.colors.map((c: any) => c.value)}`
                  )
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
      <h2>Props</h2>
      <p>
        This component uses <code>react-select</code> under the hood, and all
        props of <code>react-select</code> are available here.
      </p>

      <Table
        columns={["Prop", "Type", "Description"]}
        data={[
          [
            <code>multiple</code>,
            <code>boolean</code>,
            "Allows multiple selections if true.",
          ],
          [
            <code>portal</code>,
            <code>ReactNode</code>,
            "Renders the dropdown list into a portal element.",
          ],
        ]}
      />
      <p className="italic">
        Note: Inherits additional settings from <code>react-select</code>.
      </p>
    </>
  );
}
