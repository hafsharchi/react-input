import "./App.css";
import ValidationComponent from "./ValidationComponent";
import { Input } from "./components";
import { useInput } from "./components/useInput";
// import Input from "./components/react-input";

const App = () => {
  const { useRegister } = useInput();

  return (
    <div dir="rtl" className="container">
      <Input
        options={[
          { label: "a", value: "2" },
          { label: "b", value: "3" },
        ]}
        multiple
        type="select"
        fullWidth
        id="1"
        name="main"
        validationOn="submit-blur-change"
        register={useRegister}
        title="عنوان"
        required
        validationComponent={ValidationComponent}
        wrapperClassName="wrapper"
        titleClassName="title"
        className="select-inner"
        placeholder=""
        classNamePrefix="filter"
      />
    </div>
  );
};

export default App;
