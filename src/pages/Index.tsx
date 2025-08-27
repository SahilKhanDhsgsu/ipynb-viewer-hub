
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, BarChart, TrendingUp, Database } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Notebooks",
      description: "Explore real-world pandas examples through beautifully rendered Jupyter notebooks"
    },
    {
      icon: BarChart,
      title: "Business Problems",
      description: "Tackle real business challenges with comprehensive data analysis solutions"
    },
    {
      icon: TrendingUp,
      title: "Progressive Learning",
      description: "From beginner to advanced - structured learning path for all skill levels"
    },
    {
      icon: Database,
      title: "Rich Datasets",
      description: "Work with diverse datasets including GDP, stocks, e-commerce, and healthcare data"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative hero-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="relative container-responsive py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-hero mb-6">
              Pandas Learning
              <span className="block text-secondary"> Hub</span>
            </h1>
            <p className="text-subtitle mb-8 max-w-2xl mx-auto opacity-90">
              Master pandas through real-world examples, business problems, and interactive notebooks. 
              From GDP analysis to stock market trends - learn by doing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/notebooks">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 animate-pulse-glow">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Notebooks
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Why Choose Our Learning Hub?</h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Comprehensive pandas education through practical, real-world applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-elevated p-6 text-center group interactive-hover">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-small leading-6">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display mb-6">Learn Through Real Projects</h2>
              <p className="text-body mb-6">
                Our curated collection of Jupyter notebooks covers everything from basic DataFrame operations 
                to complex business analytics. Each notebook is carefully crafted to provide hands-on experience 
                with real datasets and practical scenarios.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>GDP Growth Analysis & Economic Trends</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Stock Market Volatility & Portfolio Performance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>E-commerce Sales Analytics & Customer Insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Healthcare Data Analysis & Pattern Recognition</span>
                </li>
              </ul>
              <Link to="/notebooks">
                <Button className="text-lg px-6 py-3">
                  Start Learning
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:order-first">
              <Card className="card-elevated p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Choose a Notebook</h4>
                      <p className="text-small">Browse our organized collection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Follow Along</h4>
                      <p className="text-small">Interactive code and explanations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Apply Knowledge</h4>
                      <p className="text-small">Practice with real datasets</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-responsive text-center">
          <h2 className="text-display mb-4">Ready to Master Pandas?</h2>
          <p className="text-subtitle opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of data scientists and analysts who have accelerated their pandas skills 
            through our practical, hands-on approach.
          </p>
          <Link to="/notebooks">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
