import React from "react";
import { Integer } from "../../types";
import { vMinValue } from "../../utils/validations/vMinValue";
import { vMaxValue } from "../../utils/validations/vMaxValue";

const InputInteger = React.memo((_: Integer) => {
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onChange) return _.onChange;

    setIsValid(checkValidation(e));
  };

  const checkValidation = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
    if (_.minValue && !vMinValue({ event: e, minValue: _.minValue }))
      return false;
    if (_.maxValue && !vMaxValue({ event: e, maxValue: _.maxValue }))
      return false;
    return true;
  };
  return (
    <>
      <input
        {..._.register(_.name)}
        className={`${isValid ? "" : "input-not-valid"}`}
        type="number"
        title={_.title}
        placeholder={_.placeholder}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onChange(e)}
      />
    </>
  );
});

export default InputInteger;
