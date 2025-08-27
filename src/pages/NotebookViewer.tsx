import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { FileTree } from "@/components/FileTree"; 
import { NotebookContent } from "@/components/NotebookContent";
import { TableOfContents } from "@/components/TableOfContents";
import { Menu, X, List } from "lucide-react";

const NotebookViewer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(
    searchParams.get("path")
  );
  const [notebookContent, setNotebookContent] = useState<any>(null);
  const [headings, setHeadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const loadNotebook = async (path: string) => {
    if (!path) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load notebook: ${response.status}`);
      }
      const notebook = await response.json();
      setNotebookContent(notebook);
      
      // Extract headings from markdown cells
      const extractedHeadings = extractHeadings(notebook);
      setHeadings(extractedHeadings);
    } catch (err) {
      console.error("Error loading notebook:", err);
      setError(err instanceof Error ? err.message : "Failed to load notebook");
    } finally {
      setLoading(false);
    }
  };

  const extractHeadings = (notebook: any): any[] => {
    const headings: any[] = [];
    
    notebook.cells?.forEach((cell: any, index: number) => {
      if (cell.cell_type === "markdown" && cell.source) {
        const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
        const lines = source.split("\n");
        
        lines.forEach((line: string) => {
          const match = line.match(/^(#{1,6})\s+(.+)/);
          if (match) {
            headings.push({
              level: match[1].length,
              text: match[2].trim(),
              id: `heading-${index}-${match[2].trim().toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
            });
          }
        });
      }
    });
    
    return headings;
  };

  const handleNotebookSelect = (path: string) => {
    setSelectedNotebook(path);
    setSearchParams({ path });
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (selectedNotebook) {
      loadNotebook(selectedNotebook);
    }
  }, [selectedNotebook]);

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Left Sidebar - File Tree - Fixed Height */}
        <aside className={`
          fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-surface border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 flex flex-col
          lg:mt-0 mt-16
        `}>
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden min-h-[60px]">
            <h2 className="font-medium text-foreground">Files</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-hover rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <FileTree onFileSelect={handleNotebookSelect} selectedPath={selectedNotebook} />
          </div>
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header - Fixed */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden bg-surface/95 backdrop-blur-sm sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-hover rounded-lg transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
            {notebookContent && (
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="p-2 hover:bg-hover rounded-lg transition-colors"
              >
                <List className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1 flex min-h-0">
            {/* Notebook Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6 lg:p-8">
                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <div className="loading-spinner" />
                    <span className="ml-3 text-muted-foreground">Loading notebook...</span>
                  </div>
                )}
                
                {error && (
                  <div className="card-default p-8 text-center">
                    <p className="text-destructive mb-2 font-medium">Error loading notebook</p>
                    <p className="text-muted-foreground text-sm">{error}</p>
                  </div>
                )}
                
                {!selectedNotebook && !loading && (
                  <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-foreground mb-3">
                      Select a Notebook
                    </h2>
                    <p className="text-muted-foreground">
                      Choose a notebook from the file tree to start exploring
                    </p>
                  </div>
                )}
                
                {notebookContent && !loading && (
                  <NotebookContent notebook={notebookContent} headings={headings} />
                )}
              </div>
            </div>
            
            {/* Right Sidebar - Table of Contents - Fixed Height */}
            {notebookContent && (
              <aside className={`
                fixed lg:static top-0 bottom-0 right-0 z-50 w-56 bg-surface border-l border-border
                transform transition-transform duration-300 ease-in-out
                ${tocOpen ? "translate-x-0" : "translate-x-full"}
                lg:translate-x-0 flex flex-col
                lg:mt-0 mt-16
              `}>
                <div className="flex items-center justify-between p-4 border-b border-border lg:hidden min-h-[60px]">
                  <h2 className="font-medium text-foreground">Contents</h2>
                  <button
                    onClick={() => setTocOpen(false)}
                    className="p-2 hover:bg-hover rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </main>
        
        {/* Mobile ToC Overlay */}
        {tocOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setTocOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NotebookViewer;
