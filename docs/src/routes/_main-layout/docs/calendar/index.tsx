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
         type="calendar"
         locale="english"
         title="Date *"
         required
         name="date"
         register={useRegister}
      />

      <button
        onClick={() =>
          submit((formData) => // automatically checks validation and if is valid:
            alert("date: " + formData.date)
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
        powerful{" "}
        <a
          href="https://shahabyazdi.github.io/react-multi-date-picker/"
          className="hover:underline code"
        >
          react-multidate-picker
        </a>{" "}
        library, ensuring smooth performance and a wide range of features for
        date picking and customization.
      </p>
      <p>
        While the Calendar input supports most features from
        <a
          href="https://shahabyazdi.github.io/react-multi-date-picker/"
          className="hover:underline code"
        >
          react-multidate-picker
        </a>
        , we’re continuously enhancing it, and some additional features will be
        included in future updates. However, all key functionalities are already
        in place, making it fully usable and customizable in your current
        projects.
      </p>

      <p>
        One standout feature of the Calendar input is its support for multiple
        calendar types, including English (Gregorian), Persian, Arabic and Hindi
        calendars. This makes it a highly versatile solution for applications
        that need to cater to different regions and languages.
      </p>

      <p>
        In addition to all the features of{" "}
        <a
          href="https://shahabyazdi.github.io/react-multi-date-picker/"
          className="hover:underline code"
        >
          react-multidate-picker
        </a>
        , we’ve integrated our library’s BaseProps, so you can take full
        advantage of customization, validation, and styling options provided by
        our system. This ensures consistency across all your input components.
      </p>

      <p>
        For a full list of the supported features and configurations, refer to
        the{" "}
        <a
          href="https://shahabyazdi.github.io/react-multi-date-picker/"
          className="hover:underline code"
        >
          react-multidate-picker
        </a>{" "}
        documentation, as our Calendar input retains most of these features
        while adding our library’s extended capabilities.
      </p>

      <h2>Props</h2>
      <Table
        columns={["Prop", "Type", "Description"]}
        data={[
          [
            <code>locale</code>,
            <>
              <code>"persian"</code> | <code>"english"</code> (required)
            </>,
            "Determines the language/locale of the calendar.",
          ],
          [
            <code>range</code>,
            <code>boolean</code>,
            "If true, enables selecting a date range.",
          ],
          [
            <code>maxDate</code>,
            <>
              <code>Date</code> | <code>string</code>
            </>,
            "Sets the selectable date boundaries.",
          ],
          [
            <code>onlyMonth</code>,
            <code>boolean</code>,
            "Allows selection of only the month.",
          ],
          [
            <code>dateSeperator</code>,
            <code>string</code>,
            "separator for formatting dates.",
          ],
          [
            <code> format</code>,
            <code>number</code>,
            "Pattern for formatting dates",
          ],
          [
            <code>editable</code>,
            <code>number</code>,
            "If true, allows manual input of dates.",
          ],
          [
            <code>portal</code>,
            <code>ReactNode</code>,
            "Custom portal for the calendar.",
          ],
          [
            <code>class</code>,
            <code>string</code>,
            "Custom CSS class for the calendar.",
          ],
        ]}
      />
    </>
  );
}
