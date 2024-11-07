import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { InputMasterProvider } from "./contexts/InputMasterContext.tsx";
const err = {
    minValue:"minValue",
    maxValue:"maxValue",
    minLength:"minLength",
    maxLength:"maxLength",
    email:"sdasdasdasd",
    phoneNumber:"sdasdasdasd",
    required:"rqeuired",
    etc:"sdasdasdasd",
  };

  // const defaultValues: DefaultProps = {
  //   wrapperClassName:"bg-red-500"
  // };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <InputMasterProvider errors={err}>
    <App />
  </InputMasterProvider>
);
