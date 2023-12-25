import React from "react";
import { Decimal } from "../../types";
import { vMinValue } from "../../utils/validations/vMinValue";
import { vMaxValue } from "../../utils/validations/vMaxValue";
import { separate } from "../../utils/Separate";
import { vDecimal } from "../../utils/validations/vDecimal";

const InputDecimal = React.memo((_: Decimal) => {
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onChange) _.onChange();
    vDecimal({ event: e });
    if (_.separator) separate({ event: e, seperator: _.separator });

    if (_.validationOn == "submit-blur-change" || !isValid)
      setIsValid(checkValidation(e.target?.value ?? ""));
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onBlur) _.onBlur();

    if (
      _.validationOn == "submit-blur-change" ||
      _.validationOn == "submit-blur" ||
      !isValid
    )
      setIsValid(checkValidation(e.target?.value ?? ""));
  };

  const checkValidation = (currentValue: string): boolean => {
    if (
      _.minValue &&
      !vMinValue({ currentValue: currentValue, minValue: _.minValue })
    )
      return false;

    if (
      _.maxValue &&
      !vMaxValue({ currentValue: currentValue, maxValue: _.maxValue })
    )
      return false;

    return true;
  };
  return (
    <>
      <input
        {..._.register(_.name, _.type)}
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

export default InputDecimal;
