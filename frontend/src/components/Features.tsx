import React, { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  GraduationCap,
  Lightbulb,
  Users,
  Check,
  ArrowRight,
  ChevronDown,
} from "./ui/Icons";
import eduHatIcon from "../assets/edu-hat-png.png";
import skillIcon from "../assets/skill.png";
import parentsIcon from "../assets/parents.png";
import f1Illustration from "../assets/f1.png";

interface OfferPillar {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  adage?: string;
  description: string;
  image: string;
  badge: string;
  highlights: string[];
  ctaText?: string;
  ctaLink?: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const offers: OfferPillar[] = [
  {
    id: "primary",
    number: "01",
    tabLabel: "Core Foundation",
    title: "BASIC PRIMARY EDUCATION",
    subtitle: "Nurturing Foundational Curiosity & Joy",
    adage: "Childhood should be a journey, not a race",
    description:
      "Going by the adage that 'childhood should be a journey, not a race' the John Martyn School imparts basic primary education in an enlightened and nurturing environment.",
    image: eduHatIcon,
    badge: "Core Foundation",
    highlights: [
      "Joyful, child-centric classroom pedagogy",
      "Enlightened, non-competitive learning pace",
      "Solid grounding in languages, mathematics & nature",
      "Nurturing emotional well-being and strong ethics",
    ],
    IconComponent: GraduationCap,
  },
  {
    id: "skills",
    number: "02",
    tabLabel: "Skills Development",
    title: "SKILLS DEVELOPMENT",
    subtitle: "Practical Capabilities for Real Life",
    adage: "Education alone is not enough to equip children",
    description:
      "Education alone is not enough to equip children. Our comprehensive skill development program includes loom room training with embroidery and patchwork, as well as dedicated music education. Our school has two dedicated teachers—one for vocal music and one for instrumental music. Students receive holistic training in singing along with Indian musical instruments such as the tabla, harmonium, and other traditional instruments, helping them develop their musical skills, creativity, and appreciation for Indian culture.",
    image: skillIcon,
    badge: "Capacity Building",
    ctaText: "Explore Skill Workshops",
    ctaLink: "#contact",
    highlights: [
      "Loom room training with embroidery and patchwork",
      "Music & instruments: Vocal and instrumental training",
      "Indian musical instruments: Tabla, harmonium & traditional instruments",
      "Inter-school events and creative competitions",
      "Hands-on crafts, clay modeling & creative arts",
      "Building self-reliance and active confidence",
    ],
    IconComponent: Lightbulb,
  },
  {
    id: "community",
    number: "03",
    tabLabel: "Village Synergy",
    title: "PARENTS & COMMUNITIES",
    subtitle: "Empowering Rural Village Ecosystems",
    adage: "Growing together with our village families",
    description:
      "JMMS identifies skilled and semi-skilled members of the parents and village community and absorbs them into the school's working team.",
    image: parentsIcon,
    badge: "Village Synergy",
    ctaText: "Join Community Initiatives",
    ctaLink: "#contact",
    highlights: [
      "Direct village employment & dignity of labor",
      "Involving parents in school meals & craft training",
      "Active parent-teacher advisory relationship",
      "Strengthening community cohesion across Salangaon",
    ],
    IconComponent: Users,
  },
];

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  const sectionRef = useGsapReveal<HTMLDivElement>({
    targets: [
      { selector: ".offers-header", variant: "fadeUp", duration: 0.6 },
      {
        selector: ".offers-content",
        variant: "fadeUp",
        duration: 0.7,
        delay: 0.15,
      },
    ],
    triggerStart: "top 95%",
  });

  const activePillar = offers[activeTab];

  return (
    <section
      id="offers"
      className="bg-[#FDFBF7] relative pt-6 pb-24 lg:pt-10 lg:pb-36 overflow-hidden"
    >
      {/* Background Playful Illustration Layer - Clearly visible */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-end justify-center w-full max-w-full"
        aria-hidden="true"
      >
        <img
          src={f1Illustration}
          alt=""
          className="w-full max-w-[2000px] h-auto object-cover sm:object-contain object-bottom opacity-75 sm:opacity-85"
        />
      </div>

      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="offers-header text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2A44]/5 border border-[#1E2A44]/10 text-xs font-bold text-[#1E2A44] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span className="tracking-wide">
              CHAPTER 02 • OUR EDUCATIONAL PILLARS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
            WHAT WE <span className="text-[#E8B923]">OFFER</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1E2A44]/75 leading-relaxed max-w-2xl mx-auto">
            At John Martyn Memorial School, holistic development is embedded in
            our classrooms, practical training, and community life.
          </p>
        </div>

        {/* Desktop Layout: Tabbed / Segmented (30% Left Tabs, 70% Right Content Panel) */}
        <div className="offers-content hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3 Selectable Tabs (30% / 4 Cols) */}
          <div
            role="tablist"
            aria-label="Educational Pillars"
            className="lg:col-span-4 flex flex-col gap-3"
          >
            {offers.map((pillar, idx) => {
              const isSelected = activeTab === idx;
              const TabIcon = pillar.IconComponent;
              return (
                <button
                  key={pillar.id}
                  id={`pillar-tab-${pillar.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`pillar-panel-${pillar.id}`}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923] ${
                    isSelected
                      ? "bg-[#1E2A44] text-white border-[#1E2A44] shadow-lg translate-x-1"
                      : "bg-white text-[#1E2A44] border-gray-200/80 hover:border-[#1E2A44]/30 hover:bg-amber-50/20"
                  }`}
                >
                  {/* Left indicator accent when selected */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#E8B923] rounded-r-full" />
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-white/10 text-amber-300"
                          : "bg-gray-100 text-[#1E2A44] group-hover:bg-[#1E2A44]/10"
                      }`}
                    >
                      <TabIcon size={20} />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-black tracking-widest uppercase block ${
                          isSelected ? "text-amber-300" : "text-gray-400"
                        }`}
                      >
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="text-base font-black tracking-tight leading-snug">
                        {pillar.tabLabel}
                      </h3>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isSelected
                        ? "text-[#E8B923] translate-x-1"
                        : "text-gray-300 group-hover:text-gray-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: One Large Content Panel (70% / 8 Cols) */}
          <div
            id={`pillar-panel-${activePillar.id}`}
            role="tabpanel"
            aria-labelledby={`pillar-tab-${activePillar.id}`}
            className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]"
          >
            {/* Ambient subtle illustration watermark */}
            <img
              src={activePillar.image}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-8 -right-8 w-60 h-60 opacity-5 pointer-events-none select-none transition-transform duration-700"
            />

            <div>
              {/* Header inside panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#1E2A44]/5 text-[#1E2A44] text-xs font-black uppercase tracking-wider">
                    Pillar {activePillar.number} • {activePillar.badge}
                  </span>
                  {activePillar.adage && (
                    <span className="text-xs font-semibold italic text-[#1E2A44]/70 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/60">
                      "{activePillar.adage}"
                    </span>
                  )}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#1E2A44]/5 border border-[#1E2A44]/10 flex items-center justify-center p-2 shrink-0">
                  <img
                    src={activePillar.image}
                    alt={activePillar.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1E2A44] tracking-tight">
                  {activePillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">
                  {activePillar.subtitle}
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#1E2A44]/80 leading-relaxed">
                  {activePillar.description}
                </p>
              </div>

              {/* Checklist Items: Neutral checkmarks per spec 2 (Reduce gold overuse) */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid sm:grid-cols-2 gap-3.5">
                {activePillar.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1E2A44]/85"
                  >
                    <span className="text-[#1E2A44] mt-0.5 shrink-0">
                      <Check size={16} strokeWidth={2.5} />
                    </span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Pillar {activePillar.number} of 03
              </span>
              {activePillar.ctaText && (
                <a
                  href={activePillar.ctaLink || "#contact"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E2A44] text-white hover:bg-[#2b3b5e] font-bold text-xs transition-colors group shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
                >
                  <span>{activePillar.ctaText}</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout (< 1024px) */}
        <div className="offers-content lg:hidden flex flex-col gap-4">
          {offers.map((pillar, idx) => {
            const isOpen = openAccordion === idx;
            const TabIcon = pillar.IconComponent;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1E2A44]/5 text-[#1E2A44] flex items-center justify-center shrink-0">
                      <TabIcon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 block">
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="text-base font-black text-[#1E2A44] leading-snug">
                        {pillar.tabLabel}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[#1E2A44] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#E8B923]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-2 border-t border-gray-100 animate-fadeIn">
                    <p className="text-xs sm:text-sm font-semibold italic text-[#1E2A44]/70 mb-3 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/40">
                      "{pillar.adage}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#1E2A44]/80 leading-relaxed mb-4">
                      {pillar.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      {pillar.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#1E2A44]/80"
                        >
                          <Check
                            size={14}
                            className="text-[#1E2A44] mt-0.5 shrink-0"
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {pillar.ctaText && (
                      <a
                        href={pillar.ctaLink || "#contact"}
                        className="inline-flex items-center gap-2 text-xs font-black text-[#1E2A44] hover:text-[#E8B923] transition-colors"
                      >
                        <span>{pillar.ctaText}</span>
                        <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
