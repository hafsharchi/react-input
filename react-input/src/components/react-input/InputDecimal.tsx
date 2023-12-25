import React from "react";
import { Decimal } from "../../types";
import { vMinValue } from "../../utils/validations/vMinValue";
import { vMaxValue } from "../../utils/validations/vMaxValue";
import { separate } from "../../utils/Separate";
import { vDecimal } from "../../utils/validations/vDecimal";

const InputDecimal = React.memo((_: Decimal) => {
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onChange) return _.onChange;
    vDecimal({ event: e });
    if (_.separator) separate({ event: e, seperator: _.separator });

    if (_.validationOn == "submit-blur-change" || !isValid)
      setIsValid(checkValidation(e));
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onBlur) return _.onBlur;
    vDecimal({ event: e });
    if (_.separator) separate({ event: e, seperator: _.separator });

    if (
      _.validationOn == "submit-blur-change" ||
      _.validationOn == "submit-blur" ||
      !isValid
    )
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
      data-test={checkValidation}
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
