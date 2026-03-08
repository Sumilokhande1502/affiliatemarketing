import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Layers, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen flex items-center pt-16 hero-glow grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              <Badge data-testid="hero-badge"
                className="bg-primary/10 text-primary border-primary/20 rounded-none uppercase tracking-widest font-mono text-xs px-4 py-1.5">
                Software Partner for Marketing Agencies
              </Badge>
            </div>

            <h1 data-testid="hero-title"
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.9] animate-fade-in-up delay-100"
              style={{ opacity: 0 }}>
              We Build
              <br />
              <span className="shimmer-text">Software</span>
              <br />
              You Sell It
            </h1>

            <p data-testid="hero-description"
              className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg animate-fade-in-up delay-200"
              style={{ opacity: 0 }}>
              Your agency handles clients. We handle the tech. Get custom-built marketing
              platforms, white-label SaaS tools, and productized services — delivered 
              under your brand, on your timeline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <a href="#solutions">
                <Button data-testid="hero-cta-primary"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 px-8 uppercase font-bold tracking-widest text-sm hover:-translate-y-1 transition-transform active:scale-95">
                  See Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button data-testid="hero-cta-secondary" variant="outline"
                  className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-8 uppercase font-bold tracking-widest text-sm transition-colors">
                  Book a Call
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
              <div>
                <p data-testid="stat-agencies" className="font-mono text-2xl md:text-3xl font-bold text-foreground">40+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Agency Partners</p>
              </div>
              <div>
                <p data-testid="stat-projects" className="font-mono text-2xl md:text-3xl font-bold text-foreground">120+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Projects Shipped</p>
              </div>
              <div>
                <p data-testid="stat-revenue" className="font-mono text-2xl md:text-3xl font-bold text-foreground">$3M+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Revenue Enabled</p>
              </div>
            </div>
          </div>

          {/* Right Column — Floating Cards */}
          <div className="relative animate-fade-in-up delay-300 hidden lg:block" style={{ opacity: 0 }}>
            <div className="relative space-y-6">
              {/* Card 1 - SaaS */}
              <div className="glass-card hover-lift p-6 animate-float" style={{ animationDelay: "0s" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center"><Layers className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="font-heading text-lg font-bold uppercase">SaaS Product</p>
                    <p className="text-xs text-muted-foreground font-mono">RECURRING REVENUE</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Launch your own marketing SaaS. We build it, you own the MRR.</p>
              </div>

              {/* Card 2 - White Label */}
              <div className="glass-card hover-lift p-6 ml-12 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center"><Code2 className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="font-heading text-lg font-bold uppercase">White-Label</p>
                    <p className="text-xs text-muted-foreground font-mono">YOUR BRAND, OUR CODE</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Rebrand our platforms as yours. Resell to unlimited clients.</p>
              </div>

              {/* Card 3 - Productized Service - BEST */}
              <div className="glass-card hover-lift p-6 mr-8 gradient-border animate-pulse-glow animate-float" style={{ animationDelay: "4s" }}>
                <Badge className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest font-mono text-[10px] px-3 py-1 mb-3">
                  Best Start
                </Badge>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center"><Sparkles className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="font-heading text-lg font-bold uppercase">Productized Service</p>
                    <p className="text-xs text-muted-foreground font-mono">EASIEST ENTRY POINT</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Fixed-scope, fixed-price deliverables. Start selling in weeks, not months.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
