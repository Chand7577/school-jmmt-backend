import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  index: string;
  number: string;
  suffix?: string;
  label: string;
  tag: string;
  description: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const stats: StatItem[] = [
  {
    id: "history",
    index: "01",
    number: "1985",
    label: "Year Founded",
    tag: "40+ Years of Service",
    description: "Four decades of providing free, enlightened primary education in rural Salangaon.",
    IconComponent: Landmark,
  },
  {
    id: "students",
    index: "02",
    number: "194",
    label: "Active Students",
    tag: "100% Tuition Free",
    description: "Equal educational opportunity, nutritious mid-day meals, and uniforms for every child.",
    IconComponent: GraduationCap,
  },
  {
    id: "teachers",
    index: "03",
    number: "14",
    label: "Dedicated Mentors",
    tag: "1:14 Attention Ratio",
    description: "Compassionate, qualified teachers fostering foundational knowledge and creative life skills.",
    IconComponent: Users,
  },
  {
    id: "books",
    index: "04",
    number: "2,500",
    suffix: "+",
    label: "Library Volumes",
    tag: "Curated Knowledge",
    description: "A rich collection of storybooks, reference materials, and interactive learning tools.",
    IconComponent: BookOpen,
  },
  {
    id: "achievers",
    index: "05",
    number: "50",
    suffix: "+",
    label: "Alumni Transitions",
    tag: "Secondary Excellence",
    description: "Graduates accepted into leading secondary institutions across Uttarakhand and beyond.",
    IconComponent: Trophy,
  },
];

/** Wraps useCountUp so each number animates smoothly once visible */
const AnimatedNumber = ({ value, enabled }: { value: string; enabled: boolean }) => {
  const display = useCountUp(value, 1600, enabled);
  return <>{display}</>;
};

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useGsapReveal<HTMLDivElement>({
    targets: [
      { selector: ".stats-header", variant: "fadeUp", duration: 0.7 },
      { selector: ".stats-grid", variant: "fadeUp", duration: 0.8, delay: 0.15 },
      { selector: ".stats-footer", variant: "fadeUp", duration: 0.6, delay: 0.3 },
    ],
    triggerStart: "top 90%",
  });

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative bg-[#FDFBF7] py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle background ambient warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#E8B923]/5 via-amber-100/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header: Editorial & Restrained */}
        <div className="stats-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="space-y-4 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#1E2A44] uppercase">
                Chapter 01 · Measurable Impact
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-[#1E2A44] leading-[1.15]">
              Four decades of quiet, <br className="hidden sm:inline" />
              <span className="font-black text-[#1E2A44]">
                meaningful <span className="text-[#E8B923]">progress.</span>
              </span>
            </h2>
          </div>

          {/* Subtext */}
          <div className="max-w-md lg:pb-1">
            <p className="text-sm sm:text-[15px] text-[#1E2A44]/70 leading-relaxed font-normal">
              At John Martyn Memorial School, every figure represents a child in
              Salangaon given the foundational education, dignity, and practical
              skills to shape their own future.
            </p>
          </div>
        </div>

        {/* Five-Metric Modular Grid */}
        <div className="stats-grid bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#1E2A44]/10">
            {stats.map((item, idx) => {
              const Icon = item.IconComponent;
              return (
                <div
                  key={item.id}
                  className={`group relative p-7 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-[#FDFBF7]/60 ${
                    idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Subtle hover accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-[#E8B923] transition-colors duration-300" />

                  {/* Top: Index & Icon */}
                  <div>
                    <div className="flex items-center justify-between text-[#1E2A44]/30 mb-8">
                      <span className="text-[11px] font-mono tracking-widest text-[#1E2A44]/40 font-bold">
                        {item.index}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44]/70 group-hover:text-[#1E2A44] group-hover:bg-[#E8B923]/15 transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Number */}
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#1E2A44] tracking-tight leading-none">
                        <AnimatedNumber value={item.number} enabled={isVisible} />
                      </span>
                      {item.suffix && (
                        <span className="text-2xl lg:text-3xl font-black text-[#E8B923]">
                          {item.suffix}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <h3 className="text-base font-bold text-[#1E2A44] mt-3 leading-snug">
                      {item.label}
                    </h3>

                    {/* Micro Tag */}
                    <p className="text-[11px] font-bold text-[#E8B923] uppercase tracking-wider mt-1">
                      {item.tag}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#1E2A44]/65 leading-relaxed mt-6 pt-5 border-t border-[#1E2A44]/5">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Footnote / Narrative Link */}
        <div className="stats-footer mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-xs text-[#1E2A44]/55 font-medium text-center sm:text-left">
            Founded in memory of John Martyn, former Headmaster of The Doon School.
          </p>
          <Link
            to="/about/history"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors group"
          >
            <span>Read our 40-year archive</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Stats;
