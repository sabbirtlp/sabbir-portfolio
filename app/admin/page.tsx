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
  ChevronDown,
  Globe,
  Plus,
  Trash2,
  LogOut,
  FolderOpen,
  MessageSquare,
  ExternalLink,
  Upload,
  ImageIcon,
  Edit3,
  Eye,
  Menu,
  X,
  Zap,
  Type
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
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deletingTestimonialIndex, setDeletingTestimonialIndex] = useState<number | null>(null);

  async function performUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      return await res.json();
    } catch (error: any) {
      console.error("Upload error:", error);
      throw error;
    }
  }

  async function handleImageUpload(file: File, projectIndex: number) {
    setUploadingIndex(projectIndex);
    try {
      const { path } = await performUpload(file);
      setContent((prev: any) => {
        const newProjects = [...prev.projects];
        newProjects[projectIndex] = { ...newProjects[projectIndex], image: path };
        return { ...prev, projects: newProjects };
      });
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Image upload failed" });
    } finally {
      setUploadingIndex(null);
    }
  }

  async function handleScreenshotUpload(file: File, projectIndex: number) {
    setUploadingScreenshot(projectIndex);
    try {
      const { path } = await performUpload(file);
      setContent((prev: any) => {
        const newProjects = [...prev.projects];
        newProjects[projectIndex] = { ...newProjects[projectIndex], screenshot: path };
        return { ...prev, projects: newProjects };
      });
      setMessage({ type: "success", text: "Screenshot uploaded!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Screenshot upload failed" });
    } finally {
      setUploadingScreenshot(null);
    }
  }

  async function handleTechStackIconUpload(file: File, iconIndex: number) {
    setUploadingIndex(iconIndex);
    try {
      const { path } = await performUpload(file);
      setContent((prev: any) => {
        const newIcons = [...prev.techStack.icons];
        newIcons[iconIndex] = { ...newIcons[iconIndex], src: path };
        return { ...prev, techStack: { ...prev.techStack, icons: newIcons } };
      });
      setMessage({ type: "success", text: "Tech icon uploaded!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Icon upload failed" });
    } finally {
      setUploadingIndex(null);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  // Auto-dismiss messages after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
      } else if (res.status === 401) {
        // Session expired — redirect to login
        setMessage({ type: "error", text: "Session expired. Redirecting to login..." });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        let errorText = "Failed to save changes";
        try {
          const data = await res.json();
          if (data?.error) errorText = data.error;
        } catch {}
        setMessage({ type: "error", text: errorText });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error — please check your connection and try again." });
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
    <div className="h-screen bg-background text-text-primary flex flex-col md:flex-row overflow-hidden relative" data-lenis-prevent>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-surface border-b border-border z-[60] relative">
        <div className="font-syne font-black text-xl text-white">
          <span className="text-accent">S</span>abbir<span className="text-accent text-xs">CMS</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-text-muted hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 w-[280px] md:w-64 border-r border-border bg-surface z-[70] transform transition-transform duration-300 ease-in-out flex flex-col h-[100dvh] overflow-y-auto
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="px-6 pt-6 mb-8 flex items-start justify-between md:block text-left md:text-center">
          <div>
            <div className="font-syne font-black text-2xl text-white">
              <span className="text-accent">S</span>abbir<span className="text-accent text-sm">CMS</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-text-muted mt-1">Management Hub</p>
          </div>
          <button 
            className="md:hidden text-text-muted hover:text-white p-1 -mr-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "general", label: "General Settings", icon: Settings },
            { id: "hero", label: "Hero Section", icon: LayoutDashboard },
            { id: "about", label: "About Me", icon: User },
            { id: "services", label: "Services", icon: Briefcase },
            { id: "tech-stack", label: "Tech Stack", icon: Zap },
            { id: "typography", label: "Typography", icon: Type },
            { id: "work", label: "Case Studies", icon: FolderOpen },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "process", label: "Process", icon: CheckCircle2 },
            { id: "footer", label: "Footer Settings", icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
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
      <main className="flex-1 min-h-0 h-full overflow-y-auto pt-8 md:pt-12 pb-20 px-4 md:px-12" data-lenis-prevent>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h1 className="font-syne font-black text-3xl text-white capitalize">{activeTab.replace("-", " ")}</h1>
            {message && (
              <div className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-4 duration-300 ${
                message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              }`}>
                {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}
          </div>

          {/* Instant Mobile Tab Navigation (Horizontal Slider) */}
          <div className="md:hidden relative mb-6 border-b border-border/50 pb-4">
            <button 
              onClick={() => document.getElementById('mobile-tab-slider')?.scrollBy({ left: -200, behavior: 'smooth' })}
              className="absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-background via-background/90 to-transparent z-10 flex items-center justify-start text-text-muted hover:text-white pointer-events-auto"
            >
              <div className="rotate-180 flex items-center justify-center -ml-1"><ChevronRight className="w-5 h-5" /></div>
            </button>
            
            <div 
              id="mobile-tab-slider"
              className="flex overflow-x-auto gap-2 px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x scroll-smooth relative z-0"
            >
              {[
                { id: "general", label: "General" },
                { id: "hero", label: "Hero" },
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "tech-stack", label: "Tech Stack" },
                { id: "typography", label: "Typography" },
                { id: "work", label: "Case Studies" },
                { id: "testimonials", label: "Testimonials" },
                { id: "process", label: "Process" },
                { id: "footer", label: "Footer" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const el = document.getElementById(`tab-${tab.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                  className={`snap-start flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    activeTab === tab.id 
                    ? "bg-accent/10 border-accent/40 text-accent" 
                    : "bg-surface-2 border-border text-text-secondary hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('mobile-tab-slider')?.scrollBy({ left: 200, behavior: 'smooth' })}
              className="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-background via-background/90 to-transparent z-10 flex items-center justify-end text-text-muted hover:text-white pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5 -mr-1" />
            </button>
          </div>

          {/* Quick Info & Save FAB on Mobile */}
          <div className="md:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={handleSave}
              disabled={saving}
              className="h-14 w-14 rounded-full flex items-center justify-center bg-accent text-white shadow-[0_8px_30px_rgb(255,95,86,0.3)] transition-transform active:scale-90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            </button>
          </div>

          <div className="space-y-8 bg-surface border border-border rounded-2xl p-4 md:p-8 shadow-xl">
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* TECH STACK SECTION */}
            {activeTab === "tech-stack" && content.techStack && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Section Title</label>
                    <input 
                      type="text" 
                      value={content.techStack.title}
                      onChange={(e) => setContent({ ...content, techStack: { ...content.techStack, title: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Section Subtitle</label>
                    <input 
                      type="text" 
                      value={content.techStack.subtitle}
                      onChange={(e) => setContent({ ...content, techStack: { ...content.techStack, subtitle: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Orbital Technologies</label>
                    <button
                      onClick={() => {
                        const newIcons = [...content.techStack.icons];
                        const nextId = Math.max(0, ...newIcons.map(i => i.id)) + 1;
                        newIcons.push({ id: nextId, name: "New Tech", src: "/icons/placeholder.svg" });
                        setContent({ ...content, techStack: { ...content.techStack, icons: newIcons } });
                      }}
                      className="flex items-center gap-2 text-accent hover:text-accent-light text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Technology
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.techStack.icons.map((icon: any, idx: number) => (
                      <div key={idx} className="group p-4 bg-surface-2 border border-border rounded-2xl flex items-center gap-4 hover:border-accent/30 transition-all duration-300">
                        <div className="relative w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden shrink-0">
                          {uploadingIndex === idx ? (
                             <Loader2 className="w-5 h-5 text-accent animate-spin" />
                          ) : (
                            <img src={icon.src} alt={icon.name} className="w-6 h-6 object-contain" />
                          )}
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300">
                             <Upload className="w-4 h-4 text-white" />
                             <input 
                               type="file" 
                               className="hidden" 
                               accept=".svg,.png,.jpg,.jpeg,.webp"
                               onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) handleTechStackIconUpload(file, idx);
                               }}
                             />
                          </label>
                        </div>

                        <div className="flex-1 min-w-0">
                          <input 
                            type="text" 
                            value={icon.name}
                            onChange={(e) => {
                              const newIcons = [...content.techStack.icons];
                              newIcons[idx].name = e.target.value;
                              setContent({ ...content, techStack: { ...content.techStack, icons: newIcons } });
                            }}
                            className="w-full bg-transparent border-none text-white font-bold text-sm p-0 focus:ring-0 outline-none"
                            placeholder="Technology Name"
                          />
                          <p className="text-[9px] text-text-muted truncate mt-1">{icon.src}</p>
                        </div>

                        <button
                          onClick={() => {
                            const newIcons = content.techStack.icons.filter((_: any, i: number) => i !== idx);
                            setContent({ ...content, techStack: { ...content.techStack, icons: newIcons } });
                          }}
                          className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
            
            {/* TYPOGRAPHY SECTION */}
            {activeTab === "typography" && content.typography && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
                  <p className="text-xs text-accent font-medium leading-relaxed">
                    Adjust the global font settings for your portfolio. Changes here affect all pages and components instantly after saving.
                  </p>
                </div>

                {/* Font Scaling */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Base Font Size</label>
                    <span className="text-xs font-mono text-accent">{content.typography.baseFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="14" 
                    max="22" 
                    step="0.5"
                    value={content.typography.baseFontSize}
                    onChange={(e) => setContent({ ...content, typography: { ...content.typography, baseFontSize: parseFloat(e.target.value) } })}
                    className="w-full h-1.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Small (14px)</span>
                    <span>Professional (16px)</span>
                    <span>Highly Readable (22px)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                  {/* Heading Font */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Heading Font Family</label>
                    <select 
                      value={content.typography.headingFont}
                      onChange={(e) => setContent({ ...content, typography: { ...content.typography, headingFont: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40 cursor-pointer"
                    >
                      <option value="Syne">Syne (Modern & Bold)</option>
                      <option value="Inter">Inter (Clean & Professional)</option>
                      <option value="Unbounded">Unbounded (Premium & Wide)</option>
                    </select>
                    <p className="text-[10px] text-text-muted italic">Used for H1 to H6 titles and section headers.</p>
                  </div>

                  {/* Body Font */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Body Font Family</label>
                    <select 
                      value={content.typography.bodyFont}
                      onChange={(e) => setContent({ ...content, typography: { ...content.typography, bodyFont: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40 cursor-pointer"
                    >
                      <option value="Inter">Inter (Standard readability)</option>
                      <option value="Syne">Syne (Stylish content)</option>
                      <option value="Fira Code">Fira Code (Technical / Developer)</option>
                    </select>
                    <p className="text-[10px] text-text-muted italic">Used for paragraphs, stats, and small text.</p>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="mt-8 p-6 bg-background rounded-2xl border border-border space-y-4 overflow-hidden">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Live Preview</p>
                  <div style={{ fontSize: `${content.typography.baseFontSize}px` }}>
                    <h2 style={{ fontFamily: `var(--font-${content.typography.headingFont.toLowerCase().replace(/ /g, '-')}), sans-serif` }} className="text-2xl font-black text-white mb-2">
                       The quick brown fox jumps over the lazy dog
                    </h2>
                    <p style={{ fontFamily: `var(--font-${content.typography.bodyFont.toLowerCase().replace(/ /g, '-')}), sans-serif` }} className="text-text-secondary leading-relaxed">
                      This is how your body text will look at {content.typography.baseFontSize}px. It's clean, professional, and optimized for digital readability across all devices.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* WORK / CASE STUDIES SECTION */}
            {activeTab === "work" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-text-muted">Manage your portfolio projects and case studies.</p>
                    <p className="text-[10px] text-text-muted/60 mt-1">{content.projects?.length || 0} project{(content.projects?.length || 0) !== 1 ? 's' : ''} total</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newProject = {
                        slug: "new-project-" + Date.now(),
                        title: "New Project",
                        category: "Web Development",
                        year: new Date().getFullYear().toString(),
                        description: "Short description for card",
                        longDescription: "Detailed case study description...",
                        image: "/projects/placeholder.jpg",
                        liveUrl: "#",
                        stats: [],
                        tags: [],
                        problem: "",
                        solution: "",
                        process: [],
                        results: [],
                        mockupColor: "from-amber-900 to-stone-900"
                      };
                      const newProjects = [newProject, ...(content.projects || [])];
                      setContent({ ...content, projects: newProjects });
                      setEditingProject(0);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-accent/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add New Project
                  </button>
                </div>

                {/* Project List */}
                <div className="space-y-3">
                  {(!content.projects || content.projects.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <FolderOpen className="w-12 h-12 text-text-muted/30 mb-4" />
                      <p className="text-sm text-text-muted">No projects yet</p>
                      <p className="text-[10px] text-text-muted/60 mt-1">Click "Add New Project" to create your first case study.</p>
                    </div>
                  )}

                  {content.projects?.map((project: any, i: number) => {
                    const isEditing = editingProject === i;
                    return (
                      <div key={`project-${i}-${project.slug}`} className="border border-border rounded-2xl overflow-hidden bg-surface-2 transition-all">
                        {/* List Row — always visible */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                          {/* Thumbnail + Info (Clickable to Expand) */}
                          <div 
                            className="flex flex-1 items-center gap-4 cursor-pointer min-w-0" 
                            onClick={() => setEditingProject(isEditing ? null : i)}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-border bg-background shrink-0">
                               {project.image && project.image !== "/projects/placeholder.jpg" ? (
                                 <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center">
                                   <ImageIcon className="w-5 h-5 text-text-muted/30" />
                                 </div>
                               )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{project.title || 'Untitled Project'}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">{project.category}</span>
                                <span className="text-text-muted/30">·</span>
                                <span className="text-[10px] text-text-muted">{project.year}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 pt-3 mt-1 sm:pt-0 sm:mt-0 border-t border-border/50 sm:border-0 shrink-0 w-full sm:w-auto">
                            {project.liveUrl && project.liveUrl !== '#' && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent transition-colors" onClick={(e) => e.stopPropagation()}>
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingProject(isEditing ? null : i); }}
                              className={`p-2 rounded-lg transition-colors ${isEditing ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-white'}`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {deletingIndex === i ? (
                              <div className="flex bg-red-500/10 rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault(); e.stopPropagation();
                                    const newProjects = [...content.projects];
                                    newProjects.splice(i, 1);
                                    const newContent = { ...content, projects: newProjects };
                                    setContent(newContent);
                                    setEditingProject(null);
                                    setDeletingIndex(null);
                                    
                                    // Auto-save the deletion immediately
                                    setSaving(true);
                                    fetch("/api/admin/content", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify(newContent),
                                    }).then(res => {
                                      setSaving(false);
                                      if (res.ok) setMessage({ type: "success", text: "Project deleted permanently." });
                                      else setMessage({ type: "error", text: "Error saving deletion." });
                                    });
                                  }}
                                  className="px-3 h-10 flex items-center justify-center text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDeletingIndex(null); }}
                                  className="px-3 h-10 flex items-center justify-center text-xs font-bold text-text-muted hover:bg-white/10 hover:text-white transition-colors border-l border-white/5"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault(); e.stopPropagation();
                                  setDeletingIndex(i);
                                }}
                                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4 pointer-events-none" />
                              </button>
                            )}
                            <div className={`transition-transform duration-200 ${isEditing ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-4 h-4 text-text-muted" />
                            </div>
                          </div>
                        </div>

                        {/* Expanded Editor */}
                        {isEditing && (
                          <div className="border-t border-border p-6 space-y-6 bg-background/50">
                            {/* Row 1: Title, Slug, Category, Year */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="col-span-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Project Title</label>
                                <input type="text" value={project.title} onChange={(e) => { const p = [...content.projects]; p[i].title = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" placeholder="Project Name" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Category</label>
                                <input type="text" value={project.category} onChange={(e) => { const p = [...content.projects]; p[i].category = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Year</label>
                                <input type="text" value={project.year} onChange={(e) => { const p = [...content.projects]; p[i].year = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                            </div>

                            {/* Row 2: Slug + Live URL */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">URL Slug</label>
                                <input type="text" value={project.slug} onChange={(e) => { const p = [...content.projects]; p[i].slug = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none focus:border-accent/40" placeholder="project-slug-here" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5 flex items-center gap-1.5">Live Website Link <ExternalLink className="w-2.5 h-2.5" /></label>
                                <input type="text" value={project.liveUrl || ''} onChange={(e) => { const p = [...content.projects]; p[i].liveUrl = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-accent/40" placeholder="https://..." />
                              </div>
                            </div>

                            {/* Row 3: Image Upload */}
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Project Image</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Preview */}
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border bg-surface-2">
                                  {project.image && project.image !== "/projects/placeholder.jpg" ? (
                                    <>
                                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                      <span className="absolute bottom-2 left-3 text-[10px] text-white/70 font-mono">{project.image}</span>
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                      <ImageIcon className="w-8 h-8 text-text-muted/20 mb-2" />
                                      <span className="text-[10px] text-text-muted/40">No image set</span>
                                    </div>
                                  )}
                                </div>
                                {/* Upload + Manual */}
                                <div className="space-y-3">
                                  <div 
                                    className="relative flex items-center gap-3 p-4 bg-surface-2 border-2 border-dashed border-border hover:border-accent/40 rounded-xl cursor-pointer transition-colors group h-[72px]"
                                    onClick={() => { const input = document.getElementById(`upload-${i}`) as HTMLInputElement; input?.click(); }}
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const file = e.dataTransfer.files?.[0]; if (file) handleImageUpload(file, i); }}
                                  >
                                    <input id={`upload-${i}`} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, i); e.target.value = ''; }} />
                                    {uploadingIndex === i ? (
                                      <><Loader2 className="w-5 h-5 text-accent animate-spin shrink-0" /><span className="text-xs text-text-muted">Uploading...</span></>
                                    ) : (
                                      <><div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"><Upload className="w-4 h-4 text-accent" /></div><div><p className="text-xs font-medium text-white">Click to upload or drag & drop</p><p className="text-[10px] text-text-muted">JPG, PNG, WebP, AVIF, GIF — Max 5MB</p></div></>
                                    )}
                                  </div>
                                  <input type="text" value={project.image} onChange={(e) => { const p = [...content.projects]; p[i].image = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-white text-[11px] font-mono outline-none focus:border-accent/40" placeholder="Or enter path manually: /projects/filename.jpg" />
                                </div>
                              </div>
                            </div>

                            {/* Row 3b: Screenshot Upload */}
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Case Study Screenshot (shown on detail page)</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Screenshot Preview */}
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border bg-surface-2">
                                  {project.screenshot ? (
                                    <>
                                      <img src={project.screenshot} alt="Screenshot" className="w-full h-full object-cover object-top" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                      <span className="absolute bottom-2 left-3 text-[10px] text-white/70 font-mono">{project.screenshot}</span>
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                      <ImageIcon className="w-8 h-8 text-text-muted/20 mb-2" />
                                      <span className="text-[10px] text-text-muted/40">No screenshot set</span>
                                    </div>
                                  )}
                                </div>
                                {/* Screenshot Upload + Manual */}
                                <div className="space-y-3">
                                  <div 
                                    className="relative flex items-center gap-3 p-4 bg-surface-2 border-2 border-dashed border-border hover:border-accent/40 rounded-xl cursor-pointer transition-colors group h-[72px]"
                                    onClick={() => { const input = document.getElementById(`screenshot-${i}`) as HTMLInputElement; input?.click(); }}
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDrop={(e) => {
                                      e.preventDefault(); e.stopPropagation();
                                      const file = e.dataTransfer.files?.[0];
                                      if (file) handleScreenshotUpload(file, i);
                                    }}
                                  >
                                    <input id={`screenshot-${i}`} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleScreenshotUpload(file, i);
                                      e.target.value = '';
                                    }} />
                                    {uploadingScreenshot === i ? (
                                      <><Loader2 className="w-5 h-5 text-accent animate-spin shrink-0" /><span className="text-xs text-text-muted">Uploading...</span></>
                                    ) : (
                                      <><div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"><Upload className="w-4 h-4 text-accent" /></div><div><p className="text-xs font-medium text-white">Upload screenshot</p><p className="text-[10px] text-text-muted">Website screenshot for case study page</p></div></>
                                    )}
                                  </div>
                                  <input type="text" value={project.screenshot || ''} onChange={(e) => { const p = [...content.projects]; p[i].screenshot = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-white text-[11px] font-mono outline-none focus:border-accent/40" placeholder="Or enter path: /projects/screenshot.jpg" />
                                </div>
                              </div>
                            </div>

                            {/* Row 4: Descriptions */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Card Description (Short)</label>
                                <textarea rows={2} value={project.description} onChange={(e) => { const p = [...content.projects]; p[i].description = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-accent/40 resize-none" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Detailed Case Study Description</label>
                                <textarea rows={4} value={project.longDescription} onChange={(e) => { const p = [...content.projects]; p[i].longDescription = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-accent/40 resize-none" />
                              </div>
                            </div>

                            {/* Row 5: Stats */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Stats / Key Metrics</label>
                                <button onClick={() => { const p = [...content.projects]; p[i].stats = [...(p[i].stats || []), { value: "+0%", label: "New Metric" }]; setContent({ ...content, projects: p }); }} className="text-[10px] text-accent hover:text-accent-light font-bold flex items-center gap-1 transition-colors"><Plus className="w-3 h-3" /> Add Stat</button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {(project.stats || []).map((stat: any, si: number) => (
                                  <div key={si} className="relative p-3 bg-surface-2 border border-border rounded-xl space-y-2 group/stat">
                                    <button onClick={() => { const p = [...content.projects]; p[i].stats = p[i].stats.filter((_: any, idx: number) => idx !== si); setContent({ ...content, projects: p }); }} className="absolute top-2 right-2 text-text-muted/30 hover:text-red-400 opacity-0 group-hover/stat:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button>
                                    <input type="text" value={stat.value} onChange={(e) => { const p = [...content.projects]; p[i].stats[si].value = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-transparent text-center text-accent font-syne font-black text-lg outline-none" placeholder="+340%" />
                                    <input type="text" value={stat.label} onChange={(e) => { const p = [...content.projects]; p[i].stats[si].label = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-transparent text-center text-[10px] text-text-muted outline-none" placeholder="Metric Label" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Row 6: Tags / Technologies */}
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Technologies / Tags (comma separated)</label>
                              <input type="text" value={(project.tags || []).join(", ")} onChange={(e) => { const p = [...content.projects]; p[i].tags = e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean); setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-accent/40" placeholder="WordPress, React, Figma..." />
                              {(project.tags || []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {project.tags.map((tag: string) => (
                                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-surface border border-border text-text-secondary text-[10px]">{tag}</span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Row 7: Problem & Solution */}
                            <div className="space-y-4 pt-4 border-t border-border/50">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Case Study Narrative</p>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">The Problem</label>
                                <textarea rows={3} value={project.problem || ""} onChange={(e) => { const p = [...content.projects]; p[i].problem = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-accent/40 resize-none" placeholder="What challenge did the client face?" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">The Solution</label>
                                <textarea rows={3} value={project.solution || ""} onChange={(e) => { const p = [...content.projects]; p[i].solution = e.target.value; setContent({ ...content, projects: p }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-accent/40 resize-none" placeholder="How did you solve it?" />
                              </div>
                            </div>

                            {/* Row 8: Process Steps */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Process Steps</label>
                                <button onClick={() => { const p = [...content.projects]; p[i].process = [...(p[i].process || []), "New Step"]; setContent({ ...content, projects: p }); }} className="text-[10px] text-accent hover:text-accent-light font-bold flex items-center gap-1 transition-colors"><Plus className="w-3 h-3" /> Add Step</button>
                              </div>
                              <div className="space-y-2">
                                {(project.process || []).map((step: string, si: number) => (
                                  <div key={si} className="flex items-center gap-3 group/step">
                                    <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] flex items-center justify-center font-bold shrink-0">{si + 1}</span>
                                    <input type="text" value={step} onChange={(e) => { const p = [...content.projects]; p[i].process[si] = e.target.value; setContent({ ...content, projects: p }); }} className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent/40" />
                                    <button onClick={() => { const p = [...content.projects]; p[i].process = p[i].process.filter((_: any, idx: number) => idx !== si); setContent({ ...content, projects: p }); }} className="text-text-muted/30 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition-opacity shrink-0"><Trash2 className="w-3 h-3" /></button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Row 9: Results */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Results / Achievements</label>
                                <button onClick={() => { const p = [...content.projects]; p[i].results = [...(p[i].results || []), "New result..."]; setContent({ ...content, projects: p }); }} className="text-[10px] text-accent hover:text-accent-light font-bold flex items-center gap-1 transition-colors"><Plus className="w-3 h-3" /> Add Result</button>
                              </div>
                              <div className="space-y-2">
                                {(project.results || []).map((result: string, ri: number) => (
                                  <div key={ri} className="flex items-center gap-3 group/result">
                                    <CheckCircle2 className="w-4 h-4 text-accent/40 shrink-0" />
                                    <input type="text" value={result} onChange={(e) => { const p = [...content.projects]; p[i].results[ri] = e.target.value; setContent({ ...content, projects: p }); }} className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent/40" />
                                    <button onClick={() => { const p = [...content.projects]; p[i].results = p[i].results.filter((_: any, idx: number) => idx !== ri); setContent({ ...content, projects: p }); }} className="text-text-muted/30 hover:text-red-400 opacity-0 group-hover/result:opacity-100 transition-opacity shrink-0"><Trash2 className="w-3 h-3" /></button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Collapse button */}
                            <div className="flex justify-end pt-2">
                              <button onClick={() => setEditingProject(null)} className="text-xs text-text-muted hover:text-white transition-colors flex items-center gap-1.5">
                                <ChevronDown className="w-3 h-3 rotate-180" /> Collapse
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GENERAL SECTION */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted">Social Media Links</label>
                    <button 
                      onClick={() => {
                        const newSocials = [...(content.general.socialLinks || [])];
                        newSocials.push({ platform: "Social", href: "#", icon: "Globe" });
                        setContent({ ...content, general: { ...content.general, socialLinks: newSocials } });
                      }}
                      className="text-[10px] text-accent hover:text-accent-light font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Link
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {(content.general.socialLinks || []).map((social: any, i: number) => (
                      <div key={i} className="flex gap-4 p-4 bg-surface-2 border border-border rounded-xl items-center group/social">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <label className="block text-[8px] uppercase tracking-tighter text-text-muted mb-1">Platform</label>
                            <input 
                              type="text" 
                              value={social.platform}
                              onChange={(e) => {
                                const newSocials = [...content.general.socialLinks];
                                newSocials[i].platform = e.target.value;
                                setContent({ ...content, general: { ...content.general, socialLinks: newSocials } });
                              }}
                              className="bg-transparent text-sm font-bold text-white outline-none w-full"
                              placeholder="e.g. Twitter"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <label className="block text-[8px] uppercase tracking-tighter text-text-muted mb-1">URL / Link</label>
                            <input 
                              type="text" 
                              value={social.href}
                              onChange={(e) => {
                                const newSocials = [...content.general.socialLinks];
                                newSocials[i].href = e.target.value;
                                setContent({ ...content, general: { ...content.general, socialLinks: newSocials } });
                              }}
                              className="bg-transparent text-xs text-text-secondary outline-none w-full"
                              placeholder="https://..."
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-[8px] uppercase tracking-tighter text-text-muted mb-1">Icon</label>
                            <select 
                              value={social.icon || "ExternalLink"}
                              onChange={(e) => {
                                const newSocials = [...content.general.socialLinks];
                                newSocials[i].icon = e.target.value;
                                setContent({ ...content, general: { ...content.general, socialLinks: newSocials } });
                              }}
                              className="bg-surface-2 border border-border rounded px-2 py-1 text-[10px] text-white outline-none w-full cursor-pointer hover:border-accent/40"
                            >
                              <option value="Twitter">Twitter</option>
                              <option value="Facebook">Facebook</option>
                              <option value="Github">Github</option>
                              <option value="Linkedin">Linkedin</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Youtube">Youtube</option>
                              <option value="Globe">Globe</option>
                              <option value="Send">Send</option>
                              <option value="Mail">Mail</option>
                              <option value="Phone">Phone</option>
                              <option value="ExternalLink">ExternalLink</option>
                            </select>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            const newSocials = content.general.socialLinks.filter((_: any, idx: number) => idx !== i);
                            setContent({ ...content, general: { ...content.general, socialLinks: newSocials } });
                          }}
                          className="text-text-muted hover:text-red-400 opacity-0 group-hover/social:opacity-100 transition-opacity pt-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FOOTER SECTION */}
            {activeTab === "footer" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Footer Branding Text</label>
                    <input 
                      type="text" 
                      value={content.footer.logoText}
                      onChange={(e) => setContent({ ...content, footer: { ...content.footer, logoText: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Copyright Line</label>
                    <input 
                      type="text" 
                      value={content.footer.copyrightText}
                      onChange={(e) => setContent({ ...content, footer: { ...content.footer, copyrightText: e.target.value } })}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Short About Description</label>
                  <textarea 
                    rows={3}
                    value={content.footer.description}
                    onChange={(e) => setContent({ ...content, footer: { ...content.footer, description: e.target.value } })}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-muted font-bold">Menu Links</label>
                    <button 
                      onClick={() => {
                        const newLinks = [...(content.footer.links || [])];
                        newLinks.push({ label: "New Link", href: "/" });
                        setContent({ ...content, footer: { ...content.footer, links: newLinks } });
                      }}
                      className="text-[10px] text-accent hover:text-accent-light font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Link
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(content.footer.links || []).map((link: any, i: number) => (
                      <div key={i} className="flex gap-4 p-3 bg-surface-2 border border-border rounded-xl items-center group/link">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...content.footer.links];
                              newLinks[i].label = e.target.value;
                              setContent({ ...content, footer: { ...content.footer, links: newLinks } });
                            }}
                            className="bg-transparent text-sm font-bold text-white outline-none"
                            placeholder="Link Label"
                          />
                          <input 
                            type="text" 
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...content.footer.links];
                              newLinks[i].href = e.target.value;
                              setContent({ ...content, footer: { ...content.footer, links: newLinks } });
                            }}
                            className="bg-transparent text-xs text-text-secondary outline-none"
                            placeholder="URL: /#work"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newLinks = content.footer.links.filter((_: any, idx: number) => idx !== i);
                            setContent({ ...content, footer: { ...content.footer, links: newLinks } });
                          }}
                          className="text-text-muted hover:text-red-400 opacity-0 group-hover/link:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIALS SECTION */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const newTestimonials = [...(content.testimonials || [])];
                      newTestimonials.unshift({
                        name: "New Client",
                        role: "Client Title",
                        content: "Enter the review here...",
                        rating: 5,
                        avatar: "X",
                        result: "Happy Client"
                      });
                      setContent({ ...content, testimonials: newTestimonials });
                      setEditingTestimonial(0);
                    }}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Testimonial
                  </button>
                </div>

                <div className="space-y-3">
                  {(!content.testimonials || content.testimonials.length === 0) && (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl">
                      <MessageSquare className="w-8 h-8 text-text-muted/30 mx-auto mb-3" />
                      <p className="text-sm font-medium text-text-secondary">No testimonials configured yet</p>
                    </div>
                  )}

                  {content.testimonials?.map((t: any, i: number) => {
                    const isEditing = editingTestimonial === i;
                    return (
                      <div key={`test-${i}-${t.name}`} className="border border-border rounded-2xl overflow-hidden bg-surface-2 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                          <div 
                            className="flex flex-1 items-center gap-4 cursor-pointer min-w-0 w-full" 
                            onClick={() => setEditingTestimonial(isEditing ? null : i)}
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-background shrink-0 flex items-center justify-center font-bold text-accent text-lg">
                               {t.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{t.name || 'Anonymous'}</h4>
                              <p className="text-[10px] text-text-muted mt-0.5">{t.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-2 pt-3 mt-1 sm:pt-0 sm:mt-0 border-t border-border/50 sm:border-0 shrink-0 w-full sm:w-auto">
                            {deletingTestimonialIndex === i ? (
                              <div className="flex bg-red-500/10 rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault(); e.stopPropagation();
                                    const newTestis = [...content.testimonials];
                                    newTestis.splice(i, 1);
                                    const newContent = { ...content, testimonials: newTestis };
                                    setContent(newContent);
                                    setEditingTestimonial(null);
                                    setDeletingTestimonialIndex(null);
                                    
                                    // Auto-save the deletion immediately
                                    setSaving(true);
                                    fetch("/api/admin/content", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify(newContent),
                                    }).then(res => {
                                      setSaving(false);
                                      if (res.ok) setMessage({ type: "success", text: "Testimonial deleted permanently." });
                                      else setMessage({ type: "error", text: "Error saving deletion." });
                                    });
                                  }}
                                  className="px-3 h-10 flex items-center justify-center text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDeletingTestimonialIndex(null); }}
                                  className="px-3 h-10 flex items-center justify-center text-xs font-bold text-text-muted hover:bg-white/10 hover:text-white transition-colors border-l border-white/5"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault(); e.stopPropagation();
                                  setDeletingTestimonialIndex(i);
                                }}
                                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4 pointer-events-none" />
                              </button>
                            )}
                            <div className={`transition-transform duration-200 ${isEditing ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-4 h-4 text-text-muted" />
                            </div>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="border-t border-border p-6 space-y-6 bg-background/50">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="col-span-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Client Name</label>
                                <input type="text" value={t.name} onChange={(e) => { const nt = [...content.testimonials]; nt[i].name = e.target.value; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Role / Location</label>
                                <input type="text" value={t.role} onChange={(e) => { const nt = [...content.testimonials]; nt[i].role = e.target.value; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Result Badge</label>
                                <input type="text" value={t.result} onChange={(e) => { const nt = [...content.testimonials]; nt[i].result = e.target.value; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Avatar Initials</label>
                                <input type="text" value={t.avatar} onChange={(e) => { const nt = [...content.testimonials]; nt[i].avatar = e.target.value; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" maxLength={2} />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Star Rating (1-5)</label>
                                <input type="number" min="1" max="5" value={t.rating} onChange={(e) => { const nt = [...content.testimonials]; nt[i].rating = parseInt(e.target.value) || 5; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/40" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Review Content</label>
                              <textarea rows={4} value={t.content} onChange={(e) => { const nt = [...content.testimonials]; nt[i].content = e.target.value; setContent({ ...content, testimonials: nt }); }} className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-accent/40 resize-none" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
