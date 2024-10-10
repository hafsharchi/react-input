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
        type="select"
        options={[
          { label: "Default", value: 0 },
          { label: "Input Master", value: 1 },
        ]}
        name="test"
        unstyled
        // fullWidth
        register={useRegister}
        wrapperClassName=""
        titleClassName="title"
        afterClassName="after"
        multiple
        classNamePrefix="filter"
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
