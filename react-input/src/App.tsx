import { useState } from "react";
import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";
import "./index.css";
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
    options={[{value:2,lable:"dfdssd"}]}
        // titleClickable
        name="test"
        dataTest={"xxx"}
        id="2324342543503498573489"
        // fullWidth
        register={useRegister}
        wrapperClassName="wrapper"
        titleClassName="title"
        afterClassName="after"
        beforeClassName="before"
        loadingClassName="loading"
        validationComponent={ValidationComponent}
        validationOn="submit-blur-change"
        placeholder="____/__/__"
        required
        className="input"
        title="Hello"
      />
      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", true)}>update</div>
    </div>
  );
}
