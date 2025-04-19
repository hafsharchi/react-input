import { Input, useInput } from "testinputmaster";

export default function App() {
  const { useRegister, submit } = useInput();

  return (
    <div>
      <Input   register={useRegister} name="hello" type="text" />
      <div onClick={() => submit((d: any) => console.log(d))}>submit</div>
    </div>
  );
}
