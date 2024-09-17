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
  const [d, setd] = useState(false);
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
        type="integer"
        name="3124"
        minValue={0}
        maxValue={10}
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
        // componentStructure={componentStructure}
        title="Hello"
      />

      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", "1400/06/20")}>update</div>
    </div>
  );
}
