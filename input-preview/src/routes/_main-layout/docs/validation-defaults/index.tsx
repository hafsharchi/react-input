import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/validation-defaults/")(
  {
    component: Text,
  }
);

function Text() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const codeSnippet = `import { ReactInputProvider } from "input-master";

const customErrors = {
  minValue: 'The value is too low. Please enter a higher value.',
  maxValue: 'The value exceeds the allowed limit. Please enter a lower value.',
  minLength: 'The input is too short. Please provide more characters.',
  maxLength: 'The input is too long. Please shorten your input.',
  required: 'This field is required. Please fill it out.',
};

return (
  <ReactInputProvider 
    errors={customErrors} 
    onValidationFailedFunction={() => alert('Some fields are invalid. Please check and try again.')}
  >
    {/* Your form or other components */}
  </ReactInputProvider>
)

`;
  return (
    <>
      <DocsBreadcrumb page="Text Type" />

      <h2>Description</h2>
      <p>
        You can customize default validation error messages and handle
        validation failures across your entire project by wrapping your app or a
        specific section of it within the<code>ReactInputProvider</code>This
        allows you to define global behaviors for input validation, including
        custom error messages for common validation scenarios and a global
        function to handle validation failures.
      </p>
      <p>
        To apply these defaults, you can create a set of custom error messages
        and pass them, along with other configurations, into the
        <code>ReactInputProvider</code>. Here’s how you can set it up:
      </p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={codeSnippet}
      />
      <br />
      <h1>Default Error Messages</h1>
      <p>
        In the above example, the errors object contains custom messages for
        common validation errors like<code>minValue</code>,<code>maxValue</code>
        ,<code>minLength</code>,<code>maxLength</code>, and{" "}
        <code>required</code>. These error messages will be used by default
        across all input fields in your project.
      </p>
      <br />
      <h1>Global Validation Failure Handler</h1>
      <p>
        The<code>onValidationFailedFunction</code>allows you to define a global behavior
        when form validation fails. In the example, an alert is triggered when
        any input field validation fails, but you can replace it with more
        complex error handling logic, such as logging or custom UI feedback.
      </p>
    </>
  );
}
