import { Badge } from "@/components/ui/badge";
import { Target, Shield, Rocket, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every product we recommend is tested and verified for real-world performance.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Transparent reviews with honest pros and cons. No hidden agendas.",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Tools and strategies designed to scale your income from zero to six figures.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join 15,000+ marketers sharing strategies, wins, and insights.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-20 md:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Story */}
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-fade-in-up" style={{ opacity: 0 }}>
              // About Us
            </p>
            <h2
              data-testid="about-title"
              className="font-heading text-4xl md:text-5xl font-semibold tracking-tight animate-fade-in-up delay-100"
              style={{ opacity: 0 }}
            >
              Built by Marketers,
              <br />
              For Marketers
            </h2>
            <div className="space-y-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                We started as affiliate marketers ourselves, frustrated by the noise and 
                hype in the industry. After years of testing hundreds of tools and strategies, 
                we built AffiliateHub to cut through the clutter.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Every product listed here has been personally vetted by our team. We only 
                recommend tools we actively use in our own marketing campaigns. No pay-to-play, 
                no fake reviews — just honest recommendations that deliver results.
              </p>
            </div>
            <div className="flex gap-8 pt-6 border-t border-border/50 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">5+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Years Active</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">200+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Tools Tested</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">98%</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right — Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                data-testid={`about-value-${value.title.toLowerCase()}`}
                className="bg-card border border-border/50 rounded-none p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ opacity: 0, animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
