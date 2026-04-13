"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Globe,
  Plus,
  Trash2,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  // ... (rest of initial state)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setContent(data);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load content" });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed");
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Changes saved successfully!" });
      } else {
        throw new Error();
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save changes" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface shrink-0 flex flex-col pt-8">
        <div className="px-6 mb-10 text-center">
          <div className="font-syne font-black text-2xl text-white">
            <span className="text-accent">S</span>abbir<span className="text-accent text-sm">CMS</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted mt-1">Management Hub</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "general", label: "General Settings", icon: Settings },
            { id: "hero", label: "Hero Section", icon: LayoutDashboard },
            { id: "about", label: "About Me", icon: User },
            { id: "services", label: "Services", icon: Briefcase },
            { id: "process", label: "Process", icon: CheckCircle2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                ? "bg-accent/10 text-accent border border-accent/20" 
                : "text-text-secondary hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <ChevronRight className="ml-auto w-3 h-3" />}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-border/50">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-12 flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full h-12 flex items-center justify-center gap-2 bg-transparent hover:bg-red-500/10 text-text-muted hover:text-red-400 font-medium rounded-xl transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto pt-12 pb-20 px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-syne font-black text-3xl text-white capitalize">{activeTab.replace("-", " ")}</h1>
            {message && (
              <div className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}
          </div>

          <div className="space-y-8 bg-surface border border-border rounded-2xl p-8 shadow-xl">
            {/* HERO SECTION */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Badge Text</label>
                  <input 
                    type="text" 
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Subheadline</label>
                  <textarea 
                    rows={4}
                    value={content.hero.subheadline}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Hero Stats</label>
                  <div className="grid grid-cols-3 gap-4">
                    {content.hero.stats.map((stat: any, i: number) => (
                      <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl space-y-2">
                        <input 
                          type="text" 
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...content.hero.stats];
                            newStats[i].value = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                          }}
                          className="w-full bg-background border border-border text-center rounded py-1 text-accent font-bold"
                          placeholder="Value"
                        />
                        <input 
                          type="text" 
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...content.hero.stats];
                            newStats[i].label = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                          }}
                          className="w-full bg-transparent text-center text-xs text-text-secondary outline-none"
                          placeholder="Label"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT SECTION */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Name</label>
                    <input 
                      type="text" 
                      value={content.about.name}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, name: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Role/Title</label>
                    <input 
                      type="text" 
                      value={content.about.role}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, role: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">About Description</label>
                  <textarea 
                    rows={6}
                    value={content.about.description}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Tech Stack (comma separated)</label>
                  <input 
                    type="text" 
                    value={content.about.techStack.join(", ")}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, techStack: e.target.value.split(",").map(t => t.trim()) } })}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white"
                  />
                </div>
              </div>
            )}

            {/* SERVICES SECTION */}
            {activeTab === "services" && (
              <div className="space-y-6">
                 {content.services.map((service: any, i: number) => (
                   <div key={i} className="group relative p-6 bg-surface-2 border border-border rounded-2xl space-y-4">
                      <button 
                        onClick={() => {
                          const newServices = content.services.filter((_: any, idx: number) => idx !== i);
                          setContent({ ...content, services: newServices });
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...content.services];
                            newServices[i].title = e.target.value;
                            setContent({ ...content, services: newServices });
                          }}
                          className="bg-transparent font-syne font-bold text-white outline-none focus:text-accent"
                          placeholder="Service Title"
                        />
                        <input 
                          type="text" 
                          value={service.highlight || ""}
                          onChange={(e) => {
                            const newServices = [...content.services];
                            newServices[i].highlight = e.target.value || null;
                            setContent({ ...content, services: newServices });
                          }}
                          className="bg-accent/5 border border-accent/20 rounded px-2 py-0.5 text-[10px] text-accent font-bold"
                          placeholder="Badge (optional)"
                        />
                      </div>
                      <textarea 
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[i].description = e.target.value;
                          setContent({ ...content, services: newServices });
                        }}
                        className="w-full bg-transparent text-sm text-text-secondary outline-none border-t border-white/5 pt-2"
                        placeholder="Description..."
                      />
                   </div>
                 ))}
                 <button 
                  onClick={() => setContent({ ...content, services: [...content.services, { title: "New Service", description: "Service details...", highlight: null, icon: "Globe" }] })}
                  className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-text-muted hover:text-accent hover:border-accent/40 transition-all"
                 >
                    <Plus className="w-4 h-4" />
                    Add New Service
                 </button>
              </div>
            )}

            {/* PROCESS SECTION */}
            {activeTab === "process" && (
              <div className="space-y-4">
                {content.process.steps.map((step: any, i: number) => (
                   <div key={i} className="flex gap-4 p-4 bg-surface-2 border border-border rounded-xl">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white shrink-0"
                        style={{ background: step.accent }}
                      >
                        {step.number}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input 
                          type="text" 
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...content.process.steps];
                            newSteps[i].title = e.target.value;
                            setContent({ ...content, process: { ...content.process, steps: newSteps } });
                          }}
                          className="w-full bg-transparent font-bold text-white outline-none"
                        />
                         <textarea 
                          rows={2}
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...content.process.steps];
                            newSteps[i].description = e.target.value;
                            setContent({ ...content, process: { ...content.process, steps: newSteps } });
                          }}
                          className="w-full bg-transparent text-sm text-text-secondary outline-none"
                        />
                      </div>
                   </div>
                ))}
              </div>
            )}

            {/* GENERAL SECTION */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={content.general.email}
                      onChange={(e) => setContent({ ...content, general: { ...content.general, email: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={content.general.phone}
                      onChange={(e) => setContent({ ...content, general: { ...content.general, phone: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted">Social Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(content.general.socials).map(([platform, url]: [any, any]) => (
                      <div key={platform} className="p-3 bg-surface-2 border border-border rounded-xl">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted mb-1 block">{platform}</span>
                        <input 
                          type="text" 
                          value={url}
                          onChange={(e) => {
                            const newSocials = { ...content.general.socials, [platform]: e.target.value };
                            setContent({ ...content, general: { ...content.general, socials: newSocials } });
                          }}
                          className="w-full bg-transparent text-xs text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
