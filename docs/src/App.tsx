import { How, Input, useInput } from "testinputmaster";

export default function App() {
  const { useRegister } = useInput();
  return (
    <div>
      <Input type="text" name="hello" register={useRegister} />
    </div>
  );
}
