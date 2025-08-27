
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NotebookContentProps {
  notebook: any;
  headings: any[];
}

export const NotebookContent: React.FC<NotebookContentProps> = ({ notebook, headings }) => {
  const renderMarkdownCell = (cell: any, index: number) => {
    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
    
    // Simple markdown to HTML conversion
    let html = source
      .replace(/^### (.*$)/gm, '<h3 id="heading-$1-$2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 id="heading-$1-$2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 id="heading-$1-$2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|u|l])/gm, '<p>')
      .replace(/(?<![>])$/gm, '</p>');

    // Add heading IDs for ToC navigation
    headings.forEach((heading, i) => {
      html = html.replace(
        new RegExp(`<h${heading.level}.*?>(.*?)</h${heading.level}>`, 'g'),
        `<h${heading.level} id="${heading.id}">$1</h${heading.level}>`
      );
    });

    return (
      <div 
        key={`markdown-${index}`}
        className="notebook-cell notebook-markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const renderCodeCell = (cell: any, index: number) => {
    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
    
    return (
      <div key={`code-${index}`} className="notebook-cell">
        <div className="code-block">
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
            }}
          >
            {source}
          </SyntaxHighlighter>
        </div>
        
        {/* Render outputs */}
        {cell.outputs && cell.outputs.length > 0 && (
          <div className="mt-2 space-y-2">
            {cell.outputs.map((output: any, outputIndex: number) => 
              renderOutput(output, `${index}-${outputIndex}`)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOutput = (output: any, key: string) => {
    if (output.output_type === "stream") {
      const text = Array.isArray(output.text) ? output.text.join("") : output.text;
      return (
        <div key={key} className="code-output">
          <pre className="whitespace-pre-wrap font-mono text-sm">{text}</pre>
        </div>
      );
    }
    
    if (output.output_type === "execute_result" || output.output_type === "display_data") {
      const data = output.data;
      
      if (data["text/html"]) {
        const html = Array.isArray(data["text/html"]) 
          ? data["text/html"].join("") 
          : data["text/html"];
        return (
          <div 
            key={key}
            className="code-output overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      
      if (data["image/png"]) {
        return (
          <div key={key} className="code-output text-center">
            <img 
              src={`data:image/png;base64,${data["image/png"]}`}
              alt="Plot output"
              className="max-w-full h-auto mx-auto rounded-md shadow-md"
            />
          </div>
        );
      }
      
      if (data["text/plain"]) {
        const text = Array.isArray(data["text/plain"]) 
          ? data["text/plain"].join("") 
          : data["text/plain"];
        return (
          <div key={key} className="code-output">
            <pre className="whitespace-pre-wrap font-mono text-sm">{text}</pre>
          </div>
        );
      }
    }
    
    if (output.output_type === "error") {
      const traceback = output.traceback ? output.traceback.join("\n") : "";
      return (
        <div key={key} className="code-output border-error">
          <pre className="whitespace-pre-wrap font-mono text-sm text-error">
            {output.ename}: {output.evalue}
            {traceback && `\n${traceback}`}
          </pre>
        </div>
      );
    }
    
    return null;
  };

  if (!notebook || !notebook.cells) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground-muted">No notebook content available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notebook.cells.map((cell: any, index: number) => {
        switch (cell.cell_type) {
          case "markdown":
            return renderMarkdownCell(cell, index);
          case "code":
            return renderCodeCell(cell, index);
          default:
            return null;
        }
      })}
    </div>
  );
};
