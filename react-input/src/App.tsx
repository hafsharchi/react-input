import { Input } from "./components";
import { ComponentDescriptor } from "./components/types";
import { useInput } from "./components/useInput";

type Props = {};

export default function App({}: Props) {
  const { useRegister } = useInput();
  const componentStructure: ComponentDescriptor = {
    type: "wrapper",
    tag: "p",
    children: [
      {
        type: "input",
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
        loading
        className="input"
        componentStructure={componentStructure}
      />
    </>
  );
}
