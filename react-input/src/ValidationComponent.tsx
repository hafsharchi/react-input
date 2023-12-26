import { validationComponentProps } from "./types";

const ValidationComponent = (_: validationComponentProps) => {
  return <div className="absolute">{_.errors}</div>;
};

export default ValidationComponent;
