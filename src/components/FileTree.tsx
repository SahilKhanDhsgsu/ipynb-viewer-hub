
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";

interface FileTreeNode {
  [key: string]: string | FileTreeNode;
}

interface FileTreeProps {
  onFileSelect: (path: string) => void;
  selectedPath: string | null;
}

export const FileTree: React.FC<FileTreeProps> = ({ onFileSelect, selectedPath }) => {
  const [fileTree, setFileTree] = useState<FileTreeNode>({});
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFileTree();
  }, []);

  const loadFileTree = async () => {
    try {
      const response = await fetch("/file_tree.json");
      if (!response.ok) {
        throw new Error("Failed to load file tree");
      }
      const tree = await response.json();
      setFileTree(tree);
    } catch (err) {
      console.error("Error loading file tree:", err);
      setError("Failed to load file tree");
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTreeNode = (node: FileTreeNode, parentPath = "", level = 0): React.ReactNode => {
    return Object.entries(node).map(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}/${key}` : key;
      const isExpanded = expandedFolders.has(currentPath);
      
      if (typeof value === "string") {
        // This is a file
        const isSelected = selectedPath === value;
        return (
          <div
            key={currentPath}
            className={`file-tree-item ${isSelected ? "file-tree-item-active" : ""}`}
            style={{ paddingLeft: `${(level + 1) * 16}px` }}
            onClick={() => onFileSelect(value)}
          >
            <File className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{key}</span>
          </div>
        );
      } else {
        // This is a folder
        const hasChildren = Object.keys(value).length > 0;
        return (
          <div key={currentPath}>
            <div
              className="file-tree-folder"
              style={{ paddingLeft: `${level * 16}px` }}
              onClick={() => hasChildren && toggleFolder(currentPath)}
            >
              {hasChildren && (
                <>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </>
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 flex-shrink-0" />
              ) : (
                <Folder className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="truncate">{key}</span>
            </div>
            {isExpanded && hasChildren && (
              <div className="animate-accordion-down">
                {renderTreeNode(value, currentPath, level + 1)}
              </div>
            )}
          </div>
        );
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="loading-skeleton h-8 rounded-md" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-error mb-2">Failed to load files</p>
        <button
          onClick={loadFileTree}
          className="text-accent hover:text-accent-hover text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-foreground mb-4 px-3">
        Notebooks
      </div>
      {renderTreeNode(fileTree)}
    </div>
  );
};
