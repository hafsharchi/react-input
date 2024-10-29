import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";
import "./index.css";
import "./input.css";
import ValidationComponent from "./ValidationComponent";

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
      <div>dasdas</div>
      <Input
        type="text"
        name="test"
        // options={[{lable:"d", value:2}]}
        // disabled
        // fullWidth
        register={useRegister}
        wrapperClassName="border"
        notValidClassName="baaaag"
        titleClassName="title"
        afterClassName="after"
        beforeClassName="before"
        loadingClassName="loading"
        validationComponent={ValidationComponent}
        required
        // className="input"
        title="Hello hdsjfk"
      />
      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", null)}>update</div>
    </div>
  );
}
