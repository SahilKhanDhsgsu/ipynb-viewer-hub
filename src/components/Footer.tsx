
import React from "react";
import { Link } from "react-router-dom";
import { Github, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground-muted">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-error" />
            <span>for pandas learners</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="nav-link">
              Back to Home
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              View Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
