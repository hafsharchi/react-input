import { ComponentDescriptor } from "input-master";

const cs: ComponentDescriptor = {
  type: "wrapper",
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

const checkboxCs: ComponentDescriptor = {
  type: "wrapper",
  children: [
    { type: "before" },
    {
      type: "other",
      props: {
        className: "default-leftside-wrapper-checkbox w-full",
      },
      children: [
        {
          type: "other",
          props: {
            className: "default-inside-wrapper-checkbox",
          },
          children: [
            {
              type: "input",
            },
            {
              type: "title",
            },
          ],
        },
        {
          type: "validation",
        },
      ],
    },
  ],
};

export const inputConfigs = (styled: boolean) => {
  if (!styled) return {};
  return {
    fullWidth: true,
    unstyled: true,
    loadingClassName: "default-input-loading",
    disabledClassName: "default-input-disabled",
    wrapperClassName: "default-input-wrapper",
    notValidClassName: "default-input-not-valid",
    afterClassName: "default-input-after",
    beforeClassName: "default-input-before",
    titleClassName: "default-input-title",
    componentStructure: cs,
    classNamePrefix:"filter",
    validationOn: "submit",
    portal: document.querySelector("body"),
  };
};

export const checkboxConfigs = () => {
  return {
    classNamePrefix: "default-checkbox-select",
    loadingClassName: "default-checkbox-loading",
    disabledClassName: "default-checkbox-disabled opacity-50 ",
    wrapperClassName: "default-checkbox-wrapper",
    notValidClassName: "default-checkbox-not-valid",
    afterClassName: "default-checkbox-after",
    beforeClassName: "default-checkbox-before",
    titleClassName: "default-checkbox-title",
    checkboxCs: checkboxCs,
    validationOn: "submit",
    portal: document.querySelector("body"),
  };
};
