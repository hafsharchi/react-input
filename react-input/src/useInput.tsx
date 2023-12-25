import React from "react";
import { Type } from "./types";

type Input = {
  type: Type;
  name: string;
  ref: React.MutableRefObject<any>;
};

const useInput = () => {
  var inputs: Array<Input> = [];

  const register = (name: string, type: Type) => {
    inputs = inputs.filter((input) => input.name !== name);
    var input: Input = {
      type: type,
      name: name,
      ref: React.useRef<any>(),
    };
    inputs.push(input);

    return { ...input };
  };

  const update = () => {
    inputs.map((item, index) => {
      switch (item.type) {
        case "calendar":
          item.ref.current.children[0].value = "1402/03/03";
          break;
        case "integer":
        case "decimal":
          item.ref.current.value = index;
          item.ref.current._valueTracker.setValue();
          item.ref.current.dispatchEvent(new Event("input", { bubbles: true }));
          break;
      }
    });
    console.log(inputs);
  };

  const handleSubmit = () => {
    // var res = inputs.map((input) => {
    //   var a:Function = input.ref.current.getAttribute("data-test");
    //   a();
    //   // input.ref.current.focus();
    //   switch (input.type) {
    //     case "calendar":
    //       return {
    //         [input.name]: input.ref.current.children[0].value,
    //       };
    //     default:
    //       return {
    //         [input.name]: input.ref.current.value,
    //       };
    //   }
    // });

    // var resultObject = res.reduce((acc: any, cur: any) => {
    //   var key = Object.keys(cur)[0];
    //   acc[key] = cur[key];
    //   return acc;
    // }, {});
    console.log("----------");
    console.log(inputs[0].ref.current.getValue());
    console.log("__________");

    console.log(inputs);
  };

  return { register, inputs, update, handleSubmit };
};

export default useInput;
