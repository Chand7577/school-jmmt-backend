import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` over `duration` ms
 * once `enabled` becomes true. Handles formatted numbers like "2,500".
 */
export function useCountUp(target: string, duration = 1800, enabled = false) {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Strip non-numeric characters for the raw number
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      frameRef.current = requestAnimationFrame(() => setDisplay(target));
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);

      // Re-apply original formatting (commas, suffix like +/%)
      const formatted = target.replace(/[0-9,]+/, current.toLocaleString());
      setDisplay(formatted);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target); // snap to exact final value
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, target, duration]);

  return display;
}
