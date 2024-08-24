import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Import the GitHub Dark theme

interface Props {
  language: any;
  code: any;
  className: string;
}

const CodeHighlighter = ({ language, code, className }: Props) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef} className={`${language} ${className}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
