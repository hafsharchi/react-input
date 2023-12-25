import React from "react";
import { Select } from "../../types";

import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";

const InputSelect = React.memo((_: Select) => {
  const [value, setValue] = React.useState<
    OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
  >();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onChange) _.onChange();
    // setValue(event);
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (_.onBlur) _.onBlur();
    console.log(value);
  };

  return (
    <>
      <ReactSelect
        {..._.register(_.name, _.type)}
        isDisabled={_.disabled}
        id={_.id}
        placeholder="جستجو..."
        classNamePrefix="filter"
        options={_.options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isMulti={_.multiple}
      />
    </>
  );
});

export default InputSelect;
