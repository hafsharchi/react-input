import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

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
              {...inputConfigs(styled)}
              type="password"
              title="Password *"
              required
              minLength={2}
              name="password"
              className="pr-5"
              togglePasswordVisibilityClassName="absolute z-10 top-2.5 right-2 cursor-pointer opacity-50"
              notValidClassName="border !border-rose-500/50"
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
      <h2>Description</h2>
      <p>
        The Password input type is ideal for securely capturing sensitive
        information, like passwords, with options to toggle visibility for easy
        user experience. It comes with all the standard features of our input
        library and can be fully customized to suit your needs!
      </p>
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
      <p>
        Below is a table of specific properties unique to the Password input
        type:
      </p>
      <h2>Props</h2>
      <table className="w-full text-center text-sm">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="font-light">
          <tr>
            <td>showIcon</td>
            <td className="whitespace-nowrap">React Node</td>
            <td>The icon used to toggle and show the password.</td>
          </tr>
          <tr>
            <td>hideIcon</td>
            <td>React Node</td>
            <td>The icon used to toggle and hide the password.</td>
          </tr>
          <tr>
            <td>togglePasswordVisibilityClassName</td>
            <td>string</td>
            <td>The icon used to toggle and hide the password.</td>
          </tr>
          <tr>
            <td>maxLength</td>
            <td>number</td>
            <td>Specifies the maximum number of characters allowed.</td>
          </tr>
          <tr>
            <td>minLength</td>
            <td>number</td>
            <td>Specifies the minimum number of characters required.</td>
          </tr>
          <tr>
            <td>...other props </td>
            <td>-</td>
            <td>
              Includes all common props, which you can explore further in the
              common props documentation.
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
