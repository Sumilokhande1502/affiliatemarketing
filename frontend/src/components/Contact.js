import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
<<<<<<< HEAD
      if (BACKEND_URL) {
        const response = await fetch(`${BACKEND_URL}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        const data = await response.json();
        toast.success(data.message || "Message sent!");
      } else {
        const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID || "";
        if (FORMSPREE_ID) {
          const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: formData.name, email: formData.email, _subject: formData.subject, message: formData.message }) });
          if (response.ok) toast.success("Message sent! We'll get back to you within 24h.");
          else throw new Error("Failed");
        } else {
          window.open(`mailto:hello@creativeaffiliates.in?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`, "_blank");
          toast.success("Opening your email client...");
        }
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
=======
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      toast.success(response.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> parent of f3b4282 (auto-commit for 653d0d2e-4e0e-4f81-b3af-4f1a542885db)
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-fade-in-up" style={{ opacity: 0 }}>
              // Start a Conversation
            </p>
            <h2 data-testid="contact-title"
              className="font-heading text-4xl md:text-5xl font-semibold tracking-tight animate-fade-in-up delay-100"
              style={{ opacity: 0 }}>
              Let's Build
              <br />
              Together
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              Ready to add software to your agency's offering? Tell us about your 
              clients, your goals, and we'll map out the fastest path to revenue.
            </p>

            <div className="space-y-4 pt-6 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Email</p>
                  <p className="text-sm font-medium" data-testid="contact-email-info">hello@creativeaffiliates.in</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Location</p>
                  <p className="text-sm font-medium">Remote-First -- Global Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Response Time</p>
                  <p className="text-sm font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} data-testid="contact-form" className="glass-card rounded-none p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Name</label>
                  <Input id="name" name="name" data-testid="contact-name-input" value={formData.name} onChange={handleChange} placeholder="Your name" className="input-underline" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Email</label>
                  <Input id="email" name="email" type="email" data-testid="contact-email-input" value={formData.email} onChange={handleChange} placeholder="you@agency.com" className="input-underline" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Subject</label>
                <Input id="subject" name="subject" data-testid="contact-subject-input" value={formData.subject} onChange={handleChange} placeholder="e.g. White-label dashboard for my clients" className="input-underline" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Message</label>
                <Textarea id="message" name="message" data-testid="contact-message-input" value={formData.message} onChange={handleChange}
                  placeholder="Tell us about your agency, your clients, and what you'd like to build..." rows={5} className="input-underline resize-none" required />
              </div>
              <Button type="submit" data-testid="contact-submit-btn" disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 uppercase font-bold tracking-widest text-sm hover:-translate-y-0.5 transition-transform active:scale-95">
                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : (<><Send className="mr-2 h-4 w-4" />Send Message</>)}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
