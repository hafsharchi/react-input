import { ValidationComponentProps } from "ha-dd-react-input";

const ValidationComponent = (_: ValidationComponentProps) => {
  if (_.errors)
    return _.errors.map((err: string, index: number) => (
      <div className="color-red" key={index}>{err}</div>
    ));
};

export default ValidationComponent;
