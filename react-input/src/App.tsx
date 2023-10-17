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
    validationOn="submit-blur-change"
      placeholder="vgh"
        register={register}
        name="name"
        type="text"
        title="3"
        maxLength={4}
        minLength={2}
      />  
       <Input
    validationOn="submit-blur-change"
      placeholder="vgh"
        register={register}
        name="name3"
        type="integer"
        title="3"
        maxValue={400}
      />  

      <div>APP RENDER: {renderCont++}</div>
    </>
  );
};

export default App;
