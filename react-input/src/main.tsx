import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactInputProvider } from "./contexts/ReactInputContext.tsx";
import { DefaultProps } from "./components/types.ts";
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

  const defaultValues: DefaultProps = {
    wrapperClassName:"bg-red-500"
  };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactInputProvider errors={err} defaultProps={defaultValues}>
    <App />
  </ReactInputProvider>
);
