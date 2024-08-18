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
    <div dir="rtl" className="bg-red">
      <div
        onClick={() => {
          update("main",[{ label: "b", value: "3" },{ label: "a", value: "2" }]);
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
        validationOn="spubmit-blur-change"
        placeholder="the test is here"
        validationComponent={ValidationComponent}
        customValidations={customValidation}
        // onChange={(e:any) => {
        //   console.log(e.target.value);
        // }}
        required
      /> */}
      {/* <Input
        locale="persian"
        className="dada"
        // range
        // before={<><div>سلام</div></>}
        id="1"
        name="maind"
        type="calendar"
        register={useRegister}
        title="ds"
        validationOn="submit-blur-change"
        required
        fullWidth
        wrapperClassName=" bg-blue w-600"
        class=""
        validationComponent={ValidationComponent}
        dateSeparator=" تا "
        range
      /> */}

      {/* <Input
        className="dada"
        id="1"
        name="main"
        type="decimal"
        register={useRegister}
        title="ds"
        validationOn="submit-blur-change"
        required

        wrapperClassName=" bg-blue w-600"
        validationComponent={ValidationComponent}
        defaultValue={4848.5}
      /> */}

      <Input
        options={[
          { label: "a", value: "2" },
          { label: "b", value: "3" },
        ]}
        fullWidth
        multiple
        className="w-full"
        defaultValue={{ label: "a", value: "2" }}
        id="1"
        name="main"
        type="select"
        register={useRegister}
        title="ds"
        validationOn="submit-blur-change"
        required
        wrapperClassName=" bg-blue w-600 w-full"
        validationComponent={ValidationComponent}
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
