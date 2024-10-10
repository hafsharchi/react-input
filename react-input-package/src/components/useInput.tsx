import React, { useContext } from "react";
import { ReactInputContextProps, Type } from "./types";
import { useRef } from "react";
import { ReactInputContext } from "../contexts";

type Input = {
  type: Type;
  name: string;
  ref: React.MutableRefObject<any>;
};

export const useInput = () => {
  const context = useContext(ReactInputContext);

  var inputs: Array<Input> = [];

  const useRegister = (name: string, type: Type) => {
    inputs = inputs.filter((input) => input.name !== name);
    var input: Input = {
      type: type,
      name: name,
      ref: useRef<any>(),
    };
    inputs.push(input);

    return { ...input };
  };

  const update = (inputName: string, newValue: any) => {
    var input: any = inputs?.find((input: any) => input.name == inputName);
    input.ref.current.updateValue(newValue);
  };

  const get = (inputName?: any) => {
    if (inputName) {
      var input = inputs?.find((input) => {
        return input.name == inputName;
      });
      return input?.ref.current.getValue() ?? "";
    } else {
      var res = inputs.map((input) => {
        return {
          [input.name]: input.ref.current.getValue(),
        };
      });

      var resultObject = res.reduce((acc: any, cur: any) => {
        var key = Object.keys(cur)[0];
        acc[key] = cur[key];
        return acc;
      }, {});

      return resultObject;
    }
  };

  const submit = (func: (data: any) => any) => {
    var res: boolean = true;
    inputs.map((input) => {
      res = input.ref.current.checkValidation() && res;
    });
    if (!res) {
      context?.onValidationFailed();
      return false;
    }
    func(get());
  };

  return { useRegister, inputs, update, get, submit };
};
