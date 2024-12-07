import { ValidationComponentProps } from "input-master";

const ValidationComponent = (_: ValidationComponentProps) => {
  if (_.errors)
    return _.errors.map((err: string, index: number) => (
      <div className="bg-background border-[1px] border-rose-500/15 text-rose-500/90 font-normal px-2 py-0.5 w-full mt-1 rounded-sm text-xs" key={index}>{err}</div>
    ));
};

export default ValidationComponent;
