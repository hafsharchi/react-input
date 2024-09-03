import { useState } from "react";
import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";
import "./index.css";
import ValidationComponent from "./ValidationComponent";

type Props = {};

export default function App({}: Props) {
  const { useRegister, submit } = useInput();
  const [d, setd] = useState(false);
  const componentStructure: ComponentDescriptor = {
    type: "wrapper",
    children: [
      {
        type: "title",
      },
      {
        type: "other",
        props: { className: "inside-wrapper" },
        children: [
          {
            type: "other",
            props: { className: "input-row" },
            children: [
              {
                type: "before",
              },
              {
                type: "input",
              },
              {
                type: "after",
              },
            ],
          },
          {
            type: "validation",
          },
        ],
      },
    ],
  };
  return (
    <>
      <Input
        type="text"
        name="test"
        register={useRegister}
        wrapperClassName="wrapper"
        titleClassName="title"
        afterClassName="after"
        beforeClassName="before"
        loadingClassName="loading"
        // validationComponent={ValidationComponent}
        validationOn="submit-blur-change"
        loading
        disabled={d}
        // required
        minLength={3}
        loadingObject={"Hello world"}
        className="input"
        componentStructure={componentStructure}
        title="Hello"
      />

      <div onClick={() => setd((p) => !p)}>submit</div>
    </>
  );
}
