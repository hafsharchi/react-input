import { useInput } from "../lib/components/useInput";
import { Input } from "../lib/components";

export default function App() {
  const { useRegister, submit } = useInput();
  return (
    <div>
      <Input
        register={useRegister}
        name="this"
        type="text"
        // locale="persian"
        title="hello world"
        // maxDate={"1404/02/11"}
        // minDate={new Date()}
        // defaultValue={value}
        // updateDefaultValueOnChange={false}
        // range
        required
      />
      <div
        onClick={() => {
          submit((d) => console.log(d));
        }}
      >i'm the submit button</div>
    </div>
  );
}


// import React from 'react'
// import InputMask from './InputMask'

// export default function App() {
//   return (
//     <div>
//       <InputMask mask={"99 (+99)"} name='hello' guide keepCharPositions></InputMask>
//     </div>
//   )
// }
