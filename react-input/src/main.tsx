import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactInputProvider } from "./contexts/ReactInputContext.tsx";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactInputProvider errors={err}>
    <App />
  </ReactInputProvider>
);
