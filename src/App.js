import { useEffect, useRef } from "react";
import "@/App.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function useScrollAnimations() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".animate-fade-in-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in"
    );
    elements.forEach((el) => {
      if (el.style.opacity === "0") {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);
}

function AppContent() {
  useScrollAnimations();

  return (
    <div className="noise-overlay min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
