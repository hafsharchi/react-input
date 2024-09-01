import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "ha-dd-react-input";
import ValidationComponent from "../../../../ValidationComponent";

export const Route = createFileRoute("/_main-layout/docs/text/")({
  component: Text,
});

function Text() {
  const { useRegister } = useInput();

  return (
    <>
      <DocsBreadcrumb page="Text Type" />
      <PreviewBox>
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

      </PreviewBox>
    </>
  );
}
