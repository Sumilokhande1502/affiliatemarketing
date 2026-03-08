import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-16 hero-glow overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column — Text */}
          <div className="space-y-8">
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              <Badge
                data-testid="hero-badge"
                className="bg-primary/10 text-primary border-primary/20 rounded-none uppercase tracking-widest font-mono text-xs px-4 py-1.5"
              >
                Top Rated Tools & Resources
              </Badge>
            </div>

            <h1
              data-testid="hero-title"
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.9] animate-fade-in-up delay-100"
              style={{ opacity: 0 }}
            >
              Scale Your
              <br />
              <span className="text-primary">Digital</span>
              <br />
              Revenue
            </h1>

            <p
              data-testid="hero-description"
              className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md animate-fade-in-up delay-200"
              style={{ opacity: 0 }}
            >
              Premium affiliate marketing tools, courses, and resources to 
              accelerate your online business growth and maximize commissions.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300"
              style={{ opacity: 0 }}
            >
              <a href="#products">
                <Button
                  data-testid="hero-cta-primary"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 px-8 uppercase font-bold tracking-widest text-sm hover:-translate-y-1 transition-transform active:scale-95"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#about">
                <Button
                  data-testid="hero-cta-secondary"
                  variant="outline"
                  className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-8 uppercase font-bold tracking-widest text-sm transition-colors"
                >
                  Learn More
                </Button>
              </a>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-fade-in-up delay-400"
              style={{ opacity: 0 }}
            >
              <div>
                <p
                  data-testid="stat-revenue"
                  className="font-mono text-2xl md:text-3xl font-bold text-foreground"
                >
                  $2.4M+
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">
                  Revenue Generated
                </p>
              </div>
              <div>
                <p
                  data-testid="stat-users"
                  className="font-mono text-2xl md:text-3xl font-bold text-foreground"
                >
                  15K+
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">
                  Active Users
                </p>
              </div>
              <div>
                <p
                  data-testid="stat-products"
                  className="font-mono text-2xl md:text-3xl font-bold text-foreground"
                >
                  50+
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">
                  Products
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Visual */}
          <div
            className="relative animate-fade-in-up delay-300 hidden lg:block"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Floating cards */}
              <div className="absolute -top-8 -left-8 bg-card border border-border/50 p-4 z-10 animate-fade-in-up delay-500" style={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold">+247%</p>
                    <p className="text-xs text-muted-foreground">Growth Rate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card border border-border/50 p-4 z-10 animate-fade-in-up delay-600" style={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold">$12.5K</p>
                    <p className="text-xs text-muted-foreground">Avg. Monthly</p>
                  </div>
                </div>
              </div>

              {/* Main visual block */}
              <div className="bg-card border border-border/50 p-8 relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-xl uppercase font-bold">Performance</p>
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {/* Bar chart visual */}
                  <div className="flex items-end gap-3 h-40">
                    {[40, 65, 45, 80, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 relative overflow-hidden"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-1000"
                          style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
