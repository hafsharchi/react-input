// import { Input } from "../lib/components";
// import { useInput } from "../lib/components/useInput";

import { Input } from "../dist/main";
import { useInput } from "../dist/main";

function App() {
  const { useRegister, submit } = useInput();

  return (
    <>
      <div>Here we test the component</div>
      <Input
        type="select"
        options={[
          { label: "Blue", value: "1" },
          { label: "Red", value: "2" },
          { label: "Green", value: "3" },
        ]}
        required
        onChange={(e) => console.log(e)}
        register={useRegister}
        name="hell"
      />
      <div onClick={() => submit((d) => console.log(d))}>submit</div>
      <input type="date" />
    </>
  );
}

export default App;
