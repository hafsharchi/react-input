import { ValidationComponentProps } from "./components/types";

const ValidationComponent = (_: ValidationComponentProps) => {
  if (_.errors)
    return _.errors.map((err: string, index: number) => (
      <div className="validation color-red" key={index}>{err}</div>
    ));
};

export default ValidationComponent;
