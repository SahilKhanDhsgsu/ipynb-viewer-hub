
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in">
              <h1 className="hero-title mb-6">
                Pandas Learning Hub
              </h1>
              <p className="hero-subtitle mb-12 max-w-2xl mx-auto">
                Master pandas with practical notebooks, real-world examples, and interactive tutorials
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/notebooks" className="hero-button group">
                  Explore Notebooks
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="hero-button-secondary group">
                  View on GitHub
                  <Code className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="slide-up text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Learn by Doing
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Comprehensive pandas tutorials covering everything from basics to advanced business problems
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="scale-in card-interactive p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Interactive Notebooks</h3>
                <p className="text-foreground-muted leading-relaxed">
                  Step-by-step tutorials with code examples, outputs, and visualizations
                </p>
              </div>

              <div className="scale-in card-interactive p-8 text-center" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Real-World Problems</h3>
                <p className="text-foreground-muted leading-relaxed">
                  Solve actual business problems with GDP analysis, stock trends, and more
                </p>
              </div>

              <div className="scale-in card-interactive p-8 text-center" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Code className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Practice Problems</h3>
                <p className="text-foreground-muted leading-relaxed">
                  LeetCode-style problems to test and improve your pandas skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in card-elevated p-12 lg:p-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Ready to Master Pandas?
              </h2>
              <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
                Dive into our comprehensive collection of notebooks and start your pandas journey today
              </p>
              <Link to="/notebooks" className="hero-button group">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
