import { Input, useInput } from "input-master";
import { Button } from "./components/Button";
import ValidationComponent from "./ValidationComponent";

type Props = {};

export default function LeftSide({}: Props) {
  const { useRegister } = useInput();
  return (
    <div className="pt-10 pl-14 w-full">
      <h1 className="text-7xl text-slate-900 font-gultrablack">Magic Input</h1>
      <h1 className="text-sm pl-1 text-slate-400 mt-4">
        A lightweight Input component for react which makes using forms easier
      </h1>

      <div className="items-center flex mt-4 gap-2">
        <span className="font-gblack text-sky-600 mx-2">types</span>
        <Button>integer</Button>
        <Button>decimal</Button>
        <Button>text</Button>
        <Button>select</Button>
        <Button disabled>textarea</Button>
      </div>

      <div className="items-center flex mt-4 gap-2 flex-wrap">
        <span className="font-gblack text-sky-600 mx-2">Code Examples</span>
        <Button>Basic Form</Button>
        <Button>Update Values</Button>
        <Button active>Custom Validation</Button>
        <Button>Date Range</Button>
      </div>

      <div dir="ltr" className="">
        <Input
          after={"$"}
          afterClassName="af"
          type="text"
          placeholder=""
          id="1"
          name="mains"
          validationOn="submit-blur-change"
          register={useRegister}
          title="Title"
          className="wrapper"
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          loadingClassName="loading"
        />

        <Input
          type="select"
          // locale="persian"
          options={[
            { label: "a", value: "2" },
            { label: "b", value: "3" },
          ]}
          menuIsOpen
          multiple
          classNamePrefix="filter"
          unstyled
          placeholder=""
          fullWidth
          id="1"
          // loading
          name="mai1n"
          validationOn="submit-blur-change"
          register={useRegister}
          title="City"
          required
          validationComponent={ValidationComponent}
          wrapperClassName="wrapper"
          titleClassName="title"
          // className="inpcal"
          loadingClassName="loading"
        />
      </div>
    </div>
  );
}
