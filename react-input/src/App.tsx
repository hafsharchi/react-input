import { useEffect, useState } from "react";
import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";
import "./index.css";
import "./input.css";
import ValidationComponent from "./ValidationComponent";

type Props = {};

export default function App({}: Props) {
  const { useRegister, submit, update, checkValidation } = useInput();

  const [first, setFirst] = useState();
  const componentStructure: ComponentDescriptor = {
    type: "wrapper",
    props: { className: "inside-wrapper" },
    hasValueClassName: "ihavevalue",
    children: [
      {
        hasValueClassName: "ihavevalueandimtitle",
        type: "title",
      },
      {
        type: "input",
      },
    ],
  };

  useEffect(() => {
    console.log(first);
  }, [first]);

  return (
    <div dir="ltr">
      <div>dasdas</div>
      <Input
        type="integer"
        name="dd"
        register={useRegister}
        wrapperClassName="wrapperClassName"
        className="className"
        notValidClassName="notValidClassName(when the validation is set to false)"
        titleClassName="titleClassName"
        afterClassName="afterClassName"
        beforeClassName="beforeClassName"
        loadingClassName="loadingClassName"
        componentStructure={componentStructure}
        disabledClassName="disabledClassName(when disabled prop is true) "
        validationComponent={ValidationComponent}
        required
        title="dd"
      />
      <Input
        type="select"
        // onInputChange={(e) => console.log(e)}
        name="ff"
        isClearable
        validationOn="submit-blur-change"
        register={useRegister}
        options={[
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
        ]}
        onChange={(e) => {
          setFirst(e.value);
        }}
        wrapperClassName="wrapperClassName"
        className="className"
        notValidClassName="notValidClassName(when the validation is set to false)"
        titleClassName="titleClassName"
        afterClassName="afterClassName"
        beforeClassName="beforeClassName"
        loadingClassName="loadingClassName"
        componentStructure={componentStructure}
        disabledClassName="disabledClassName(when disabled prop is true) "
        validationComponent={ValidationComponent}
        required
        title="ff"
      />
      <Input
        type="text"
        name="ss"
        register={useRegister}
        wrapperClassName="wrapperClassName"
        className="className"
        notValidClassName="notValidClassName(when the validation is set to false)"
        titleClassName="titleClassName"
        afterClassName="afterClassName"
        beforeClassName="beforeClassName"
        loadingClassName="loadingClassName"
        componentStructure={componentStructure}
        disabledClassName="disabledClassName(when disabled prop is true) "
        validationComponent={ValidationComponent}
        required
        title="ss"
      />

      <div onClick={() => submit((p) => console.log(p))}>submit</div>
      <div onClick={() => checkValidation(["ff", "ss"])}>checkValidation</div>
      <div onClick={() => update("test", null)}>update</div>
    </div>
  );
}
