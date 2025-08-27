
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code, TrendingUp, Sparkles, Zap, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-accent rounded-full float opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-primary rounded-full float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-secondary rounded-full float opacity-30" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="stagger-animation">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-surface-elevated/80 backdrop-blur-sm border border-accent/20 rounded-full text-sm text-accent font-medium mb-8 hover:bg-surface-overlay hover:border-accent/40 transition-all duration-300 hover:scale-105">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Interactive Learning Experience
                <Zap className="h-4 w-4 animate-pulse" />
              </div>

              <h1 className="hero-title mb-8">
                Pandas Learning Hub
              </h1>
              
              <p className="hero-subtitle mb-12 max-w-3xl mx-auto">
                Master pandas with practical notebooks, real-world examples, and interactive tutorials. 
                Dive deep into data science with hands-on business problems and coding challenges.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link to="/notebooks" className="hero-button button-glow group">
                  <BookOpen className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Notebooks
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <button className="hero-button-secondary group">
                  <Code className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  View on GitHub
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
                <div className="glass-effect p-6 rounded-xl hover:bg-surface-elevated/90 transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-muted-foreground">Interactive Notebooks</div>
                </div>
                <div className="glass-effect p-6 rounded-xl hover:bg-surface-elevated/90 transition-all duration-300 hover:scale-105 group" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                  <div className="text-muted-foreground">Business Problems</div>
                </div>
                <div className="glass-effect p-6 rounded-xl hover:bg-surface-elevated/90 transition-all duration-300 hover:scale-105 group" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
                  <div className="text-muted-foreground">LeetCode Challenges</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 stagger-animation">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                Learn by Doing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive pandas tutorials covering everything from basics to advanced business problems. 
                Each notebook is crafted with real-world scenarios to accelerate your data science journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 stagger-animation">
              <div className="card-interactive p-8 text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <BookOpen className="h-10 w-10 text-primary group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  Interactive Notebooks
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  Step-by-step tutorials with code examples, detailed outputs, and beautiful visualizations. 
                  Learn pandas concepts through hands-on practice.
                </p>
              </div>

              <div className="card-interactive p-8 text-center group" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <TrendingUp className="h-10 w-10 text-secondary group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-300">
                  Real-World Problems
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  Solve actual business scenarios with GDP analysis, stock market trends, e-commerce insights, 
                  and healthcare data exploration.
                </p>
              </div>

              <div className="card-interactive p-8 text-center group" style={{ animationDelay: '0.4s' }}>
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Target className="h-10 w-10 text-accent group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  Practice Problems
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  LeetCode-style challenges designed specifically for pandas. Test your skills and 
                  master data manipulation techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="card-elevated p-12 lg:p-20 stagger-animation relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-accent to-secondary"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium mb-8">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Start Your Journey
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Ready to Master Pandas?
                </h2>
                
                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of data scientists and analysts who have accelerated their careers 
                  with our comprehensive pandas learning platform. Start your journey today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/notebooks" className="hero-button button-glow group">
                    <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                    Start Learning Now
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                  
                  <button className="hero-button-secondary group">
                    <BookOpen className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Browse Examples
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
