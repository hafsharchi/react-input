import { useInput } from "../lib/components/useInput";
import { Input } from "../lib/components";
import { useState } from "react";

export default function App() {
  const { useRegister, submit } = useInput();
  const [value, setValue] = useState(["1399/02/02","1399/02/05"])
  return (
    <div>
      <Input
        register={useRegister}
        name="this"
        type="calendar"
        locale="persian"
        title="hello world"
        maxDate={"1404/02/11"}
        minDate={new Date()}
        // defaultValue={value}
        // updateDefaultValueOnChange={false}
        // range
        required
      />
      <div onClick={()=> setValue(["1399/02/02","1399/02/08"])}>i'm the game changer</div>
      <div
        onClick={() => {
          submit((d) => console.log(d));
        }}
      >i'm the submit button</div>
    </div>
  );
}
