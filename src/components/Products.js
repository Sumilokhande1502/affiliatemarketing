import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Layers, Code2, Sparkles, Check } from "lucide-react";

const solutions = [
  {
    id: 1,
    icon: Sparkles,
    name: "Productized Service",
    tag: "Best Start",
    tagColor: "bg-primary text-primary-foreground",
    description: "Fixed-scope marketing tools delivered as done-for-you packages. Perfect for agencies wanting to add tech services without the overhead.",
    features: ["Landing page builders", "SEO audit dashboards", "Lead gen funnels", "Client reporting portals", "Email automation setups"],
    price: "From $2,500/project",
    cta: "Start Here",
    url: "#contact",
    featured: true,
  },
  {
    id: 2,
    icon: Code2,
    name: "White-Label Platform",
    tag: "Scale",
    tagColor: "bg-secondary text-secondary-foreground",
    description: "Fully branded marketing platforms deployed under your agency's name. Your clients never see us — they only see your brand.",
    features: ["Custom dashboard UI", "Your domain & branding", "Multi-tenant architecture", "Client self-service portal", "API integrations"],
    price: "From $8,000/platform",
    cta: "Learn More",
    url: "#contact",
    featured: false,
  },
  {
    id: 3,
    icon: Layers,
    name: "SaaS Product",
    tag: "Max Revenue",
    tagColor: "bg-secondary text-secondary-foreground",
    description: "We architect, design, and build your own SaaS product from scratch. You own the code, the brand, and the recurring revenue.",
    features: ["Full product development", "Subscription billing", "User management", "Analytics dashboard", "Ongoing support & updates"],
    price: "Custom pricing",
    cta: "Let's Talk",
    url: "#contact",
    featured: false,
  },
];

function SolutionCard({ solution, index }) {
  return (
    <div
      data-testid={`solution-card-${solution.id}`}
      className={`card-glare hover-lift bg-card border rounded-none group relative overflow-hidden transition-all duration-300 animate-fade-in-up ${
        solution.featured ? "border-primary/50" : "border-border/50 hover:border-primary/30"
      }`}
      style={{ opacity: 0, animationDelay: `${index * 150}ms` }}
    >
      {solution.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      )}
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-primary/10 flex items-center justify-center">
            <solution.icon className="w-7 h-7 text-primary" />
          </div>
          <Badge data-testid={`solution-tag-${solution.id}`}
            className={`${solution.tagColor} rounded-none uppercase tracking-widest font-mono text-[10px] px-3 py-1`}>
            {solution.tag}
          </Badge>
        </div>

        {/* Title & Description */}
        <h3 data-testid={`solution-name-${solution.id}`}
          className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-3 uppercase">
          {solution.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {solution.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {solution.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="pt-6 border-t border-border/50">
          <p data-testid={`solution-price-${solution.id}`}
            className="font-mono text-lg font-bold text-primary mb-4">{solution.price}</p>
          <a href={solution.url} data-testid={`solution-link-${solution.id}`}>
            <Button className={`w-full rounded-none h-11 uppercase font-bold tracking-widest text-xs transition-all ${
              solution.featured
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}>
              {solution.cta}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="solutions" data-testid="products-section" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 animate-fade-in-up" style={{ opacity: 0 }}>
            // Three Ways to Work Together
          </p>
          <h2 data-testid="products-title"
            className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4 animate-fade-in-up delay-100"
            style={{ opacity: 0 }}>
            Choose Your Model
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            Whether you want to start small or go all-in, we have a partnership model that fits your agency.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
