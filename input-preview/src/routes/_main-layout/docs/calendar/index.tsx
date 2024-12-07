import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/calendar/")({
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
              type="calendar"
              locale="english"
              editable={false}
              title="Date *"
              required
              name="date"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit"
              register={useRegister}
            />
            
            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() => submit((d) => alert(`date: ${d.date}`))}
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
        The Calendar input type provides a user-friendly interface for selecting
        dates and is perfect for date-specific fields like birthdates,
        appointment scheduling, or event planning. This component leverages the
        powerful <code>react-multidate-picker</code> library, ensuring smooth
        performance and a wide range of features for date picking and
        customization.
      </p>
      <p>
        While the Calendar input supports most features from
        <code>react-multidate-picker</code>, we’re continuously enhancing it,
        and some additional features will be included in future updates.
        However, all key functionalities are already in place, making it fully
        usable and customizable in your current projects.
      </p>

      <p>
        One standout feature of the Calendar input is its support for multiple
        calendar types, including English (Gregorian), Persian, Arabic and Hindi
        calendars. This makes it a highly versatile solution for applications
        that need to cater to different regions and languages.
      </p>

      <p>
        In addition to all the features of <code>react-multidate-picker</code>,
        we’ve integrated our library’s BaseProps, so you can take full advantage
        of customization, validation, and styling options provided by our
        system. This ensures consistency across all your input components.
      </p>

      <p>
        For a full list of the supported features and configurations, refer to
        the <code>react-multidate-picker</code> documentation, as our Calendar
        input retains most of these features while adding our library’s extended
        capabilities.
      </p>
      
      <p>
        Below is a table of specific properties unique to the Calendar input
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
            <td colSpan={3}>
              Including All Base Props And these specific props:
            </td>
          </tr>
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
