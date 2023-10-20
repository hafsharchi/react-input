import "./App.css";
import Input from "./components/react-input";
import useInput from "./useInput";
let renderCont = 0;

const App = () => {
  const { register, update } = useInput();

  return (
    <>
      <div>سلام</div>
      <div onClick={update}>Hello</div>

      <Input
      id="12"

        validationOn="submit-blur"
        placeholder="vgh"
        register={register}
        name="name"
        type="decimal"
        maxValue={3.2}
        title="3"
      />
      <Input
      id="1"
        validationOn="submit-blur"
        placeholder="vgh"
        register={register}
        name="name3"
        type="select"
        title="3"
        options={[{label:'s3', value:2}]}      
      />

      <div>APP RENDER: {renderCont++}</div>
    </>
  );
};

export default App;
