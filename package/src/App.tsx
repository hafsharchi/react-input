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
    defaultValue: string,
    maxValue: number
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

      if (
        parseInt(parseInt(value).toString().padEnd(defaultValue.length, "0")) >=
        maxValue
      ) {
        if (parseInt(value) > maxValue) {
          e.target.value = value
            .charAt(defaultValue.length - 1)
            .padStart(defaultValue.length, "0");
        } else e.target.value = value;
        if (
          parseInt(
            parseInt(e.target.value).toString().padEnd(defaultValue.length, "0")
          ) > maxValue
        ) {
          const nextInput = (e.target as HTMLElement).nextElementSibling
            ?.nextElementSibling as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
          }
        }
      } else {
        e.target.value = value;
      }
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
            1,
            2030,
            true,
            false
          )
        }
        onChange={(e) => {
          onChange(e, "yyyy", 2030);
        }}
        defaultValue={"yyyy"}
      />
      <span>/</span>
      <input
        className="input-date"
        size={1}
        type="text"
        onKeyDown={(e) => calendarOnKeyDown(e, "mm", "1", 1, 12)}
        onBlur={(e) => onBlur(e, "mm", 1, 12)}
        onChange={(e) => {
          onChange(e, "mm", 12);
        }}
        defaultValue={"mm"}
      />
      <span>/</span>
      <input
        className="input-date"
        size={1}
        type="text"
        onChange={(e) => {
          onChange(e, "dd", 31);
        }}
        onKeyDown={(e) => calendarOnKeyDown(e, "dd", "1", 1, 31, false)}
        defaultValue={"dd"}
      />
    </div>
  );
}
export default App;
