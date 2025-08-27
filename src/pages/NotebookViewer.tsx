
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FileTree from '@/components/FileTree';
import NotebookContent from '@/components/NotebookContent';
import TableOfContents from '@/components/TableOfContents';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen } from 'lucide-react';

interface NotebookData {
  cells: any[];
  metadata?: any;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const NotebookViewer = () => {
  const { path } = useParams();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [notebookData, setNotebookData] = useState<NotebookData | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Handle URL-based file selection
  useEffect(() => {
    if (path) {
      const decodedPath = decodeURIComponent(path);
      setSelectedFile(decodedPath);
      loadNotebook(decodedPath);
    }
  }, [path]);

  const loadNotebook = async (filePath: string) => {
    if (!filePath) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from your GitHub repo
      // For now, we'll simulate the notebook structure
      const response = await fetch(`/${filePath}`);
      if (!response.ok) {
        throw new Error(`Failed to load notebook: ${response.statusText}`);
      }
      
      const data = await response.json();
      setNotebookData(data);
      
      // Extract headings for table of contents
      const extractedHeadings: Heading[] = [];
      data.cells?.forEach((cell: any, index: number) => {
        if (cell.cell_type === 'markdown' && cell.source) {
          const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
          const lines = source.split('\n');
          
          lines.forEach((line: string) => {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
              const level = match[1].length;
              const text = match[2].trim();
              const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
              extractedHeadings.push({ id, text, level });
            }
          });
        }
      });
      
      setHeadings(extractedHeadings);
    } catch (err) {
      console.error('Error loading notebook:', err);
      setError(err instanceof Error ? err.message : 'Failed to load notebook');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
    loadNotebook(filePath);
    setLeftPanelOpen(false); // Close mobile menu
    
    // Update URL
    window.history.pushState(null, '', `#/notebooks/${encodeURIComponent(filePath)}`);
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setRightPanelOpen(false); // Close mobile ToC
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Overlay */}
      {leftPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setLeftPanelOpen(false)}
        />
      )}
      
      {/* Left Panel - File Tree */}
      <aside 
        className={`
          fixed lg:relative top-0 left-0 h-full w-80 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${leftPanelOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h2 className="font-semibold">Files</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setLeftPanelOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-full overflow-y-auto scrollbar-thin">
          <FileTree onFileSelect={handleFileSelect} selectedFile={selectedFile} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setLeftPanelOpen(true)}
          >
            <Menu className="h-4 w-4 mr-2" />
            Files
          </Button>
          
          {headings.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setRightPanelOpen(true)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Contents
            </Button>
          )}
        </header>

        {/* Notebook Content */}
        <div className="flex-1 overflow-hidden">
          {!selectedFile ? (
            <div className="h-full flex items-center justify-center bg-muted/30">
              <div className="text-center max-w-md mx-auto p-8">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-title mb-2">Welcome to Pandas Learning Hub</h2>
                <p className="text-muted-foreground mb-6">
                  Select a notebook from the file tree to start exploring our comprehensive 
                  pandas tutorials and real-world examples.
                </p>
                <Button 
                  onClick={() => setLeftPanelOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
          ) : (
            <NotebookContent 
              notebookData={notebookData}
              loading={loading}
              error={error}
              headings={headings}
            />
          )}
        </div>
      </main>

      {/* Right Panel - Table of Contents */}
      {headings.length > 0 && (
        <>
          {/* Mobile ToC Overlay */}
          {rightPanelOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setRightPanelOpen(false)}
            />
          )}
          
          <aside 
            className={`
              fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border z-50
              transform transition-transform duration-300 ease-in-out lg:transform-none
              ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
              <h2 className="font-semibold">Contents</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setRightPanelOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-full overflow-y-auto scrollbar-thin">
              <TableOfContents 
                headings={headings} 
                onHeadingClick={scrollToHeading}
              />
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default NotebookViewer;
