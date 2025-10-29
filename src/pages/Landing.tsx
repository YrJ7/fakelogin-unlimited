import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, Eye, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">iZ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">InterviewZ</h1>
              <p className="text-xs text-muted-foreground">AI Interview Platform</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Book a Demo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">View Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">AI-Powered Hiring Platform</span>
          </div>
          
          <h2 className="text-6xl font-bold mb-6">
            Revolutionize Your Hiring with <span className="text-primary">Smart Recruitment</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Our AI-driven platform transforms the recruitment process from job posting to
            candidate selection. Automate interviews, analyze resumes, and make data-driven
            hiring decisions.
          </p>
          
          <div className="flex gap-4 justify-center mb-8">
            <Button size="lg" asChild>
              <Link to="/login">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">
                <Briefcase className="w-5 h-5 mr-2" />
                Find Jobs
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/login">
                <Eye className="w-5 h-5 mr-2" />
                How It Works
              </Link>
            </Button>
          </div>
          
          <div className="flex gap-8 justify-center text-sm">
            <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span>👤</span>
              <span className="underline">Candidate Login</span>
            </Link>
            <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span>🏢</span>
              <span className="underline">Recruiter Login</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
