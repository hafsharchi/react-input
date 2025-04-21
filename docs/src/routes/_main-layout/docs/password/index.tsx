import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";
import Table from "../../../../components/Table";

export const Route = createFileRoute("/_main-layout/docs/password/")({
  component: Password,
});

function Password() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [styled, setStyled] = useState<boolean>(true);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
export const Form = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>
      <Input
        {...inputConfigs(styled)}
        type="password"
        title="Password *"
        required
        minLength={2}
        name="password"
        togglePasswordVisibilityClassName="absolute top-2.5 right-2 cursor-pointer"
        className="pr-5"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit"
        register={useRegister}
      />
      <button
        onClick={() =>
          submit((formData) => // automatically checks validation and if is valid:
            alert("password: " + formData.password)
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
              type="password"
              title="Password *"
              required
              minLength={2}
              name="password"
              className="pr-5"
              togglePasswordVisibilityClassName="absolute z-10 top-2.5 right-2 cursor-pointer opacity-50"
              validationComponent={ValidationComponent}
              validationOn="submit"
              register={useRegister}
            />
            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() => submit((d) => alert(`password: ${d.password}`))}
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

      <p>
        <b>Note: </b> To ensure a consistent design and prevent the browser's
        default eye icon from displaying on password fields, add the following
        CSS to your project:
      </p>
      <CodeHighlighter
        language="css"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
`}
      />
      <h2>Props</h2>
      <Table
        columns={["Prop", "Type", "Description"]}
        data={[
          [
            <code>showIcon</code>,
            <code>ReactNode</code>,
            "Custom icon to show the password",
          ],
          [
            <code>hideIcon</code>,
            <code>ReactNode</code>,
            "Custom icon to hide the password",
          ],
          [
            <code>togglePasswordVisibilityClassName</code>,
            <code>string</code>,
            "Custom CSS class for the visibility toggle button.",
          ],
          [
            <code>maxLength</code>,
            <code>number</code>,
            "Enforces length restrictions on the password.",
          ],
          [
            <code>minLength</code>,
            <code>number</code>,
            "Enforces length restrictions on the password.",
          ],
        ]}
      />
    </>
  );
}
