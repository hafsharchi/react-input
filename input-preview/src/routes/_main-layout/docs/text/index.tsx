import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";

export const Route = createFileRoute("/_main-layout/docs/text/")({
  component: Text,
});

function Text() {
  const { useRegister } = useInput();

  return (
    <>
      <DocsBreadcrumb page="Text Type" />
      <div className="flex gap-2 my-2"><Button>Preview</Button>
      <Button>Code</Button></div>
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
      <br />
      <h2>Description</h2>
      <p>
        The Text input type allows users to enter single-line text values. By
        default, it includes all the shared features that are available across
        all input types. If you haven’t seen the shared props yet, you can check
        them out here.
      </p>
      <p>
        At the top, you can find an example of how to implement the Text input
        with various configurations, such as validation checks and form
        submission. It also comes with the default styling from our
        documentation's UI. For more details on how to customize the appearance,
        you can visit the Styling Documentation.
      </p>
      <p>
        Below is a table of specific properties unique to the Text input type:
      </p>
      <h2>Props</h2>
      <table className="w-full text-center text-sm rounded-lg  border-1 border-red-400">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody className="font-light">
          <tr>
            <td>MaxLength</td>
            <td>number</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>MinLength</td>
            <td>number</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Mask</td>
            <td>string</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>MaskChar</td>
            <td>string</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
