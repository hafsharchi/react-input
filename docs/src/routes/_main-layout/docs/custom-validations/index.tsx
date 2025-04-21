import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { CustomValidation, Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/custom-validations/")({
  component: Text,
});

export const emailValidation: CustomValidation = {
  func(value): boolean {
    if (value === "") return true; // Allow empty values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.toString());
  },
  error: "Please enter a valid email address",
};

// Custom validation to allow only English characters
export const englishOnlyValidation: CustomValidation = {
  func(value): boolean {
    if (value === "") return true; // Allow empty values
    const englishOnlyRegex = /^[a-zA-Z0-9@.\-_]+$/;
    return englishOnlyRegex.test(value.toString());
  },
  error: "Only English characters are allowed",
};

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [styled, setStyled] = useState<boolean>(true);
  const codeSnippet = `import { Input, useInput } from "input-master";

const emailValidation: CustomValidation = {
  func(value): boolean {
    if (value === '') return true; // Allow empty values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.toString());
  },
  error: 'Please enter a valid email address',
};

const englishOnlyValidation: CustomValidation = {
  func(value): boolean {
    if (value === '') return true; // Allow empty values
    const englishOnlyRegex = /^[a-zA-Z0-9@.\-_]+$/;
    return englishOnlyRegex.test(value.toString());
  },
  error: 'Only English characters are allowed',
};

export const Form = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>
      <Input
        {...inputConfigs(styled)}
        type="text"
        title="Email"
        required
        customValidations={[emailValidation, englishOnlyValidation]}
        name="email"
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
              type="text"
              title="Email"
              required
              customValidations={[emailValidation, englishOnlyValidation]}
              name="email"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit-blur-change"
              register={useRegister}
            />

            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() => submit((d) => alert(`email: ${d.email}`))}
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
        The<code>customValidations</code>prop allows you to add your own
        validation logic to any input field. This prop accepts an array of
        CustomValidation objects, each of which defines a custom validation
        function and an associated error message. This feature gives you the
        flexibility to enforce specific business rules or field-specific
        requirements that go beyond the standard validation options provided by
        the library.
      </p>
      <p>Each custom validation consists of two key properties:</p>

      <ul>
        <li>
          <code>func</code>:A function that takes the input value as a parameter
          and returns a boolean indicating whether the validation passed (true)
          or failed (false).
        </li>
        <li>
          <code>error</code>:A string that contains the error message to be
          displayed when the validation fails.
        </li>
      </ul>

      <p>
        Here’s an example of a custom validation that checks if an input value
        is a valid email address:
      </p>

      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`import { CustomValidation } from 'input-master';

// Custom validation for email format
export const emailValidation: CustomValidation = {
  func(value): boolean {
    if (value === '') return true; // Allow empty values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.toString());
  },
  error: 'Please enter a valid email address',
};

// Custom validation to allow only English characters
export const englishOnlyValidation: CustomValidation = {
  func(value): boolean {
    if (value === '') return true; // Allow empty values
    const englishOnlyRegex = /^[a-zA-Z0-9@.\-_]+$/;
    return englishOnlyRegex.test(value.toString());
  },
  error: 'Only English characters are allowed',
};
`}
      />

      <p>
        In this case, the<code>emailCV</code>custom validation checks that the
        input value matches both an email format and allows only English
        characters.
      </p>
      <p>
        To use custom validations, pass them as an array to the
        customValidations prop when rendering your input field:
      </p>
      <CodeHighlighter
        language="tsx"
        className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
        code={`   <Input
  ...
  customValidations={[emailValidation, englishOnlyValidation]}
  ...
/>
              `}
      />
    </>
  );
}
