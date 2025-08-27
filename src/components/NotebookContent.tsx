
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
      .replace(/^### (.*$)/gm, '<h3 id="heading-$1-$2" class="text-lg font-semibold text-foreground mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 id="heading-$1-$2" class="text-xl font-semibold text-foreground mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 id="heading-$1-$2" class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="space-y-1 mb-4">$1</ul>')
      .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
      .replace(/^(?!<[h|u|l])/gm, '<p class="text-muted-foreground leading-relaxed mb-4">')
      .replace(/(?<![>])$/gm, '</p>');

    // Add heading IDs for ToC navigation
    headings.forEach((heading, i) => {
      html = html.replace(
        new RegExp(`<h${heading.level}.*?>(.*?)</h${heading.level}>`, 'g'),
        `<h${heading.level} id="${heading.id}" class="text-${heading.level === 1 ? '2xl' : heading.level === 2 ? 'xl' : 'lg'} font-${heading.level === 1 ? 'bold' : 'semibold'} text-foreground mt-${heading.level === 1 ? '8' : '6'} mb-4">$1</h${heading.level}>`
      );
    });

    return (
      <div 
        key={`markdown-${index}`}
        className="notebook-cell mb-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const renderCodeCell = (cell: any, index: number) => {
    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
    
    return (
      <div key={`code-${index}`} className="notebook-cell mb-6">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-3 py-2 border-b border-border">
            <div className="text-xs text-muted-foreground font-medium">Code [{index + 1}]:</div>
          </div>
          <div className="p-4">
            <SyntaxHighlighter
              language="python"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {source}
            </SyntaxHighlighter>
          </div>
        </div>
        
        {/* Render outputs */}
        {cell.outputs && cell.outputs.length > 0 && (
          <div className="mt-3 space-y-3">
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
        <div key={key} className="bg-muted/50 border border-border rounded-lg p-3">
          <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">{text}</pre>
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
            className="bg-card border border-border rounded-lg p-4 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      
      if (data["image/png"]) {
        return (
          <div key={key} className="bg-card border border-border rounded-lg p-4 text-center">
            <img 
              src={`data:image/png;base64,${data["image/png"]}`}
              alt="Plot output"
              className="max-w-full h-auto mx-auto rounded shadow-sm"
            />
          </div>
        );
      }
      
      if (data["text/plain"]) {
        const text = Array.isArray(data["text/plain"]) 
          ? data["text/plain"].join("") 
          : data["text/plain"];
        return (
          <div key={key} className="bg-muted/50 border border-border rounded-lg p-3">
            <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">{text}</pre>
          </div>
        );
      }
    }
    
    if (output.output_type === "error") {
      const traceback = output.traceback ? output.traceback.join("\n") : "";
      return (
        <div key={key} className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <pre className="whitespace-pre-wrap font-mono text-sm text-destructive">
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
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">No notebook content available</p>
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
