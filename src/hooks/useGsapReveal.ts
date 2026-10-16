import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export type AnimVariant =
  | "fadeUp"
  | "fadeDown"
  | "slideLeft"
  | "slideRight"
  | "fadeScale"
  | "fade";

export interface AnimTarget {
  selector: string;
  variant: AnimVariant;
  stagger?: number;       // seconds between each child element
  delay?: number;         // delay offset before this step
  duration?: number;      // animation duration (default: 0.6)
  distance?: number;      // travel distance in px (default: 45)
  sequenceOffset?: string | number; // timeline placement, e.g. "-=0.3" for smooth overlap
}

interface UseGsapRevealOptions {
  targets: AnimTarget[];
  triggerStart?: string;  // default "top 95%"
  triggerEnd?: string;    // default "bottom 10%"
  toggleActions?: string; // default "play none none none"
  scrub?: boolean | number;
}

function getFromVars(variant: AnimVariant, distance: number) {
  switch (variant) {
    case "slideLeft":
      return { x: -distance, opacity: 0 };
    case "slideRight":
      return { x: distance, opacity: 0 };
    case "fadeUp":
      return { y: distance, opacity: 0 };
    case "fadeDown":
      return { y: -distance, opacity: 0 };
    case "fadeScale":
      return { scale: 0.95, opacity: 0 };
    case "fade":
    default:
      return { opacity: 0 };
  }
}

/**
 * A GSAP ScrollTrigger timeline reveal hook optimized for both desktop and mobile.
 * On mobile screens, it triggers immediately as soon as the element touches the viewport (top 98%)
 * and completes snappily so users never see blank waiting areas.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>({
  targets,
  triggerStart = "top 95%",
  triggerEnd = "bottom 10%",
  toggleActions = "play none none none",
}: UseGsapRevealOptions) {
  const ref = useRef<T | null>(null);
  const targetsKey = JSON.stringify(targets);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // On mobile, trigger as soon as it reaches the screen edge so content doesn't lag
    const effectiveStart = isMobile ? "top 98%" : triggerStart;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: effectiveStart,
          end: triggerEnd,
          toggleActions,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      targets.forEach(
        (
          {
            selector,
            variant,
            stagger = 0.06,
            delay = 0,
            duration = 0.5,
            distance = 24,
            sequenceOffset,
          },
          idx
        ) => {
          const els = el.querySelectorAll(selector);
          if (!els.length) return;

          // On mobile, keep animations very brisk so scrolling feels instantaneous
          const animDuration = isMobile ? Math.min(duration, 0.35) : duration;
          const animDistance = isMobile ? Math.min(distance, 15) : distance;
          const animStagger = isMobile ? Math.min(stagger, 0.04) : stagger;
          const animDelay = isMobile ? 0 : delay;

          const pos =
            sequenceOffset !== undefined
              ? sequenceOffset
              : idx === 0
              ? animDelay > 0
                ? animDelay
                : 0
              : `-=${Math.max(0.08, animDuration * 0.45)}`;

          tl.fromTo(
            els,
            getFromVars(variant, animDistance),
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: animDuration,
              stagger: els.length > 1 ? animStagger : 0,
              clearProps: "all",
            },
            pos
          );
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetsKey, triggerStart, triggerEnd, toggleActions]);

  return ref;
}
