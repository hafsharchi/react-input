// import { Input } from "../lib/components";
// import { useInput } from "../lib/components/useInput";
import { useInput } from "../dist/main";
import "./App.css";
import { calendarOnKeyDown } from "../lib/utils/calendarOnKeyDown";

function App() {
  const { submit } = useInput();

  return (
    <>
      <div>Here we test the component</div>
      <DatePicker />
      <div onClick={() => submit((d) => console.log(d))}>submit</div>
      <input type="date" />
    </>
  );
}

function DatePicker() {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    defaultValue: string
  ) => {
    let value = e.target.value.replaceAll(/[^0-9]/g, "");
    if (!e.target.value) {
      e.target.value = defaultValue;
    } else {
      if (value.length < defaultValue.length) {
        value = value.padStart(defaultValue.length, "0");
      }
      if (value.length > defaultValue.length) {
        if (value[0] != "0") {
          value =
            "0".repeat(defaultValue.length - 1) + value[defaultValue.length];
        } else value = value.slice(-defaultValue.length);
      }
      e.target.value = value;
    }
  };
  const onBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    defaultValue: string,
    minValue: number,
    maxValue: number
  ) => {
    let value = e.target.value;
    if (parseInt(value) > maxValue)
      value = maxValue.toString().padStart(defaultValue.length, "0");
    if (parseInt(value) < minValue)
      value = minValue.toString().padStart(defaultValue.length, "0");
    e.target.value = value;
  };

  return (
    <div className="">
      <input
        className="input-date"
        size={1}
        type="text"
        onBlur={(e) => onBlur(e, "yyyy", 1, 2030)}
        onKeyDown={(e) =>
          calendarOnKeyDown(
            e,
            "yyyy",
            new Date().getFullYear().toString(),
            true,
            false
          )
        }
        onChange={(e) => {
          onChange(e, "yyyy");
        }}
        defaultValue={"yyyy"}
      />
      <span>/</span>
      <input
        className="input-date"
        size={1}
        type="text"
        onKeyDown={(e) =>
          calendarOnKeyDown(e, "mm", new Date().getUTCMonth().toString())
        }
        onChange={(e) => {
          onChange(e, "mm");
        }}
        defaultValue={"mm"}
      />
      <span>/</span>
      <input
        className="input-date"
        size={1}
        type="text"
        onChange={(e) => {
          onChange(e, "dd");
        }}
        onKeyDown={(e) =>
          calendarOnKeyDown(e, "dd", new Date().getDay().toString(), false)
        }
        defaultValue={"dd"}
      />
    </div>
  );
}
export default App;
