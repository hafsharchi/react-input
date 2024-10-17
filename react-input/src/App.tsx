import { useState } from "react";
import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";
import "./index.css";
import "./input.css";
import ValidationComponent from "./ValidationComponent";
import { ReactInputProvider } from "./contexts";

type Props = {};

export default function App({}: Props) {
  const { useRegister, submit, update } = useInput();
  const componentStructure: ComponentDescriptor = {
    type: "wrapper",
    props: { className: "inside-wrapper" },
    children: [
      {
        type: "input",
      },
    ],
  };

  return (
    <div dir="ltr">
      <Input
        type="calendar"
        locale="english"
        name="test"
        // disabled
        // fullWidth
        editable={false}
        register={useRegister}
        wrapperClassName=""
        titleClassName="title"
        afterClassName="after"
        beforeClassName="before"
        loadingClassName="loading"
        validationComponent={ValidationComponent}
        validationOn="submit"
        required
        className="input"
        title="Hello hdsjfk"
      />
      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", null)}>update</div>
    </div>
  );
}
