export const inputConfigs = (styled: boolean) => {
  if (!styled) return {};
  return {
    fullWidth: true,
    unstyled: true,
    classNamePrefix: "default-input-select",
    loadingClassName: "default-input-loading",
    disabledClassName: "default-input-disabled",
    wrapperClassName: "default-input-wrapper",
    notValidClassName: "default-input-not-valid",
    afterClassName: "default-input-after",
    beforeClassName: "default-input-before",
    titleClassName: "default-input-title",
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
    validationOn: "submit",
    portal: document.querySelector("body"),
  };
};
