import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[], defaultSection: string = "") {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    const observers = new Map<string, IntersectionObserver>();
    const visibilityMap = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibilityMap.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let visibleSection = "";

      visibilityMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          visibleSection = id;
        }
      });

      // Height of the entire page
      const scrollHeight = document.documentElement.scrollHeight;
      // How far we have scrolled down + viewport height
      const scrollPosition = window.innerHeight + window.scrollY;

      if (window.scrollY < 100) {
        // At the absolute top, force the first section
        setActiveSection(sectionIds[0]);
      } else if (scrollPosition >= scrollHeight - 100) {
        // At the absolute bottom, force the last section (avoids issues with short bottom sections)
        setActiveSection(sectionIds[sectionIds.length - 1]);
      } else if (maxRatio > 0) {
        // Otherwise use the most visible section
        setActiveSection(visibleSection);
      }
    };

    // Configuration optimized for reliable triggering
    // The negative root margin creates a "target zone" in the center of the screen
    const options = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Fine-grained tracking
    };

    const observer = new IntersectionObserver(observerCallback, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        // Initialize map with 0
        visibilityMap.set(id, 0);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeSection;
}
