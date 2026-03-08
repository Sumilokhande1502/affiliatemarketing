import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            data-testid="navbar-logo"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight uppercase">
              AffiliateHub
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle + CTA */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="theme-toggle-btn"
                  className="rounded-none"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none">
                <DropdownMenuItem
                  data-testid="theme-light"
                  onClick={() => setTheme("light")}
                  className="rounded-none cursor-pointer"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-testid="theme-dark"
                  onClick={() => setTheme("dark")}
                  className="rounded-none cursor-pointer"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-testid="theme-system"
                  onClick={() => setTheme("system")}
                  className="rounded-none cursor-pointer"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#contact" className="hidden md:block">
              <Button
                data-testid="navbar-cta-btn"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-10 px-6 uppercase font-bold tracking-widest text-xs hover:-translate-y-0.5 transition-transform active:scale-95"
              >
                Get Started
              </Button>
            </a>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              data-testid="mobile-menu-btn"
              className="md:hidden rounded-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden pb-4 border-t border-border/50 pt-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              <Button
                data-testid="mobile-cta-btn"
                className="w-full mt-3 bg-primary text-primary-foreground rounded-none h-10 uppercase font-bold tracking-widest text-xs"
              >
                Get Started
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
