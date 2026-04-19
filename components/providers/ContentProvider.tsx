"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ContentContextType {
  content: any;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchContent() {
    try {
      const res = await fetch(`/api/admin/content?t=${Date.now()}`, {
        cache: 'no-store' // Ensure we get fresh data
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON but received ${contentType}`);
      }

      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("ContentProvider: Failed to fetch data", error);
      // Fallback or error state could be set here
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <ContentContext.Provider value={{ content, refresh: fetchContent }}>
      {/* Dynamic Typography Injection */}
      {content?.typography && (
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --base-font-size: ${content.typography.baseFontSize || 16}px;
            --font-heading: var(--font-${(content.typography.headingFont || 'Syne').toLowerCase().replace(/ /g, '-')});
            --font-body: var(--font-${(content.typography.bodyFont || 'Inter').toLowerCase().replace(/ /g, '-')});
            --font-accent: var(--font-${(content.typography.accentFont || 'Unbounded').toLowerCase().replace(/ /g, '-')});
          }
        `}} />
      )}
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
