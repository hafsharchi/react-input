import { Input } from "../lib/components";
import { useInput } from "../lib/components/useInput";

export default function App() {
  const { useRegister, submit } = useInput();
  return (
    <div>
      {/* <ReactSelect
        options={[
          { value: "d", label: "fjskldj" },
          { value: "dsad", label: "fjdasdasskldj" },
        ]}
        onChange={() => {
          console.log("dsjflk");
        }}
      ></ReactSelect> */}
      {/* <Input
        register={useRegister}
        name="ff"
        type="text"
      
        // locale="persian"
        title="hello world"
        // onChange={(e) => console.log(e)}
        // maxDate={"1404/02/11"}
        // minDate={new Date()}
        // override
        // defaultValue={value}
        // updateDefaultValueOnChange={false}
        // range
        // required
      /> */}
      <Input
        register={useRegister}
        name="this"
        type="text"
        // locale="persian"
        title="hello world"
        // onChange={(e) => console.log(e)}
        // maxDate={"1404/02/11"}
        // minDate={new Date()}
        mask={"9999 9999 9999 9999"}
        placeholderChar="-"
        guide={true}
        keepCharPositions={true}
        // overwrite
        // defaultValue={value}
        // updateDefaultValueOnChange={false}
        // range
        required
      />
      <div
        onClick={() => {
          submit((d) => console.log(d));
        }}
      >
        i'm the submit button
      </div>
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
