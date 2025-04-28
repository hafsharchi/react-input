import React, { useState } from "react";
import { useInput } from "../lib/components/useInput";
import { Input } from "../lib/components";

export default function App() {
  const { useRegister, submit } = useInput();

  const [value, setValue] = useState(12345);
  return (
    <div>
      <Input
        register={useRegister}
        name="name"
        type="text"
        // defaultValue={value.toString()}
        mask={{pattern: "(+98) A", tokens: { "A": /-?\d+(\.\d+)?/}}}
        // updateDefaultValueOnChange={false}
      />
      <Input
        register={useRegister}
        name="num"
        type="integer"
      />
      <div onClick={() => setValue(value + 1)}>im a game changer</div>
    </div>
  );
}
