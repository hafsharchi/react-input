import "./global.css";
import CodeHighlighter from "./components/CodeHighlighter";
import LeftSide from "./LeftSide";

function App() {
  const codeSnippet = `import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css'; // Import the GitHub Dark theme

interface Props {
  language: any;
  code: any;
}

const CodeHighlighter = ({ language, code }: Props) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;`;
  return (
    <div className="flex w-full p-6 gap-6 bg-slate-200 min-h-screen">
      <div className="w-3/4 bg-white rounded-3xl flex p-6">
          <LeftSide />
        <CodeHighlighter
          language="javascript"
          className="text-xs rounded-2xl shrink-0 h-full w-[700px]"
          code={codeSnippet}
        />
      </div>
      <div className="w-1/4 bg-white rounded-3xl p-6 font-gblack text-xl">
      Quick start</div>
    </div>
  );
}

export default App;
