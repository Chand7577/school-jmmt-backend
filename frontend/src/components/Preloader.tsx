import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "../lib/utils";
import jmmsBadge from "../assets/jmms-badge.svg";

export interface PreloaderProps {
  /**
   * Whether loading is active. If not provided, it will automatically run for `duration` ms.
   */
  loading?: boolean;
  /**
   * Visual variant: 'stairs' | 'percentage' | 'circle'
   */
  variant?: "stairs" | "percentage" | "circle";
  /**
   * Position of the preloader container
   */
  position?: "fixed" | "absolute";
  /**
   * Duration in ms of loading progress
   */
  duration?: number;
  /**
   * Main heading or text
   */
  loadingText?: string;
  /**
   * Subtitle text or tagline
   */
  subtitle?: string;
  /**
   * Z-index for overlay
   */
  zIndex?: number;
  /**
   * Background color override
   */
  bgColor?: string;
  /**
   * Additional text class
   */
  textClassName?: string;
  /**
   * Percentage position
   */
  percentagePosition?: "center" | "bottom";
  /**
   * Whether to show % sign
   */
  showPercentageSign?: boolean;
  /**
   * Custom percentage text class
   */
  percentageTextClassName?: string;
  /**
   * Show progress line
   */
  showProgressBar?: boolean;
  /**
   * Progress bar position
   */
  progressBarPosition?: "bottom" | "center";
  /**
   * Number of stair columns for stairs variant
   */
  stairCount?: number;
  /**
   * Direction stairs reveal from: 'left' | 'right'
   */
  stairsRevealFrom?: "left" | "right";
  /**
   * Direction stairs move when revealing: 'up' | 'down'
   */
  stairsRevealDirection?: "up" | "down";
  /**
   * Callback when loading animation completes and preloader unmounts/hides
   */
  onComplete?: () => void;
  /**
   * Callback when loading starts
   */
  onLoadingStart?: () => void;
  /**
   * Callback when progress reaches 100%
   */
  onLoadingComplete?: () => void;
  /**
   * Respect system reduced motion
   */
  respectReducedMotion?: boolean;
  /**
   * Fallback for reduced motion
   */
  reducedMotionFallback?: "fade" | "instant";
  /**
   * ARIA label for screen readers
   */
  ariaLabel?: string;
  /**
   * ARIA live region politeness level
   */
  ariaLive?: "polite" | "assertive" | "off";
  /**
   * Progress % (0-100) when text starts fading
   */
  textFadeThreshold?: number;
  /**
   * Backdrop blur in px
   */
  backdropBlur?: number;
  /**
   * Custom content render
   */
  customContent?: ((progress: number) => React.ReactNode) | React.ReactNode;
  /**
   * Additional classes
   */
  className?: string;
  /**
   * Children to wrap or render behind
   */
  children?: React.ReactNode;
}

export const Preloader: React.FC<PreloaderProps> = ({
  loading: controlledLoading,
  variant = "stairs",
  position = "fixed",
  duration = 2400,
  loadingText = "John Martyn Memorial School",
  subtitle = "Salangaon, Dehradun • Est. 1985",
  zIndex = 9999,
  bgColor = "#1E2A44",
  textClassName = "",
  percentagePosition = "center",
  showPercentageSign = true,
  percentageTextClassName = "",
  showProgressBar = true,
  stairCount = 8,
  stairsRevealFrom = "left",
  stairsRevealDirection = "up",
  onComplete,
  onLoadingStart,
  onLoadingComplete,
  respectReducedMotion = false,
  reducedMotionFallback = "fade",
  ariaLabel = "Loading John Martyn Memorial School",
  ariaLive = "polite",
  textFadeThreshold = 95,
  backdropBlur = 0,
  customContent,
  className = "",
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stairsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  const stairs = useMemo(() => Array.from({ length: stairCount }), [stairCount]);

  useEffect(() => {
    onLoadingStart?.();
    const startTime = performance.now();
    let animFrame: number;
    let completedTriggered = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const computedPct = Math.min(100, Math.round((elapsed / duration) * 100));
      const pct =
        controlledLoading === false
          ? 100
          : controlledLoading === true && computedPct >= 99
          ? 99
          : computedPct;

      setProgress(pct);

      if (pct >= 100 && !completedTriggered) {
        completedTriggered = true;
        onLoadingComplete?.();

        if (prefersReducedMotion && reducedMotionFallback === "instant") {
          setIsDone(true);
          onComplete?.();
          return;
        }

        // Brief dwell time (120ms) so user sees 100% and fully filled progress bar
        const exitTimeout = setTimeout(() => {
          // Trigger exit animation
          gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                setIsDone(true);
                onComplete?.();
              },
            });

            // 1. Fade out the text & branding
            if (contentRef.current) {
              tl.to(contentRef.current, {
                opacity: 0,
                y: -15,
                duration: 0.35,
                ease: "power2.inOut",
              });
            }

            // 2. Animate out the stairs or container
            if (variant === "stairs" && stairsRef.current.length > 0) {
              const validStairs = stairsRef.current.filter(Boolean);
              const orderedStairs =
                stairsRevealFrom === "right" ? [...validStairs].reverse() : validStairs;

              const yTarget = stairsRevealDirection === "down" ? "100%" : "-100%";

              tl.to(
                orderedStairs,
                {
                  y: yTarget,
                  duration: 0.6,
                  ease: "power4.inOut",
                  stagger: 0.04,
                },
                "-=0.15"
              );
            } else {
              tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.45,
                ease: "power2.inOut",
              });
            }
          }, containerRef);
        }, 120);

        return () => clearTimeout(exitTimeout);
      }

      if (pct < 100) {
        animFrame = requestAnimationFrame(tick);
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [
    controlledLoading,
    duration,
    variant,
    stairsRevealFrom,
    stairsRevealDirection,
    respectReducedMotion,
    reducedMotionFallback,
    onLoadingStart,
    onLoadingComplete,
    onComplete,
  ]);

  if (isDone) {
    return children ? <>{children}</> : null;
  }

  const isTextFading = progress >= textFadeThreshold;

  return (
    <>
      <div
        ref={containerRef}
        id={`preloader-${uniqueId}`}
        role="status"
        aria-live={ariaLive}
        aria-label={ariaLabel}
        className={cn(
          position === "fixed" ? "fixed inset-0" : "absolute inset-0",
          "w-full h-full select-none overflow-hidden flex flex-col items-center justify-center",
          className
        )}
        style={{
          zIndex,
          backdropFilter: backdropBlur > 0 ? `blur(${backdropBlur}px)` : undefined,
        }}
      >
        {/* Stairs Columns for stairs variant */}
        {variant === "stairs" ? (
          <div className="absolute inset-0 flex w-full h-full pointer-events-none">
            {stairs.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  stairsRef.current[i] = el;
                }}
                className="h-full flex-1 relative will-change-transform"
                style={{
                  backgroundColor: bgColor,
                  transform: "translateY(0%)",
                }}
              >
                {/* Subtle vertical border accent to accentuate the architectural stairs */}
                <div className="absolute inset-y-0 right-0 w-[1px] bg-white/[0.04]" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: bgColor }}
          />
        )}

        {/* Ambient subtle warm gold glow behind logo */}
        <div className="absolute w-96 h-96 rounded-full bg-[#E8B923]/10 blur-3xl pointer-events-none" />

        {/* Center Content / Brand Info */}
        <div
          ref={contentRef}
          className={cn(
            "relative z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300",
            isTextFading ? "opacity-30" : "opacity-100"
          )}
        >
          {customContent ? (
            typeof customContent === "function" ? (
              customContent(progress)
            ) : (
              customContent
            )
          ) : (
            <>
              {/* School Logo */}
              <div className="relative mb-6">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white/10 backdrop-blur-md p-3.5 sm:p-4 border border-white/20 shadow-2xl shadow-black/50 flex items-center justify-center">
                  <img
                    src={jmmsBadge}
                    alt="John Martyn Memorial School Logo"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                {/* Subtle pulse ring around logo */}
                <div className="absolute -inset-1.5 rounded-3xl border border-[#E8B923]/30 animate-pulse pointer-events-none" />
              </div>

              {/* Title & Subtitle */}
              <h1
                className={cn(
                  "font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug",
                  textClassName
                )}
              >
                {loadingText}
              </h1>

              {subtitle && (
                <p className="mt-2 text-xs sm:text-sm text-white/70 font-medium tracking-wide uppercase">
                  {subtitle}
                </p>
              )}

              {/* Circle variant animated ring */}
              {variant === "circle" && (
                <div className="relative w-28 h-28 my-6 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E8B923"
                      strokeWidth="6"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * progress) / 100}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-150 ease-out"
                    />
                  </svg>
                  <span className="absolute font-black text-xl text-white font-mono">
                    {progress}
                    {showPercentageSign && "%"}
                  </span>
                </div>
              )}

              {/* Percentage Counter (for stairs & percentage variants) */}
              {variant !== "circle" && percentagePosition === "center" && (
                <div className="mt-6 flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-baseline justify-center font-mono font-bold text-[#E8B923] text-4xl sm:text-5xl tracking-tighter",
                      percentageTextClassName
                    )}
                  >
                    <span>{progress}</span>
                    {showPercentageSign && (
                      <span className="text-xl sm:text-2xl ml-1 text-[#E8B923]/80">%</span>
                    )}
                  </div>

                  {/* Single Sleek horizontal progress line right below the numbers */}
                  {showProgressBar && (
                    <div className="w-52 sm:w-64 h-1.5 sm:h-2 mt-4 bg-white/10 rounded-full overflow-hidden border border-white/10 shadow-inner">
                      <div
                        ref={progressBarRef}
                        className="h-full rounded-full bg-gradient-to-r from-[#E8B923] via-[#FFE57F] to-[#E8B923] shadow-[0_0_12px_rgba(232,185,35,0.8)] will-change-[width]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Optional Percentage at Bottom Right */}
        {percentagePosition === "bottom" && (
          <div className="absolute bottom-4 right-6 z-30 font-mono text-sm sm:text-base font-bold text-[#E8B923]">
            {progress}
            {showPercentageSign && "%"}
          </div>
        )}
      </div>

      {/* Children revealed behind */}
      {children}
    </>
  );
};

export default Preloader;
