
import React, { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle, Code, FileText } from 'lucide-react';

interface NotebookData {
  cells: any[];
  metadata?: any;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface NotebookContentProps {
  notebookData: NotebookData | null;
  loading: boolean;
  error: string | null;
  headings: Heading[];
}

const NotebookContent: React.FC<NotebookContentProps> = ({
  notebookData,
  loading,
  error,
  headings
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when new notebook loads
  useEffect(() => {
    if (notebookData && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [notebookData]);

  const renderMarkdown = (source: string | string[], cellIndex: number) => {
    const content = Array.isArray(source) ? source.join('') : source;
    const lines = content.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Handle headings with IDs for ToC linking
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = `heading-${cellIndex}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        
        return (
          <HeadingTag key={lineIndex} id={id} className="scroll-mt-20">
            {text}
          </HeadingTag>
        );
      }
      
      // Handle other markdown elements
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={lineIndex} className="font-bold">{line.slice(2, -2)}</p>;
      }
      
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        return <p key={lineIndex} className="italic">{line.slice(1, -1)}</p>;
      }
      
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <ul key={lineIndex} className="list-disc pl-6">
            <li>{line.slice(2)}</li>
          </ul>
        );
      }
      
      if (line.startsWith('```')) {
        return null; // Handle code blocks separately
      }
      
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      return <p key={lineIndex}>{line}</p>;
    });
  };

  const renderCodeCell = (cell: any, index: number) => {
    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
    
    return (
      <Card key={index} className="notebook-cell">
        <div className="border-b border-border p-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              In [{index + 1}]
            </Badge>
          </div>
        </div>
        
        <div className="p-0">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: 'hsl(var(--code-bg))',
            }}
          >
            {source}
          </SyntaxHighlighter>
        </div>
        
        {/* Render outputs */}
        {cell.outputs && cell.outputs.length > 0 && (
          <div className="border-t border-border">
            {cell.outputs.map((output: any, outputIndex: number) => (
              <div key={outputIndex} className="notebook-output">
                {renderOutput(output, outputIndex)}
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };

  const renderMarkdownCell = (cell: any, index: number) => {
    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
    
    return (
      <Card key={index} className="notebook-cell bg-card/50">
        <div className="p-6 notebook-content">
          {renderMarkdown(source, index)}
        </div>
      </Card>
    );
  };

  const renderOutput = (output: any, index: number) => {
    // Handle different output types
    if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
      if (output.data) {
        // Handle HTML output (like pandas DataFrames)
        if (output.data['text/html']) {
          const htmlContent = Array.isArray(output.data['text/html']) 
            ? output.data['text/html'].join('') 
            : output.data['text/html'];
          
          return (
            <div 
              key={index}
              className="overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          );
        }
        
        // Handle image output (like matplotlib plots)
        if (output.data['image/png']) {
          return (
            <div key={index} className="text-center">
              <img
                src={`data:image/png;base64,${output.data['image/png']}`}
                alt="Plot output"
                className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
              />
            </div>
          );
        }
        
        // Handle plain text output
        if (output.data['text/plain']) {
          const textContent = Array.isArray(output.data['text/plain'])
            ? output.data['text/plain'].join('')
            : output.data['text/plain'];
          
          return (
            <pre key={index} className="bg-muted p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              {textContent}
            </pre>
          );
        }
      }
    }
    
    // Handle stream output (print statements)
    if (output.output_type === 'stream') {
      const text = Array.isArray(output.text) ? output.text.join('') : output.text;
      return (
        <pre key={index} className="bg-muted p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
          {text}
        </pre>
      );
    }
    
    // Handle error output
    if (output.output_type === 'error') {
      return (
        <div key={index} className="bg-destructive/10 border border-destructive/20 p-3 rounded">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="font-semibold text-destructive">{output.ename}</span>
          </div>
          <pre className="text-sm text-destructive overflow-x-auto whitespace-pre-wrap">
            {output.traceback ? output.traceback.join('\n') : output.evalue}
          </pre>
        </div>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading notebook...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="max-w-md mx-auto p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Notebook</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            This is a demo version. In a real implementation, the notebook files would be fetched from your GitHub repository.
          </p>
        </Card>
      </div>
    );
  }

  if (!notebookData) {
    return null;
  }

  return (
    <div ref={contentRef} className="h-full overflow-y-auto scrollbar-thin bg-muted/20">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Notebook Header */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-title">Jupyter Notebook</h1>
          </div>
          
          {notebookData.metadata && (
            <div className="flex flex-wrap gap-2">
              {notebookData.metadata.kernelspec && (
                <Badge variant="outline">
                  {notebookData.metadata.kernelspec.display_name || 'Python'}
                </Badge>
              )}
              <Badge variant="outline">
                {notebookData.cells.length} cells
              </Badge>
            </div>
          )}
        </Card>

        {/* Demo Content */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Demo Notebook Content</h2>
          <p className="text-muted-foreground mb-4">
            This is a demonstration of how notebooks would be rendered. In a real implementation, 
            this would parse and display the actual .ipynb file content including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Markdown cells with rich formatting</li>
            <li>Code cells with syntax highlighting</li>
            <li>Output cells including plots, tables, and text</li>
            <li>Interactive table of contents</li>
          </ul>
        </Card>

        {/* Sample Markdown Cell */}
        <Card className="notebook-cell bg-card/50">
          <div className="p-6 notebook-content">
            <h1 id="heading-0-sample-analysis">GDP Growth Trends Analysis</h1>
            <p>This notebook demonstrates pandas data analysis techniques using real GDP data.</p>
            
            <h2 id="heading-0-data-loading">Data Loading</h2>
            <p>We'll start by loading the necessary libraries and dataset.</p>
          </div>
        </Card>

        {/* Sample Code Cell */}
        <Card className="notebook-cell">
          <div className="border-b border-border p-3 bg-muted/30">
            <Badge variant="secondary" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              In [1]
            </Badge>
          </div>
          
          <div className="p-0">
            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                background: 'hsl(var(--code-bg))',
              }}
            >
{`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the GDP dataset
df = pd.read_csv('gdp_data.csv')
print(f"Dataset shape: {df.shape}")
df.head()`}
            </SyntaxHighlighter>
          </div>
          
          <div className="border-t border-border notebook-output">
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              Dataset shape: (264, 4)
            </pre>
          </div>
        </Card>

        {/* Additional demo cells would be rendered here */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            More notebook content would be rendered here based on the selected .ipynb file
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotebookContent;
