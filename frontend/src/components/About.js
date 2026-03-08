import { Zap, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Ship Fast",
    description: "From concept to launch in weeks. We move at agency speed because we've done this 120+ times.",
  },
  {
    icon: ShieldCheck,
    title: "You Own Everything",
    description: "Full source code ownership. No vendor lock-in. Walk away anytime with your complete codebase.",
  },
  {
    icon: Zap,
    title: "Agency-First",
    description: "We understand client deadlines, scope creep, and margins. Our processes are built around how agencies actually work.",
  },
  {
    icon: HeartHandshake,
    title: "True Partnership",
    description: "Not a dev shop. Not freelancers. A dedicated tech partner invested in your agency's long-term growth.",
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-fade-in-up" style={{ opacity: 0 }}>
              // Why Agencies Choose Us
            </p>
            <h2 data-testid="about-title"
              className="font-heading text-4xl md:text-5xl font-semibold tracking-tight animate-fade-in-up delay-100"
              style={{ opacity: 0 }}>
              Your Tech Team,
              <br />
              Without the Payroll
            </h2>
            <div className="space-y-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Most marketing agencies hit a ceiling. Clients want custom software, 
                automation tools, and branded platforms — but hiring a dev team is 
                expensive and risky. That's where we come in.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                We've been the invisible tech team behind 40+ marketing agencies worldwide. 
                From lead gen tools to full SaaS platforms, we build what your clients need 
                and deliver it under your brand. You close deals. We write code.
              </p>
            </div>
            <div className="flex gap-8 pt-6 border-t border-border/50 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">40+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Agency Partners</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">2 Weeks</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Avg. First Delivery</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">96%</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Retention Rate</p>
              </div>
            </div>
          </div>

          {/* Right — Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={value.title}
                data-testid={`about-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="glass-card hover-lift rounded-none p-6 animate-fade-in-up"
                style={{ opacity: 0, animationDelay: `${(index + 2) * 100}ms` }}>
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
