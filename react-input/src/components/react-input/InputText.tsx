import React from "react";
import { Text } from "../../types";
import { vMaxLength } from "../../utils/validations/vMaxLength";
import { vMinLength } from "../../utils/validations/vMinLength";

const InputText = React.memo((_: Text) => {
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onChange) _.onChange();

    if (_.maxLength) vMaxLength({ event: e, maxLength: _.maxLength });

    if (_.validationOn == "submit-blur-change" || !isValid) setIsValid(checkValidation(e));
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onBlur) _.onBlur();

    if (_.maxLength) vMaxLength({ event: e, maxLength: _.maxLength });

    if (
      _.validationOn == "submit-blur-change" ||
      _.validationOn == "submit-blur" ||
      !isValid
    )
      setIsValid(checkValidation(e));
  };

  const checkValidation = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
    if (_.minLength && !vMinLength({ event: e, minLength: _.minLength }))
      return false;

    return true;
  };

  return (
    <>
      <input
        {..._.register(_.name)}
        className={`${isValid ? "" : "input-not-valid"}`}
        type="text"
        title={_.title}
        placeholder={_.placeholder}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
      />
    </>
  );
});

export default InputText;
