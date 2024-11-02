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
        
        register={useRegister}
        wrapperClassName="wrapperClassName"
        className="className"
        notValidClassName="notValidClassName(when the validation is set to false)"
        titleClassName="titleClassName"
        afterClassName="afterClassName"
        beforeClassName="beforeClassName"
        loadingClassName="loadingClassName"
        disabled
        after={'After ...'}
        before={'Before ...'}
        loadingObject={'Loading ...'}

        disabledClassName="disabledClassName(when disabled prop is true) "
        validationComponent={ValidationComponent}
        loading
        required
        title="Title ..."
      />
      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => update("test", null)}>update</div>
    </div>
  );
}
