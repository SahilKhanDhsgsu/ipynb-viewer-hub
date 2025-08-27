
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileTreeData {
  [key: string]: string | FileTreeData;
}

interface FileTreeProps {
  onFileSelect: (filePath: string) => void;
  selectedFile: string | null;
}

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect, selectedFile }) => {
  const [treeData, setTreeData] = useState<FileTreeData>({});
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['pandas_playbook', 'business_problems']));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFileTree();
  }, []);

  const loadFileTree = async () => {
    try {
      // In a real implementation, this would fetch from your file_tree.json
      // For now, we'll use the example structure you provided
      const mockTreeData: FileTreeData = {
        "advanced": {},
        "beginner": {},
        "business_problems": {},
        "intermediate": {
          "6_filtering_sorting": "intermediate/6_filtering_sorting.ipynb",
          "7_grouping_aggregation": "intermediate/7_grouping_aggregation.ipynb",
          "8_merging_joining": "intermediate/8_merging_joining.ipynb",
          "9_applying_functions": "intermediate/9_applying_functions.ipynb"
        },
        "leetcode-30-days": {
          "595_big_countries": "leetcode-30-days/595_big_countries.ipynb",
          "1757_recyclable_low_fat": "leetcode-30-days/1757_recyclable_low_fat.ipynb"
        },
        "leetcode-pandas-basics": {
          "2877_create_dataframe_from_list": "leetcode-pandas-basics/2877_create_dataframe_from_list.ipynb",
          "2878_get_first_three_rows": "leetcode-pandas-basics/2878_get_first_three_rows.ipynb"
        },
        "pandas_playbook": {
          "beginner": {
            "1_dataframes_series": "pandas_playbook/beginner/1_dataframes_series.ipynb",
            "2_reading_writing_data": "pandas_playbook/beginner/2_reading_writing_data.ipynb"
          },
          "business_problems": {
            "01_gdp_growth_trends": "pandas_playbook/business_problems/01_gdp_growth_trends.ipynb",
            "02_lowest_gdp_growth_trends": "pandas_playbook/business_problems/02_lowest_gdp_growth_trends.ipynb",
            "03_economic_recession_analysis": "pandas_playbook/business_problems/03_economic_recession_analysis.ipynb",
            "04_gdp_per_region": "pandas_playbook/business_problems/04_gdp_per_region.ipynb",
            "05_amazon_product_performance": "pandas_playbook/business_problems/05_amazon_product_performance.ipynb",
            "06_discount_impact_analysis": "pandas_playbook/business_problems/06_discount_impact_analysis.ipynb",
            "07_category_sales_insights": "pandas_playbook/business_problems/07_category_sales_insights.ipynb",
            "08_customer_review_sentiment": "pandas_playbook/business_problems/08_customer_review_sentiment.ipynb",
            "09_amazon_price_optimization": "pandas_playbook/business_problems/09_amazon_price_optimization.ipynb",
            "10_cancer_diagnosis_patterns": "pandas_playbook/business_problems/10_cancer_diagnosis_patterns.ipynb"
          }
        },
        "projects": {
          "gdp_analysis": {},
          "sales_analysis": {},
          "titanic_eda": {}
        }
      };

      setTreeData(mockTreeData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading file tree:', err);
      setError('Failed to load file tree');
      setLoading(false);
    }
  };

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTreeItem = (key: string, value: string | FileTreeData, path: string = '', depth: number = 0) => {
    const fullPath = path ? `${path}/${key}` : key;
    const isFile = typeof value === 'string';
    const isExpanded = expandedFolders.has(fullPath);
    const isSelected = selectedFile === value;

    if (isFile) {
      return (
        <div key={fullPath} style={{ paddingLeft: `${(depth + 1) * 16}px` }}>
          <Button
            variant="ghost"
            className={`file-tree-item w-full justify-start ${isSelected ? 'bg-accent text-accent-foreground' : 'file-tree-file'}`}
            onClick={() => onFileSelect(value)}
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{key.replace(/_/g, ' ')}</span>
          </Button>
        </div>
      );
    }

    const hasChildren = Object.keys(value as FileTreeData).length > 0;

    return (
      <div key={fullPath}>
        <div style={{ paddingLeft: `${depth * 16}px` }}>
          <Button
            variant="ghost"
            className={`file-tree-item w-full justify-start ${hasChildren ? 'file-tree-folder' : 'text-muted-foreground'}`}
            onClick={() => hasChildren && toggleFolder(fullPath)}
            disabled={!hasChildren}
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
            <Folder className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{key.replace(/_/g, ' ')}</span>
          </Button>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="animate-fade-in-up">
            {Object.entries(value as FileTreeData).map(([childKey, childValue]) =>
              renderTreeItem(childKey, childValue, fullPath, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">Loading files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-destructive">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={loadFileTree}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
        Notebook Files
      </h2>
      <div className="space-y-1">
        {Object.entries(treeData).map(([key, value]) =>
          renderTreeItem(key, value, '', 0)
        )}
      </div>
    </div>
  );
};

export default FileTree;
