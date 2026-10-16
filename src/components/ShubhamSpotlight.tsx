import React, { useState } from "react";
import { Link } from "react-router-dom";
import ZigzagCard from "./ZigzagCard";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { GraduationCap } from "./ui/Icons";
import shubhamImg from "../assets/shubham.png";

interface Milestone {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  highlight: string;
  quote?: string;
  stats: { label: string; value: string }[];
}

const milestones: Milestone[] = [
  {
    id: "jmms",
    badge: "Chapter 01 • The Foundation",
    badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    title: "Enlightened Classrooms at Salangaon",
    institution: "John Martyn Memorial School",
    period: "Early Years",
    description:
      "Growing up in Salangaon village, Shubham began his education in the nurturing, non-competitive classrooms of JMMS. Here, curiosity was cultivated and character was shaped through empathy and guidance.",
    highlight: "Nurtured by teachers who believe in potential over privilege",
    quote:
      "“Shubham was helpful by nature. Whenever tasks came up, ‘Don’t worry, I will do it’, he said often.” — Manu Kaur, JMMT Co-ordinator",
    stats: [
      { label: "Class", value: "Primary" },
      { label: "Village", value: "Salangaon" },
    ],
  },
  {
    id: "doon",
    badge: "Chapter 02 • High School Leadership",
    badgeColor: "bg-blue-400/20 text-sky-300 border-sky-400/30",
    title: "Boxing Captain & Published Hindi Poet",
    institution: "The Doon School, Dehradun",
    period: "High School",
    description:
      "Awarded admission to the legendary Doon School, Shubham excelled across academics, athletics, and literature. He was awarded full school colours, appointed Boxing Captain, and edited the Hindi edition of the Weekly.",
    highlight: "Published his own book of original Hindi poetry",
    quote:
      "“Breaking the myth that jocks cannot think: a fierce pugilist in the ring and a sensitive poet with the pen.”",
    stats: [
      { label: "Athletics", value: "Boxing Captain" },
      { label: "Literary", value: "Editor & Poet" },
    ],
  },
  {
    id: "ashoka",
    badge: "Chapter 03 • Global Horizons",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    title: "100% Scholarship to Ashoka University",
    institution: "Ashoka University, Sonepat",
    period: "Higher Education",
    description:
      "Shubham earned a coveted 100% full scholarship to Ashoka University, recognized among India's top liberal arts & sciences universities, demonstrating what rural students can achieve when given authentic opportunity.",
    highlight: "Full ride scholarship covering tuition, board & research",
    quote:
      "“Education at JMMS taught me that where you come from never limits where you can go.” — Shubham Dhiman",
    stats: [
      { label: "Scholarship", value: "100% Full Ride" },
      { label: "Campus", value: "Ashoka Univ" },
    ],
  },
];

const ShubhamSpotlight: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".spotlight-header", variant: "fadeUp", duration: 0.6 },
      { selector: ".spotlight-card", variant: "fadeUp", duration: 0.7, delay: 0.15, distance: 40 },
      { selector: ".spotlight-nav", variant: "fadeDown", duration: 0.5, delay: 0.1 },
    ],
    triggerStart: "top 95%",
  }) as React.RefObject<HTMLElement>;

  const activeMilestone = milestones[activeStep] || milestones[0];

  return (
    <section
      id="success-stories"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-950 via-[#131b2e] to-[#1E2A44] text-white overflow-hidden"
    >
      {/* Background Ambient Layers */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A44]/95 via-[#1E2A44]/85 to-[#162035]/90 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="spotlight-header text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span>CHAPTER 05 • ALUMNUS SPOTLIGHT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            BREAKING BARRIERS, <span className="text-[#E8B923]">SHAPING FUTURES</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
            Real stories of excellence born from foundational learning at JMMS.
          </p>

          {/* Narrative Progress Steps / Chapter Navigation */}
          <div className="spotlight-nav mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            {milestones.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-[#E8B923] text-[#1E2A44] shadow-md scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 text-xs font-black flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{m.period}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="spotlight-card relative max-w-5xl mx-auto">
          <ZigzagCard
            color="#172238"
            toothSize={10}
            variant="scallop"
            className="shadow-2xl"
            innerClassName="border border-white/15"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
              {/* Left Column: Active Milestone Details */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Milestone Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${activeMilestone.badgeColor}`}
                    >
                      {activeMilestone.badge}
                    </span>
                    <span className="text-xs font-semibold text-white/50">
                      {activeStep + 1} of {milestones.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mt-1">
                    {activeMilestone.institution}
                  </p>

                  <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
                    {activeMilestone.description}
                  </p>

                  {/* Quote Block */}
                  {activeMilestone.quote && (
                    <blockquote className="mt-5 p-3.5 sm:p-4 rounded-xl bg-white/5 border-l-4 border-[#E8B923] text-xs sm:text-sm text-white/85 italic leading-relaxed">
                      {activeMilestone.quote}
                    </blockquote>
                  )}
                </div>

                {/* Footer Stat Pills */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-4 sm:gap-6">
                    {activeMilestone.stats.map((s, i) => (
                      <div key={i}>
                        <p className="text-[10px] text-white/50 font-bold uppercase">{s.label}</p>
                        <p className="text-xs sm:text-sm font-black text-amber-300">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/success-stories"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-xs hover:bg-amber-400 transition-all shadow-md"
                  >
                    <span>Full Story</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Image with Dynamic Scholar Badge */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 bg-[#161e30]">
                <img
                  src={shubhamImg}
                  alt="Shubham Dhiman - JMMS Alumnus, The Doon School & Ashoka University Scholar"
                  className="w-full h-full object-cover object-[75%_center] min-h-[280px] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44] via-transparent to-transparent pointer-events-none" />

                {/* Dynamic Scholar Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-2xl bg-[#1E2A44]/95 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <GraduationCap size={20} className="text-amber-300" />
                    </div>
                    <div>
                      <p className="text-amber-300 text-xs font-black uppercase tracking-wider">
                        Shubham Dhiman
                      </p>
                      <p className="text-white font-bold text-xs">
                        JMMS Alumnus • Ashoka Scholar
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                    <span>Full Ride Scholarship</span>
                    <span className="text-amber-300 font-bold">100% Funded</span>
                  </div>
                </div>
              </div>
            </div>
          </ZigzagCard>
        </div>
      </div>
    </section>
  );
};

export default ShubhamSpotlight;
