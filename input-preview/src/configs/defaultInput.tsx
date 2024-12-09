import { ComponentDescriptor, components, DefaultProps } from "input-master";
import { ChevronDown, X } from "lucide-react";
import ValidationComponent from "../components/ValidationComponent";

const componentStructure: ComponentDescriptor = {
  type: "wrapper",
  hasValueClassName: "has-value",
  children: [
    {
      type: "before",
    },
    {
      type: "input",
    },
    {
      type: "title",
    },
    {
      type: "loading",
    },
    {
      type: "after",
    },
    {
      type: "validation",
    },
  ],
};

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

export const defaultInputProps: DefaultProps = {
  unstyled: true,
  loadingClassName: "default-input-loading",
  disabledClassName: "default-input-disabled",
  wrapperClassName: "default-input-wrapper",
  notValidClassName: "default-input-not-valid",
  afterClassName: "default-input-after",
  beforeClassName: "default-input-before",
  titleClassName: "default-input-title",
  componentStructure: componentStructure,
  classNamePrefix: "filter",
  validationOn: "submit-blur-change",
  components: {
    DropdownIndicator,
    ClearIndicator,
    MultiValueRemove,
  },
  validationComponent: ValidationComponent,
  portal: document.querySelector("body"),
};
