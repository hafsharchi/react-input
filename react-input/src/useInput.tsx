import React from "react";

type Input = {
  name: string;
  ref: React.MutableRefObject<any>;
};

const useInput = () => {
  var inputs: Array<Input> = [];

  const register = (name: string) => {
    inputs = inputs.filter((input) => input.name !== name);

    var input: Input = {
      name: name,
      ref: React.useRef<any>(),
    };

    inputs.push(input);

    return { ...input };
  };

  const update = () => {
    inputs.map((item, index) => {
      item.ref.current.value = index;

      item.ref.current._valueTracker.setValue();

      item.ref.current.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };
  return { register, inputs, update };
};

export default useInput;
