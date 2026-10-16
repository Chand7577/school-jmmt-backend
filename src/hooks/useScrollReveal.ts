import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean `isVisible`.
 * `isVisible` becomes true once the element scrolls into the viewport.
 * Stays true after first trigger (one-shot reveal).
 */
export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // one-shot
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
