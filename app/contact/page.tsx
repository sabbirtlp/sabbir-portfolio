"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Sparkles,
  Globe,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";

export default function ContactPage() {
  const { content } = useContent();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Defaults
  const cp = content?.contactPage || {};
  const badge = cp.badge || "Get In Touch";
  const headline = cp.headline || "Let's Build Something";
  const headlineHighlight = cp.headlineHighlight || "Extraordinary Together";
  const description =
    cp.description || "Have a project in mind? I'd love to hear about it.";
  const formTitle = cp.formTitle || "Send a Message";
  const formDescription =
    cp.formDescription ||
    "Fill out the form below and I'll get back to you within 24 hours.";
  const infoTitle = cp.infoTitle || "Contact Information";
  const infoDescription =
    cp.infoDescription ||
    "Feel free to reach out through any of the following channels.";
  const email = cp.email || content?.general?.email || "hello@sabbir.website";
  const phone = cp.phone || content?.general?.phone || "+880 1879667166";
  const location = cp.location || "Dhaka, Bangladesh";
  const locationDetail =
    cp.locationDetail || "Available for remote work worldwide";
  const availability = cp.availability || "Currently accepting new projects";
  const responseTime = cp.responseTime || "Typical response within 3 hours";
  const workingHours = cp.workingHours || "Sun - Thu, 9:00 AM - 6:00 PM (BST)";
  const faqTitle = cp.faqTitle || "Frequently Asked Questions";
  const faqs = cp.faqs || [];

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          budget: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setStatus({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error. Please check your connection.",
      });
    } finally {
      setSending(false);
    }
  }

  const infoItems = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: "Location", value: location, sub: locationDetail },
    { icon: Clock, label: "Working Hours", value: workingHours },
  ];

  return (
    <div className="flex flex-col pt-24 selection:bg-accent/20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative px-4 pb-16 pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-100 dark:from-[#0A0A0A] dark:to-[#0A0A0A] border border-zinc-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 px-6 py-12 md:px-12 md:py-20 text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm dark:bg-white/5 backdrop-blur-sm dark:border-white/10 mb-8"
              >
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white/90">
                  {badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black font-syne text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-6"
              >
                {headline}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                  {headlineHighlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-zinc-600 dark:text-white/70 text-base md:text-lg max-w-2xl mx-auto"
              >
                {description}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-10"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-white/60">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>{availability}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-400 dark:bg-white/20" />
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-white/60">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{responseTime}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-400 dark:bg-white/20" />
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-white/60">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>{locationDetail}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section
        ref={formRef}
        className="max-w-7xl mx-auto w-full px-4 py-8 md:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-surface border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
              <h2 className="text-2xl md:text-3xl font-black font-syne text-text-primary mb-2">
                {formTitle}
              </h2>
              <p className="text-text-secondary text-sm mb-8">
                {formDescription}
              </p>

              {status && (
                <div
                  className={`mb-6 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
                    status.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                      : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full bg-zinc-50 dark:bg-surface-2 border border-zinc-200 dark:border-border rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted/50 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full bg-zinc-50 dark:bg-surface-2 border border-zinc-200 dark:border-border rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted/50 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Website Development"
                      className="w-full bg-zinc-50 dark:bg-surface-2 border border-zinc-200 dark:border-border rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted/50 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-surface-2 border border-zinc-200 dark:border-border rounded-xl px-4 py-3.5 text-text-primary outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all text-sm cursor-pointer appearance-none"
                    >
                      <option value="">Select budget...</option>
                      <option value="< $500">Less than $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, goals, and timeline..."
                    className="w-full bg-zinc-50 dark:bg-surface-2 border border-zinc-200 dark:border-border rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted/50 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-sm glow-accent cursor-pointer disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {sending ? "Sending..." : "Send Message"}
                  {!sending && (
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info Sidebar (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-surface border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
              <h3 className="text-xl font-black font-syne text-text-primary mb-2">
                {infoTitle}
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                {infoDescription}
              </p>

              <div className="space-y-5">
                {infoItems.map((item, i) => (
                  <div key={i} className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <item.icon className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-text-primary font-medium text-sm hover:text-accent transition-colors"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="text-text-primary font-medium text-sm">
                          {item.value}
                        </p>
                      )}
                      {item.sub && (
                        <p className="text-text-muted text-xs mt-0.5">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-accent/5 to-orange-500/5 border border-accent/20 rounded-[2rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {availability}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  I&apos;m currently available for freelance projects and
                  long-term collaborations. Let&apos;s create something amazing
                  together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto w-full px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black font-syne text-text-primary tracking-tight mb-4">
              {faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq: any, i: number) => (
              <div
                key={i}
                className="bg-white dark:bg-surface border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-text-primary font-semibold text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-text-secondary text-sm leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
