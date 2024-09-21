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
  const [d, setd] = useState<number>(0);
  const [f, setf] = useState({label: "fdflkj dkls jf", value: 1});

  return (
    <div dir="ltr">
      <Input
        type="select"
        options={[
          { label: "fdflkj dkls jf", value: 1 },
          { label: "fdflgdfg fdg dhj", value: 2 },
        ]}
        name="test"
        onChange={(e) => setd(e.value)}
        // fullWidth
        register={useRegister}
        wrapperClassName="wrapper"
        titleClassName="title"
        afterClassName="after"
        beforeClassName="before"
        loadingClassName="loading"
        validationComponent={ValidationComponent}
        defaultValue={f}
        validationOn="submit"
        placeholder="____/__/__"
        required
        className="input"
        // componentStructure={componentStructure}
        title="Hello"
      />
      {d == 2 && (
        <>
          <Input
            type="select"
            options={[
              { label: "fdflkj dkls jf", value: 1 },
              { label: "fdflgdfg fdg dhj", value: 2 },
            ]}
            name="tes5t"
            // fullWidth
            register={useRegister}
            wrapperClassName="wrapper"
            titleClassName="title"
            afterClassName="after"
            beforeClassName="before"
            loadingClassName="loading"
            validationComponent={ValidationComponent}
            validationOn="submit"
            placeholder="____/__/__"
            required
            className="input"
            // componentStructure={componentStructure}
            title="Hello"
          />
        </>
      )}
      <div onClick={() => setf({ label: "fdflgdfg fdg dhj", value: 2 })}>haha</div>
      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", { label: "fdflgdfg fdg dhj", value: 2 })}>update</div>
    </div>
  );
}
