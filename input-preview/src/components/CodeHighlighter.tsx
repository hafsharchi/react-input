import { CodeBlock } from "react-code-block";
import { themes } from 'prism-react-renderer';
import { useTheme } from "../routes/_main-layout/-contexts/ThemeContext";

interface Props {
  language: any;
  code: any;
  className: string;
}

const CodeHighlighter = ({ language, code }: Props) => {
  const {theme}=useTheme()
  return (
    <div className="max-w-full">
      <CodeBlock code={code} language={language} theme={theme == "dark" ? themes.vsDark : themes.github}>
        <CodeBlock.Code className="text-xs border p-5 max-w-full overflow-x-auto rounded-md">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-xs text-gray-500 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </CodeBlock>
    </div>
  );
};

export default CodeHighlighter;
