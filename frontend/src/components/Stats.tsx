import React, { useState, useEffect } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  Landmark,
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  ArrowRight,
} from "./ui/Icons";

interface StatItem {
  id: string;
  number: string;
  suffix?: string;
  label: string;
  sublabel: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const stats: StatItem[] = [
  {
    id: "history",
    number: "1985",
    label: "Year of History",
    sublabel: "4+ Decades of Trust",
    IconComponent: Landmark,
  },
  {
    id: "students",
    number: "194",
    label: "Active Students",
    sublabel: "Rural Young Learners",
    IconComponent: GraduationCap,
  },
  {
    id: "teachers",
    number: "14",
    label: "Qualified Teachers",
    sublabel: "Empathy & Mentorship",
    IconComponent: Users,
  },
  {
    id: "books",
    number: "2,500",
    suffix: "+",
    label: "Library Books",
    sublabel: "Curated Knowledge",
    IconComponent: BookOpen,
  },
  {
    id: "achievers",
    number: "50",
    suffix: "+",
    label: "Success Achievers",
    sublabel: "Secondary Transition",
    IconComponent: Trophy,
  },
];

/** Wraps useCountUp so each number animates independently */
const AnimatedNumber = ({ value, enabled }: { value: string; enabled: boolean }) => {
  const display = useCountUp(value, 1600, enabled);
  return <>{display}</>;
};

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".stats-header", variant: "fadeUp", duration: 0.6 },
      { selector: ".stats-band", variant: "fadeUp", duration: 0.7, delay: 0.15 },
      { selector: ".stats-footnote", variant: "fadeUp", duration: 0.5, delay: 0.3 },
    ],
    triggerStart: "top 95%",
  });

  // Watch visibility for count-up numbers
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="pt-16 pb-6 lg:pt-24 lg:pb-8 bg-[#FDFBF7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Intro Paragraph */}
        <div className="stats-header text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2A44]/5 border border-[#1E2A44]/10 text-xs font-bold text-[#1E2A44] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span className="tracking-wide">CHAPTER 01 • MEASURABLE IMPACT SINCE 1985</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
            STRENGTH IN <span className="text-[#E8B923]">NUMBERS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1E2A44]/80 leading-relaxed font-medium">
            <strong className="text-[#1E2A44] font-semibold">Four Decades of Educational Service:</strong> Founded in 1985 to educate underprivileged children in rural Salangaon, John Martyn Memorial School has stood as an unwavering beacon of hope, values, and quality primary schooling for generations. Every statistic represents a child nurtured, a village household supported, and a brighter future built through grassroots dedication.
          </p>
        </div>
      </div>

      {/* Full-width Horizontal Stat Band (Dark Navy Background, Full-Bleed) */}
      <div className="stats-band w-full bg-[#1E2A44] text-white py-10 lg:py-12 shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 lg:gap-y-0 lg:divide-x lg:divide-white/15">
            {stats.map((item, index) => {
              const Icon = item.IconComponent;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 ${
                    index === 4 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 text-amber-300 mb-3">
                    <Icon size={18} />
                  </div>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                      <AnimatedNumber value={item.number} enabled={isVisible} />
                    </span>
                    {item.suffix && (
                      <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#E8B923]">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white/95 mt-2 tracking-wide">
                    {item.label}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {item.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Light inline text link under the strip (Replaces the heavy CTA banner) */}
      <div className="stats-footnote mt-8 text-center">
        <a
          href="#admissions"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors group focus:outline-none focus-visible:underline"
        >
          <span>Become Part of Our Story</span>
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </section>
  );
};

export default Stats;
