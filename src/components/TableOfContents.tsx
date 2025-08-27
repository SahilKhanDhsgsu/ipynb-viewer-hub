
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
      <div className="text-center py-6">
        <p className="text-muted-foreground text-xs">
          No headings found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-foreground mb-3 px-2 uppercase tracking-wider">
        Contents
      </div>
      
      <nav className="space-y-0.5">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.id)}
            className={`
              w-full text-left text-xs py-1.5 px-2 rounded transition-all duration-150 hover:bg-hover
              ${heading.level === 1 ? "font-medium" : ""}
              ${heading.level === 2 ? "ml-2" : ""}
              ${heading.level === 3 ? "ml-4" : ""}
              ${heading.level >= 4 ? "ml-6" : ""}
              ${activeHeading === heading.id 
                ? "bg-accent/10 text-accent border-l-2 border-accent" 
                : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <span className="truncate block leading-relaxed">{heading.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
