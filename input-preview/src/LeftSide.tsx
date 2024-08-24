import { Button } from "./components/Button";


type Props = {};

export default function LeftSide({}: Props) {
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
        <Button >Basic Form</Button>
        <Button>Update Values</Button>
        <Button active>Custom Validation</Button>
        <Button>Date Range</Button>
      </div>
    </div>
  );
}
