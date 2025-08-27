
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Left Sidebar - File Tree */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 flex flex-col
        `}>
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="font-semibold text-foreground">Files</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-hover rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <FileTree onFileSelect={handleNotebookSelect} selectedPath={selectedNotebook} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-hover rounded-md transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="p-2 hover:bg-hover rounded-md transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 flex">
            {/* Notebook Content */}
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto p-6 lg:p-8">
                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <div className="loading-spinner" />
                    <span className="ml-3 text-foreground-muted">Loading notebook...</span>
                  </div>
                )}
                
                {error && (
                  <div className="card-default p-8 text-center">
                    <p className="text-error mb-4">Error loading notebook</p>
                    <p className="text-foreground-muted text-sm">{error}</p>
                  </div>
                )}
                
                {!selectedNotebook && !loading && (
                  <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Select a Notebook
                    </h2>
                    <p className="text-foreground-muted">
                      Choose a notebook from the file tree to start exploring
                    </p>
                  </div>
                )}
                
                {notebookContent && !loading && (
                  <NotebookContent notebook={notebookContent} headings={headings} />
                )}
              </div>
            </div>
            
            {/* Right Sidebar - Table of Contents */}
            <aside className={`
              fixed lg:static inset-y-0 right-0 z-50 w-80 bg-surface border-l border-border
              transform transition-transform duration-300 ease-in-out
              ${tocOpen ? "translate-x-0" : "translate-x-full"}
              lg:translate-x-0 flex flex-col
            `}>
              <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
                <h2 className="font-semibold text-foreground">Contents</h2>
                <button
                  onClick={() => setTocOpen(false)}
                  className="p-2 hover:bg-hover rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <TableOfContents headings={headings} />
              </div>
            </aside>
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
