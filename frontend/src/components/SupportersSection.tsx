import React, { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  Landmark,
  Sparkles,
  GraduationCap,
  Handshake,
  ArrowRight,
  ShieldCheck,
  Check,
} from "./ui/Icons";

interface Supporter {
  id: string;
  index: string;
  name: string;
  type: string;
  contribution: string;
  impactBadge: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const supportersList: Supporter[] = [
  {
    id: "lal-family",
    index: "01",
    name: "Lal Family Foundation",
    type: "Principal Philanthropic Benefactor",
    contribution:
      "Endowing direct student educational sponsorships, balanced mid-day meals, and permanent primary school facilities in Salangaon.",
    impactBadge: "Core Endowments · Student Nutrition",
    IconComponent: Landmark,
  },
  {
    id: "hema-mahindra",
    index: "02",
    name: "Hemchand Mahindra Foundation",
    type: "Key Institutional Sponsor",
    contribution:
      "Underwriting comprehensive child welfare programs, classroom learning resources, craft materials, and vocational workshops.",
    impactBadge: "Child Welfare · Vocational Skill Labs",
    IconComponent: Sparkles,
  },
  {
    id: "dsobs",
    index: "03",
    name: "Doon School Old Boys Society",
    type: "Honorary Patron Organization",
    contribution:
      "Providing merit scholarships, sports equipment, campus infrastructure, and continuous alumni mentorship.",
    impactBadge: "Merit Scholarships · Sports Mentorship",
    IconComponent: GraduationCap,
  },
  {
    id: "individual-patrons",
    index: "04",
    name: "Patrons & Global Benefactors",
    type: "Individual & Village Well-Wishers",
    contribution:
      "Funding library book acquisitions, seasonal winter uniform drives, healthcare camps, and classroom technology.",
    impactBadge: "Library Volumes · Uniform Drives",
    IconComponent: Handshake,
  },
];

const SupportersSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useGsapReveal<HTMLDivElement>({
    targets: [
      { selector: ".supporters-left", variant: "fadeUp", duration: 0.7 },
      { selector: ".supporters-right", variant: "fadeUp", duration: 0.8, delay: 0.15 },
    ],
    triggerStart: "top 90%",
  });

  return (
    <section
      id="supporters"
      ref={sectionRef}
      className="relative bg-[#1E2A44] text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle architectural ambient light */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[#E8B923]/6 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3" />

      {/* Thin gold top hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Asymmetric Split Layout: Left Anchor & Right Horizontal Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN (5 Cols): The Institutional Anchor & Pledge ── */}
          <div className="supporters-left lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#E8B923] uppercase">
                Chapter 07 · Patrons & Benefactors
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extralight tracking-tight text-white/90 leading-[1.15]">
                Sustaining generations of
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#E8B923] tracking-tight leading-[1.15]">
                rural young learners.
              </h2>
            </div>

            {/* Narrative description */}
            <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed font-light">
              Our school charges zero tuition. Every mid-day meal, uniform, book, and classroom facility is sustained through the enduring generosity of our institutional partners and global well-wishers.
            </p>

            {/* The Zero-Overhead Trust Guarantee Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8B923] text-[#1E2A44] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E8B923]">
                    100% Direct Student Aid
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    Zero Overhead Deductions
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-light">
                All educational sponsorships flow directly to student nutrition, classroom learning resources, uniforms, and specialized teacher salaries.
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#E8B923] text-[#1E2A44] font-bold text-xs hover:bg-amber-400 transition-all shadow-lg shadow-[#E8B923]/20 group"
                >
                  <span>Sponsor a Student</span>
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (7 Cols): The Clean Horizontal Ledger ── */}
          <div className="supporters-right lg:col-span-7 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {supportersList.map((sup) => {
              const Icon = sup.IconComponent;
              const isHovered = hoveredId === sup.id;

              return (
                <div
                  key={sup.id}
                  onMouseEnter={() => setHoveredId(sup.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative py-8 sm:py-9 px-4 sm:px-6 transition-all duration-300 ${
                    isHovered ? "bg-white/[0.04]" : "bg-transparent"
                  }`}
                >
                  {/* Left accent indicator on hover */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#E8B923] transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                    {/* Top Row: Index + Title */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#E8B923] font-bold tracking-widest">
                          [{sup.index}]
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 font-semibold">
                          {sup.type}
                        </span>
                      </div>

                      <h3
                        className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                          isHovered ? "text-amber-300" : "text-white"
                        }`}
                      >
                        {sup.name}
                      </h3>
                    </div>

                    {/* Icon pill */}
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isHovered
                          ? "bg-[#E8B923] border-[#E8B923] text-[#1E2A44]"
                          : "bg-white/5 border-white/10 text-white/60"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Contribution Statement */}
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mt-4 max-w-xl">
                    {sup.contribution}
                  </p>

                  {/* Key impact areas badge */}
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-[#E8B923] font-medium tracking-wide">
                    <Check size={13} className="shrink-0 text-emerald-400" />
                    <span>{sup.impactBadge}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportersSection;
