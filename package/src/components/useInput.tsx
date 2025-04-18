import { useContext } from "react";
import { Type, InputRef, Input } from "./types";
import { useRef } from "react";
import { InputMasterContext } from "../contexts";

export const useInput = () => {
  const context = useContext(InputMasterContext);

  let inputs: Array<Input> = [];

  const useRegister = (name: string, type: Type) => {
    inputs = inputs.filter((input) => input.name !== name);
    const input: Input = {
      type,
      name,
      ref: useRef<InputRef<unknown>>(null!),
    };
    inputs.push(input);

    return { ...input };
  };

  const update = (inputName: string, newValue: unknown) => {
    const input = inputs?.find((input) => input.name === inputName);
    if (input?.ref.current) {
      input.ref.current.updateValue(newValue);
    }
  };

  function get(): Record<string, unknown>;
  function get(inputName: string): unknown;
  function get(inputName?: string): Record<string, unknown> | unknown {
    if (inputName) {
      const input = inputs?.find((input) => {
        return input.name === inputName;
      });
      return input?.ref.current.getValue() ?? "";
    } else {
      const res = inputs.map((input) => {
        return {
          [input.name]: input.ref.current.getValue(),
        };
      });

      const initialValue: Record<string, unknown> = {};
      const resultObject = res.reduce((acc, cur) => {
        const key = Object.keys(cur)[0];
        acc[key] = cur[key];
        return acc;
      }, initialValue);

      return resultObject;
    }
  }

  const submit = (func: (data: Record<string, unknown>) => void) => {
    if (checkValidation()) {
      func(get());
    }
  };

  const checkValidation = (names?: string[]) => {
    let res = true;
    inputs.forEach((input) => {
      if (!names || names.includes(input.name)) {
        res = input.ref.current.checkValidation() && res;
      }
    });

    if (!res) {
      context?.onValidationFailed();
    }
    return res;
  };

  return { useRegister, inputs, update, get, submit, checkValidation };
};
