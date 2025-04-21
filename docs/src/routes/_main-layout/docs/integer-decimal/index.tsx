import { createFileRoute } from "@tanstack/react-router";
import PreviewBox from "../../-components/PreviewBox";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";
import { Input, useInput } from "input-master";
import ValidationComponent from "../../../../components/ValidationComponent";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import CodeHighlighter from "../../../../components/CodeHighlighter";
import Table from "../../../../components/Table";

export const Route = createFileRoute("/_main-layout/docs/integer-decimal/")({
  component: Text,
});

function Text() {
  const { useRegister, submit } = useInput();
  const [activeTab, setActiveTab] = useState<number>(0);
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
            submit((formData) =>  // automatically checks validation and if is valid:
              alert('age: '+ formData.age +', percent: '+ formData.percent +', price: '+ formData.price)
            )
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
          <PreviewBox>
            <Input
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
                submit((d) =>
                  alert(
                    `age: ` +
                      d.age +
                      `, percent: ` +
                      d.percent +
                      `, price: ` +
                      d.price
                  )
                )
              }
            >
              Sumbit
            </Button>
          </PreviewBox>
        </>
      ) : (
        <>
          <CodeHighlighter
            language="tsx"
            className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
            code={codeSnippet}
          />
        </>
      )}
      <br />
      <h2>Props</h2>
      <Table
        columns={["Prop", "Type", "Description"]}
        data={[
          [
            <code>maxValue</code>,
            <code>number</code>,
            "Limits the input within a defined range.",
          ],
          [
            <code>minValue</code>,
            <code>number</code>,
            "Limits the input within a defined range.",
          ],
          [
            <code>separator</code>,
            <code>string</code>,
            "Separator character for displaying groups of digits.",
          ],
          [
            <code>maxLength</code>,
            <code>number</code>,
            "Limits on the number of digits allowed.",
          ],
          [
            <code>minLength</code>,
            <code>number</code>,
            "Limits on the number of digits allowed.",
          ],
        ]}
      />
    </>
  );
}
