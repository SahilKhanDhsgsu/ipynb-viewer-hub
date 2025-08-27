
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Marquee } from "./Marquee";
import { BookOpen, Github } from "lucide-react";

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
      <Marquee />
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:block">
            Pandas Hub
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "nav-link-active" : ""}`}
          >
            Home
          </Link>
          <Link 
            to="/notebooks" 
            className={`nav-link ${location.pathname === "/notebooks" ? "nav-link-active" : ""}`}
          >
            Notebooks
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:block">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
