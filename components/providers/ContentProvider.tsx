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
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch content", error);
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
