import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "SEO Power Suite Pro",
    description: "Complete SEO toolkit with keyword research, backlink analysis, rank tracking, and site audit capabilities.",
    category: "SEO",
    rating: 4.9,
    price: "$97/mo",
    url: "https://example.com/seo-suite",
    featured: true,
  },
  {
    id: 2,
    name: "Email Funnel Builder",
    description: "Drag-and-drop email marketing automation with advanced segmentation and A/B testing.",
    category: "Email Marketing",
    rating: 4.8,
    price: "$49/mo",
    url: "https://example.com/email-funnel",
    featured: false,
  },
  {
    id: 3,
    name: "Social Media Scheduler",
    description: "AI-powered social media management tool for scheduling, analytics, and content optimization.",
    category: "Social Media",
    rating: 4.7,
    price: "$29/mo",
    url: "https://example.com/social-scheduler",
    featured: false,
  },
  {
    id: 4,
    name: "Landing Page Creator",
    description: "High-converting landing page builder with 200+ templates optimized for affiliate marketing.",
    category: "Web Tools",
    rating: 4.8,
    price: "$59/mo",
    url: "https://example.com/landing-pages",
    featured: true,
  },
  {
    id: 5,
    name: "Affiliate Tracker Pro",
    description: "Advanced affiliate link tracking, split testing, and conversion analytics dashboard.",
    category: "Analytics",
    rating: 4.9,
    price: "$79/mo",
    url: "https://example.com/affiliate-tracker",
    featured: false,
  },
  {
    id: 6,
    name: "Content AI Writer",
    description: "AI writing assistant specialized in SEO-optimized affiliate content and product reviews.",
    category: "Content",
    rating: 4.6,
    price: "$39/mo",
    url: "https://example.com/ai-writer",
    featured: false,
  },
];

function ProductCard({ product, index }) {
  return (
    <div
      data-testid={`product-card-${product.id}`}
      className={`card-glare bg-card border border-border/50 rounded-none group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 animate-fade-in-up ${
        product.featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 md:p-8 h-full flex flex-col">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-4">
          <Badge
            data-testid={`product-category-${product.id}`}
            className="bg-primary/10 text-primary border-primary/20 rounded-none uppercase tracking-widest font-mono text-[10px] px-3 py-1"
          >
            {product.category}
          </Badge>
          {product.featured && (
            <Badge
              data-testid={`product-featured-${product.id}`}
              className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest font-mono text-[10px] px-3 py-1"
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <h3
          data-testid={`product-name-${product.id}`}
          className="font-heading text-xl md:text-2xl font-semibold tracking-tight mb-3"
        >
          {product.name}
        </h3>
        <p
          data-testid={`product-desc-${product.id}`}
          className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1"
        >
          {product.description}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="font-mono text-sm font-bold">{product.rating}</span>
            </div>
            <span
              data-testid={`product-price-${product.id}`}
              className="font-mono text-sm font-bold text-primary"
            >
              {product.price}
            </span>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`product-link-${product.id}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none uppercase tracking-widest text-xs font-bold gap-2 group-hover:text-primary transition-colors"
            >
              Visit
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section
      id="products"
      data-testid="products-section"
      className="py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 animate-fade-in-up" style={{ opacity: 0 }}>
            // Our Products
          </p>
          <h2
            data-testid="products-title"
            className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4 animate-fade-in-up delay-100"
            style={{ opacity: 0 }}
          >
            Premium Marketing Tools
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            Handpicked tools and resources to supercharge your affiliate marketing business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
