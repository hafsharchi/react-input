import "./App.css";
import "./input.css";
import ValidationComponent from "./ValidationComponent";
import { Input } from "./components";
import { useInput } from "./components/useInput";
import { ReactInputProvider } from "./contexts";
import { ErrorTypes } from "./components/types";
// import Input from "./components/react-input";

const App = () => {
  const { useRegister, submit } = useInput();
  const up = () => {
    submit((data) => console.log(data));
  };

  const errors: ErrorTypes = {
    minValue: "کمه",
    maxValue: "زیاده",
    minLength: "کوتاهه",
    maxLength: "بلنده",
    email: "ولید نی",
    phoneNumber: "شماره تلفن نی",
    required: "لازمه",
    etc: "خرابه",
  };
  return (
    <ReactInputProvider errors={errors}>
      <div dir="rtl" className="container">
        <Input
          type="select"
          // locale="persian"
          options={[
            { label: "a", value: "2" },
            { label: "b", value: "3" },
          ]}
          classNamePrefix="filter"
          unstyled
          placeholder=""
          fullWidth
          id="1"
          // loading
          name="mai1n"
          validationOn="submit-blur-change"
          register={useRegister}
          title="عنوان"
          required
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          // className="inpcal"
          loadingClassName="loading"
        />

        <Input
          after={"$"}
          afterClassName="af"
          type="text"
          placeholder=""
          id="1"
          name="mains"
          validationOn="submit-blur-change"
          register={useRegister}
          title="عنوان"
          className="wrapper"
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          loadingClassName="loading"
        />

        <Input
          type="password"
          placeholder=""
          id="1"
          name="mains"
          validationOn="submit-blur-change"
          register={useRegister}
          title="عنوان"
          className="wrapper"
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          loadingClassName="loading"
        />

        <Input
          type="calendar"
          locale="persian"
          fullWidth
          defaultValue={new Date()}
          separator="-"
          id="1"
          name="maidn"
          validationOn="submit-blur-change"
          register={useRegister}
          title="عنوان"
          className="wrapper"
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          loadingClassName="loading"
        />

        <div onClick={up}>Update</div>
      </div>
    </ReactInputProvider>
  );
};

export default App;
