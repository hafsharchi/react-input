import { ComponentDescriptor } from "input-master";


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

export const inputConfigs = (styled?: boolean) => {
  if (styled == false) return {};
  return {
    
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
