
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Marquee from './Marquee';
import { Home, BookOpen, Github } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Marquee */}
      <Marquee />
      
      {/* Main Header */}
      <div className="border-b border-border">
        <div className="container-responsive">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Pandas Hub</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Learning Platform</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <Link to="/">
                <Button 
                  variant={location.pathname === '/' ? 'default' : 'ghost'}
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              
              <Link to="/notebooks">
                <Button 
                  variant={location.pathname.startsWith('/notebooks') ? 'default' : 'ghost'}
                  size="sm"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Notebooks
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="sm"
                asChild
              >
                <a 
                  href="https://github.com/yourusername/pandas-learning-hub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
