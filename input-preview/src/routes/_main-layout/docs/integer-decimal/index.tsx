import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../ValidationComponent";
import { Button } from "../../../../components/Button";
import { inputConfigs } from "../../../../lib/input_default_settings";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";

export const Route = createFileRoute("/_main-layout/docs/integer-decimal/")({
  component: Text,
});

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [styled, setStyled] = useState<boolean>(true);
  const codeSnippet = `import { Input, useInput } from "input-master";
  
  export const TextInput = () => {
    const { useRegister, submit } = useInput();
    
      
    return (
      <>
        <Input
          type="integer"
          title="Age (integer)"
          minValue={0}
          maxLength={3}
          maxValue={120}
          name="age"
          notValidClassName="border !border-rose-500/50"
          validationOn="submit-blur-change"
          register={useRegister}
        />
        <Input
          type="decimal"
          title="Percent (decimal)"
          minValue={0}
          maxValue={100}
          notValidClassName="border !border-rose-500/50"
          name="percent"
          validationOn="submit-blur-change"
          register={useRegister}
        />
        <Input
          type="decimal"
          title="Price (with separator)"
          minValue={0}
          separator=","
          notValidClassName="border !border-rose-500/50"
          name="price"
          validationOn="submit-blur-change"
          register={useRegister}
        />
  
        <button 
          onClick={() =>
            submit((d) => alert('age: ' + d.age + ', percent: ' + d.percent + ', price: ' + d.price))
          }
        > 
          submit 
        </button>
      </>
    );
  };
  `;
  return (
    <>
      <DocsBreadcrumb page="Integer / Decimal Types" />

      <div className="relative  my-4">
        <div className="flex gap-2">
          <Button
            active={activeTab == 0}
            onClick={() => {
              setActiveTab(0);
            }}
            variant="tab"
          >
            Preview
          </Button>
          <Button
            active={activeTab == 1}
            onClick={() => {
              setActiveTab(1);
            }}
            variant="tab"
          >
            Code
          </Button>
        </div>
        <div className="h-[1px] absolute bottom-[1px] bg-foreground opacity-10 w-full"></div>
      </div>
      {activeTab == 0 ? (
        <>
          <PreviewBox
            settings={
              <div className="flex absolute left-4 top-4 gap-1">
                <Button
                  active={styled}
                  onClick={() => {
                    setStyled(true);
                  }}
                >
                  styled
                </Button>
                <Button
                  active={!styled}
                  onClick={() => {
                    setStyled(false);
                  }}
                >
                  default
                </Button>
              </div>
            }
          >
            <Input
              {...inputConfigs(styled)}
              type="integer"
              title="Age (integer)"
              minValue={0}
              maxLength={3}
              maxValue={120}
              name="age"
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              validationOn="submit-blur-change"
              register={useRegister}
            />
            <Input
              {...inputConfigs(styled)}
              type="decimal"
              title="Percent (decimal)"
              minValue={0}
              maxValue={100}
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              name="percent"
              validationOn="submit-blur-change"
              register={useRegister}
            />
            <Input
              {...inputConfigs(styled)}
              type="decimal"
              title="Price (with separator)"
              minValue={0}
              separator=","
              notValidClassName="border !border-rose-500/50"
              validationComponent={ValidationComponent}
              name="price"
              validationOn="submit-blur-change"
              register={useRegister}
            />
            <Button
              variant="submit"
              className="mx-auto mt-3"
              onClick={() =>
                submit((d) => alert(`age: ` + d.age + `, percent: ` + d.percent + `, price: ` + d.price))
              }
            >
              Sumbit
            </Button>
          </PreviewBox>
        </>
      ) : (
        <>
          <CodeHighlighter
            language="javascript"
            className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
            code={codeSnippet}
          />
        </>
      )}
      <br />
      <h2>Integer Input Type</h2>
      <p>
        The Integer input type is designed to let users enter whole numbers
        only—no decimal points allowed! It’s ideal for capturing things like
        age, counts, or any other numeric values that don't need a fraction.
      </p>
      <b>Key features (specific to integer type):</b>
      <ul>
        <li>
          <b>Whole Numbers Only: </b>Users can enter positive or negative
          numbers, but no decimal points are allowed.
        </li>
        <li>
          <b>Range and Length Controls: </b>Easily set minimum and maximum
          values with minValue and maxValue, and control the length of the input
          with minLength and maxLength.
        </li>
        <li>
          <b>Custom Separators: </b>Enhance readability by adding a separator to
          break up large numbers, for example, 1,000,000 with a , separator!
        </li>
      </ul>
      <p>
        All the general input properties are also available for Integer—check
        them out here.
      </p>
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
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>MinLength</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>separator</td>
            <td>string</td>
            <td>Inserts the specified character to group digits by three (e.g., 1,000).</td>
            <td>-</td>
          </tr>
          <tr>
            <td>minValue</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>maxValue</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <hr className="my-5" />
      <h2>Decimal Input Type</h2>
      <p>
        The Decimal input type lets users enter numbers with decimals, perfect
        for things like currency, measurements, or any value that might include
        fractions.
      </p>
      <b>Key features (specific to integer type):</b>
      <ul>
        <li>
          <b>Decimal Support: </b>Users can add a single decimal point, so they
          can input numbers like 3.14 or -12.5.
        </li>
        <li>
          <b>Flexible Value Range: </b>You can specify minimum and maximum
          values using minValue and maxValue, but there are no restrictions on
          the number of digits—users can enter as many as they need.
        </li>
        <li>
          <b>Custom Separators: </b>Enhance readability by adding a separator to
          break up large numbers, for example, 1,125.5 with a , separator!
        </li>
      </ul>
      <p>
        All the general input properties are also available for Integer—check
        them out here.
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
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>MinLength</td>
            <td>number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>separator</td>
            <td>string</td>
            <td>Inserts the specified character to group digits by three (e.g., 1,000).</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
