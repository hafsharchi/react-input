import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput, components } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";
import { ChevronDown, X } from "lucide-react";

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
              type="select"
              options={[
                { label: "Blue", value: 1 },
                { label: "Red", value: 2 },
                { label: "Green", value: "3" },
              ]}
              name="hey"
              classNamePrefix="filter"
              fullWidth
              placeholder=""
              title="First Name *"
              required
              notValidClassName="select-not-valid"
              validationComponent={ValidationComponent}
              validationOn="submit"
              register={useRegister}
              components={{
                DropdownIndicator,
                ClearIndicator,
              }}
            />
            <Input
              {...inputConfigs(styled)}
              type="select"
              options={[
                { label: "Blue", value: 1 },
                { label: "Red", value: 2 },
                { label: "Green", value: "3" },
                { label: "Green", value: "4" },
                { label: "Green", value: "5" },
              ]}
              components={{
                DropdownIndicator,
                ClearIndicator,
                MultiValueRemove,
              }}
              placeholder=""
              name="heydd"
              multiple
              fullWidth
              title="First Name *"
              required
              notValidClassName="select-not-valid"
              validationComponent={ValidationComponent}
              validationOn="submit"
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
        The Select input type provides a dropdown menu for selecting from a list
        of options, offering a streamlined way to handle multiple-choice fields.
        This component uses the popular<code>react-select</code>library under
        the hood, bringing along all the powerful features and configuration
        options that<code>react-select</code>provides.
      </p>
      <p>
        With the Select input, you get the best of both worlds: all the
        customization and accessibility enhancements from
        <code>react-select</code>, combined with the added flexibility and
        features of our input library. You can apply any
        <code>react-select</code>prop to the Select input, along with our
        library's unique props, giving you a highly customizable and efficient
        selection component.
      </p>
      <p>
        Explore the full range of options available in<code>react-select</code>
        here, and refer to our Base Props Documentation for additional
        customization options provided by our library. However, due to some
        conflicts with our library’s BaseProps, a few key props are slightly
        different. These props have been adjusted to align with our library's
        conventions:
        <ul>
          <li>
            multiple: similar to isMulti in<code>react-select</code>
          </li>
          <li>
            disabled: similar to isDisabled in<code>react-select</code>
          </li>
          <li>
            portal: similar to menuPortalTarget<code>react-select</code>
          </li>
        </ul>
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

const DropdownIndicator = (props: any) => {
  console.log(props);
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ChevronDown
          strokeWidth={1}
          className={`${props.selectProps.menuIsOpen ? "-rotate-180" : ""} transition-transform duration-300`}
          size={20}
        />
      </components.DropdownIndicator>
    )
  );
};

const ClearIndicator = (props: any) => {
  console.log(props);
  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <X strokeWidth={0.8} size={18} />
      </components.ClearIndicator>
    )
  );
};

const MultiValueRemove = (props: any) => {
  console.log(props);
  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <X strokeWidth={1} size={15} className="cursor-pointer" />
      </components.MultiValueRemove>
    )
  );
};
