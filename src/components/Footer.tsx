
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github, Heart, Home } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container-responsive py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-3">Pandas Learning Hub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Master pandas through real-world examples and interactive notebooks.
            </p>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <div className="space-y-2 text-sm">
              <Link to="/notebooks" className="block text-muted-foreground hover:text-foreground transition-colors">
                Browse Notebooks
              </Link>
              <a 
                href="https://pandas.pydata.org/docs/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Pandas Documentation
              </a>
              <a 
                href="https://jupyter.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Jupyter Project
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href="https://github.com/yourusername/pandas-learning-hub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for data science education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
