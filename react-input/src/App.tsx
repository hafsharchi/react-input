import "./App.css";
import ValidationComponent from "./ValidationComponent";
import { Input } from "./components";
import { useInput } from "./components/useInput";
// import Input from "./components/react-input";
let renderCont = 0;

const App = () => {
  const { useRegister, update, submit } = useInput();

  // const customValidation: CustomValidations = [
  //   {
  //     func: (value: string | number) => {
  //       if (value == 278) {
  //         return false;
  //       }
  //       return true;
  //     },
  //     error: "278 is reserved",
  //   },
  //   {
  //     func: (value: string | number) => {
  //       if (value == 500) {
  //         return false;
  //       }
  //       return true;
  //     },
  //     error: "500 is so easy",
  //   },
  // ];

  const onSubmit = () =>
    submit((data: any) => {
      console.log(data);
    });
  return (
    <div dir="rtl">
      <div
        onClick={() => {
          update("main","");
        }}
      >
        Hello
      </div>

      {/* <Input
        id="12"
        validationOn="submit-blur"
        placeholder="Decimal Input"
        register={register}
        name="decTest"
        type="decimal"
        maxValue={3.2}
        title="3"
        separator=","
      /> */}

      {/* <Input
        type="text"
        name="intTest"
        id="26"
        register={register}
        // minValue={2}
        // maxValue={500}
        title="QMA"
        validationOn="submit-blur-change"
        placeholder="the test is here"
        validationComponent={ValidationComponent}
        customValidations={customValidation}
        // onChange={(e:any) => {
        //   console.log(e.target.value);
        // }}
        required
      /> */}
      <Input
        locale="persian"
        className="dada"
        // range
        id="1"
        name="main"
        type="calendar"
        register={useRegister}
        title="ds"
        validationOn="submit-blur-change"
        required
        validationComponent={ValidationComponent}
        dateSeparator=" تا "
      />

      {/* <Input
        type="integer"
        name="main"
        id="16"
        register={register}
        minValue={2}
        maxValue={500}
        title="Integer Input"
        validationOn="submit-blur-change"
        placeholder="the test is here"
        validationComponent={ValidationComponent}
        customValidations={customValidation}
        required 
      />

      <Input
        type="text"
        name="mainw"
        id="163"
        register={register}
        maxLength={10}
        minLength={2}
        title="In51ut"
        validationOn="submit-blur-change"
        placeholder="the test is here"
        validationComponent={ValidationComponent}
        customValidations={customValidation}
        required
      /> */}

      {/* <Input
        id="1"
        validationOn="submit"
        placeholder="vgh"
        register={register}
        name="name3"
        type="select"
        title="3"
        options={[{ label: "s3", value: 2 }]}
      />
      <Input
        locale="persian"
        id="312"
        validationOn="submit"
        placeholder="vgh"
        register={register}
        name="datename"
        type="calendar"
        title="3"
      /> */}

      <div>APP RENDER: {++renderCont}</div>

      <div onClick={onSubmit}>click here to SUBMIT</div>
    </div>
  );
};

export default App;
