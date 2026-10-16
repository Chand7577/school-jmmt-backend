import React, { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  Landmark,
  Sparkles,
  GraduationCap,
  Handshake,
  Heart,
  ArrowRight,
} from "./ui/Icons";

interface Supporter {
  id: string;
  name: string;
  type: string;
  contribution: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const supportersList: Supporter[] = [
  {
    id: "lal-family",
    name: "Lal Family Foundation",
    type: "Principal Philanthropic Benefactor",
    contribution:
      "Endowing student educational sponsorships, midday meals, and primary school facilities.",
    IconComponent: Landmark,
  },
  {
    id: "hema-mahindra",
    name: "Hemchand Mahindra Foundation",
    type: "Key Institutional Sponsor",
    contribution:
      "Supporting child welfare programs, educational materials, and skill workshops.",
    IconComponent: Sparkles,
  },
  {
    id: "dsobs",
    name: "Doon School Old Boys Society (DSOBS)",
    type: "Honorary Patron Organization",
    contribution:
      "Providing merit scholarships, sports equipment, and continuing alumni mentorship.",
    IconComponent: GraduationCap,
  },
  {
    id: "individual-patrons",
    name: "Patrons & Individual Benefactors",
    type: "Global & Village Well-Wishers",
    contribution:
      "Funding library book acquisitions, winter uniform drives, and classroom technology.",
    IconComponent: Handshake,
  },
];

const supportersTargets = [
  { selector: ".supporters-header", variant: "fadeUp" as const, duration: 0.6 },
  { selector: ".supporters-strip", variant: "fadeUp" as const, duration: 0.65, delay: 0.15 },
  { selector: ".supporters-cta", variant: "fadeUp" as const, duration: 0.6, delay: 0.3 },
];

const SupportersSection: React.FC = () => {
  const [activeSupporter, setActiveSupporter] = useState<string | null>(null);

  const sectionRef = useGsapReveal({
    targets: supportersTargets,
    triggerStart: "top 95%",
    toggleActions: "play none none none",
  });

  const selectedItem = supportersList.find((s) => s.id === activeSupporter);

  return (
    <section
      id="supporters"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#0f1b3d] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="supporters-header text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold tracking-wide mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span>CHAPTER 07 • PARTNERS IN CHILD UPLIFTMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            OUR <span className="text-[#E8B923]">SUPPORTERS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
            <strong className="text-white font-semibold">JMMS is supported by prominent organisations</strong>,{" "}
            providing sponsorships to our students and sustaining our mission to deliver free, high-quality primary education in rural Dehradun.
          </p>
        </div>

        {/* Quiet Understated Logo Strip */}
        <div className="supporters-strip max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center justify-center">
            {supportersList.map((sup) => {
              const Icon = sup.IconComponent;
              const isHovered = activeSupporter === sup.id;
              return (
                <button
                  key={sup.id}
                  onMouseEnter={() => setActiveSupporter(sup.id)}
                  onMouseLeave={() => setActiveSupporter(null)}
                  onClick={() =>
                    setActiveSupporter(isHovered ? null : sup.id)
                  }
                  onFocus={() => setActiveSupporter(sup.id)}
                  onBlur={() => setActiveSupporter(null)}
                  aria-expanded={isHovered}
                  className={`relative p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923] ${
                    isHovered
                      ? "bg-white/10 text-white scale-105 shadow-lg"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isHovered
                        ? "bg-[#E8B923] text-[#1E2A44]"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight leading-snug">
                    {sup.name}
                  </h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1 block">
                    {sup.type.split(" ")[0]} Partner
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Disclosure Bar (Reveals Sponsor Role & Contribution) */}
          <div className="mt-6 min-h-[64px] flex items-center justify-center">
            {selectedItem ? (
              <div className="w-full max-w-2xl bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-sm animate-fadeIn">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E8B923] block mb-1">
                  {selectedItem.type}
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  {selectedItem.contribution}
                </p>
              </div>
            ) : (
              <p className="text-xs text-white/40 italic text-center">
                Hover or tap any partner to view their contribution to Salangaon students
              </p>
            )}
          </div>
        </div>

        {/* Signature Closing CTA Banner (The ONE signature banner preserved per Global Change #4) */}
        <div className="supporters-cta mt-14 max-w-5xl mx-auto bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#E8B923] text-[#1E2A44] flex items-center justify-center shrink-0 shadow-md">
              <Heart size={24} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                100% of donations go directly to student sponsorships &amp; nutrition
              </h4>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Join our family of institutional partners and change a rural child's destiny today.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-sm hover:bg-amber-400 shadow-xl shadow-[#E8B923]/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Sponsor a Student</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportersSection;
