import { Input } from "../lib/components";
import { useInput } from "../lib/components/useInput";

function App() {
  const { useRegister, submit } = useInput();

  return (
    <>
    <div>Here we test the component</div>
      <Input locale="persian" type="calendar" required onChange={(e)=> console.log(e)} register={useRegister} name="hell" />
      <div onClick={() => submit((d) => console.log(d))}>submit</div>
      <input type="date" />
    </>
  );
}

export default App;
