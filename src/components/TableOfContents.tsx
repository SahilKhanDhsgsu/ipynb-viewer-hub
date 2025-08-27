
import React, { useState, useEffect } from "react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20px 0px -80% 0px",
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  if (headings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-foreground-muted text-sm">
          No headings found in this notebook
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-foreground mb-4 px-3">
        Table of Contents
      </div>
      
      <nav className="space-y-1">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.id)}
            className={`
              toc-item w-full text-left transition-all duration-150
              toc-heading-${heading.level}
              ${activeHeading === heading.id ? "toc-item-active" : ""}
            `}
          >
            <span className="truncate block">{heading.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
