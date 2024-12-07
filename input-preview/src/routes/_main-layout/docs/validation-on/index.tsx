import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/validation-on/")({
  component: Text,
});

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
export const TextInput = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>
      <Input
        type="text"
        title="submit"
        required
        minLength={2}
        name="submit"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit"
        register={useRegister}
      />
      <Input
        type="text"
        title="submit-blur"
        required
        minLength={2}
        name="submitBlur"
        notValidClassName="border !border-rose-500/50"
        validationComponent={ValidationComponent}
        validationOn="submit-blur"
        register={useRegister}
      />
      <Input
        type="text"
        title="submit-blur-change"
        required
        minLength={2}
        name="submitBlurChange"
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
      <DocsBreadcrumb page="Validation On" />

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
          <PreviewBox className="h-[400px]">
            <Input
              {...inputConfigs()}
              type="text"
              title="submit"
              required
              minLength={2}
              name="submit"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit"
              register={useRegister}
            />
            <Input
              {...inputConfigs()}
              type="text"
              title="submit-blur"
              required
              minLength={2}
              name="submitBlur"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit-blur"
              register={useRegister}
            />
            <Input
              {...inputConfigs()}
              type="text"
              title="submit-blur-change"
              required
              minLength={2}
              name="submitBlurChange"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
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
        The<code>validationOn</code>prop controls when the input library
        performs validation checks on the fields. It offers three options:
      </p>
      <ul>
        <li>
          <code>submit</code>: Validation occurs only when the form is submitted.
        </li>
        <li>
          <code>submit-blur:</code>: Validation occurs when the form is submitted or
          when the input field loses focus (on blur).
        </li>
        <li>
          <code>submit-blur-change</code>: Validation occurs on form submission, when
          the field loses focus, or whenever the input value changes.
        </li>
      </ul>
      <p>
        This flexibility allows you to fine-tune how and when validations are
        triggered, providing a balance between user experience and data
        integrity.
      </p>
    </>
  );
}
