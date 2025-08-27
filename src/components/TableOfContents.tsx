
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  onHeadingClick: (headingId: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  onHeadingClick
}) => {
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      // Find the heading that's currently in view
      let currentHeading = '';
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentHeading = heading.id;
        } else {
          break;
        }
      }
      
      setActiveHeading(currentHeading);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) {
    return (
      <div className="p-4 text-center">
        <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          No headings found in this notebook
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Contents
      </h2>
      
      <nav className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeHeading === heading.id;
          const indentLevel = Math.min(heading.level - 1, 3); // Max 4 levels of indentation
          
          return (
            <Button
              key={heading.id}
              variant="ghost"
              className={`
                toc-item w-full justify-start text-left h-auto py-2 px-3
                ${isActive ? 'active' : ''}
              `}
              style={{ paddingLeft: `${12 + indentLevel * 16}px` }}
              onClick={() => onHeadingClick(heading.id)}
            >
              {indentLevel > 0 && (
                <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0 opacity-50" />
              )}
              <span className="truncate text-sm leading-5">
                {heading.text}
              </span>
            </Button>
          );
        })}
      </nav>
      
      {/* Scroll Indicator */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {headings.length} sections
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
