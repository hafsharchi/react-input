import { Input } from "./components";
import { useInput } from "./components/useInput";

function App() {
  const { useRegister, submit } = useInput();

  return (
    <>
      <Input locale="persian" type="calendar" onChange={(e)=> console.log(e)} register={useRegister} name="hell" />
      <div onClick={() => submit((d) => console.log(d))}>submit</div>
      <input type="date" />
    </>
  );
}

export default App;
