import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Sidebar } from "lucide-react";
import Footer from "./_main-layout/-components/Footer";
import Header from "./_main-layout/-components/Header";
import Rightbar from "./_main-layout/-components/Rightbar";
import { Input, useInput } from "input-master";
import PreviewBox from "./_main-layout/-components/PreviewBox";
import CodeHighlighter from "../components/CodeHighlighter";
import BlurIn from "../components/magicui/blur-in";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { useRegister, submit } = useInput();
  const codeSnippet = `import { Input, useInput } from "input-master";
  
export const TextInput = () => {
  const { useRegister, submit } = useInput();
  
  return (
    <>

      <Input register={useRegister} type="integer" name="age" title="Age" maxLength={3} maxValue={110} />

      <Input register={useRegister} type="text" name="email" title="Email *" required />

      <Input register={useRegister} type="calendar" title="Birthdate" name="birthdate" />

      <Input register={useRegister} type="select" options={data} title="Gender" name="gender" />

      <Input register={useRegister} type="text" title="Loading" loading={true} />

      <button
        onClick={() =>
          submit((formData) =>
            alert("firstName: " + formData.age + "lastName: " + formData.email)
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
      <Header />
    <PreviewBox className="w-3/4 h-auto mx-auto my-5">
    <BlurIn word={ <h1 className="text-9xl text-center mt-40 w-3/4 mx-auto font-black">Input Master</h1>}></BlurIn>
    <BlurIn word={ <p className="text-lg font-thin mb-40">All in one Input for react</p>}></BlurIn>
    </PreviewBox>
      <div className="flex w-3/4 overflow-hidden mx-auto gap-20">
        <div className=" w-full grid gap-5 grid-cols-11">
          <div className="col-span-3">
            <PreviewBox className="h-full mx-0" wfull>
              <Input
                type="integer"
                name="age"
                title="Age"
                maxLength={3}
                maxValue={110}
                register={useRegister}
              />
              <Input
                type="text"
                name="email"
                title="Email *"
                required
                register={useRegister}
              />
              <Input
                type="calendar"
                locale="english"
                title="Birthdate"
                name="birthdate"
                register={useRegister}
                after={<Calendar strokeWidth={1} size={20} opacity={0.8}/>}
                afterClassName="absolute right-3 top-2.5"
              />
              <Input
                type="select"
                options={[
                  { label: "male", value: 1 },
                  { label: "female", value: 2 },
                ]}
                title="Gender"
                placeholder=""
                name="gender"
                register={useRegister}
              />
              <Input
                type="text"
                name="loading"
                title="Loading..."
                loading={true}
                register={useRegister}
              />
            </PreviewBox>
          </div>
          <div className="col-span-8">
            <CodeHighlighter
              language="tsx"
              className="text-xs rounded-lg border bg-black shrink-0 h-full w-full"
              code={codeSnippet}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
