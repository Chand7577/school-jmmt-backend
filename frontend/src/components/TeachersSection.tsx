import React from "react";
import principalPhoto from "../assets/principal-portrait.jpg";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  GraduationCap,
  Star,
  Users,
  Lightbulb,
} from "./ui/Icons";

interface FacultyPillar {
  index: string;
  title: string;
  tag: string;
  desc: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const facultyPillars: FacultyPillar[] = [
  {
    index: "01",
    title: "14 Certified Educators",
    tag: "Child Psychology",
    desc: "Specially trained in joyful foundational pedagogy and empathetic early childhood learning.",
    IconComponent: GraduationCap,
  },
  {
    index: "02",
    title: "18 Years Leadership",
    tag: "Pedagogical Continuity",
    desc: "Steered by continuous dedication, ethical discipline, and community trust since inception.",
    IconComponent: Star,
  },
  {
    index: "03",
    title: "1:14 Mentorship Ratio",
    tag: "Individual Care",
    desc: "Unusually low student-to-teacher ratio guaranteeing every child is understood and supported.",
    IconComponent: Users,
  },
  {
    index: "04",
    title: "Creative Specialists",
    tag: "Music, Loom & Craft",
    desc: "Dedicated teachers for vocal & instrumental music, traditional instruments, and loom weaving.",
    IconComponent: Lightbulb,
  },
];

const TeachersSection: React.FC = () => {
  const sectionRef = useGsapReveal<HTMLDivElement>({
    targets: [
      { selector: ".teachers-header", variant: "fadeUp", duration: 0.7 },
      { selector: ".teachers-spotlight", variant: "fadeUp", duration: 0.8, delay: 0.15 },
      { selector: ".teachers-pillars", variant: "fadeUp", duration: 0.7, delay: 0.3 },
    ],
    triggerStart: "top 90%",
  });

  return (
    <section
      id="teachers"
      ref={sectionRef}
      className="relative bg-[#FDFBF7] py-24 lg:py-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[700px] h-[500px] bg-gradient-to-bl from-[#E8B923]/5 via-amber-100/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header: Editorial & Balanced */}
        <div className="teachers-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="space-y-4 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#1E2A44] uppercase">
                Chapter 03 · Academic Leadership & Faculty
              </span>
            </div>

            {/* Headline with weight contrast */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-[#1E2A44] leading-[1.15]">
              Guiding curious minds with <br className="hidden sm:inline" />
              <span className="font-black text-[#1E2A44]">
                patience, empathy & <span className="text-[#E8B923]">devotion.</span>
              </span>
            </h2>
          </div>

          {/* Lead Context */}
          <div className="max-w-md lg:pb-1">
            <p className="text-sm sm:text-[15px] text-[#1E2A44]/70 leading-relaxed font-normal">
              Fourteen full-time certified educators and an experienced principal
              fostering holistic, values-based education in rural Salangaon.
            </p>
          </div>
        </div>

        {/* Principal Editorial Feature Card */}
        <div className="teachers-spotlight bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] overflow-hidden p-8 sm:p-12 lg:p-16 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Portrait & Title */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none aspect-[3/4] rounded-2xl overflow-hidden border border-[#1E2A44]/10 shadow-sm mb-6">
                <img
                  src={principalPhoto}
                  alt="Ms. Anu Ahuja – Principal, John Martyn Memorial School"
                  className="w-full h-full object-cover object-[center_20%] filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-[11px] font-mono tracking-wider uppercase opacity-90">
                    Est. Leadership
                  </span>
                  <span className="text-xs font-bold bg-[#E8B923] text-[#1E2A44] px-2.5 py-0.5 rounded-full">
                    18 Years
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44] leading-tight">
                Ms. Anu Ahuja
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#E8B923] uppercase tracking-wider mt-1">
                Principal & Educational Visionary
              </p>
              <p className="text-xs text-[#1E2A44]/55 mt-2 leading-relaxed">
                Guiding curriculum design, faculty mentorship, and child-centered care at JMMS.
              </p>
            </div>

            {/* Right Column: Vision & Philosophy */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-8">
              {/* Highlight Quote */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8B923]">
                <p className="text-xl sm:text-2xl font-light text-[#1E2A44] leading-snug tracking-tight">
                  “My vision for John Martyn Memorial School is simple — to build an environment where every child feels seen, valued, and empowered to{" "}
                  <strong className="font-black text-[#1E2A44] underline decoration-[#E8B923] decoration-2 underline-offset-4">
                    Learn, Lead, and Serve
                  </strong>.”
                </p>
              </div>

              {/* Two Pillar Philosophy Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-[#1E2A44]/5">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#E8B923] uppercase font-bold">
                    Pillar I · Curiosity Over Marks
                  </span>
                  <h4 className="text-sm font-bold text-[#1E2A44]">
                    Joyful, Inquiry-Led Learning
                  </h4>
                  <p className="text-xs text-[#1E2A44]/70 leading-relaxed font-normal">
                    Education must go far beyond examination scores. We nurture classrooms where children ask questions without hesitation, playgrounds where teamwork is forged, and classrooms where curiosity thrives.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#E8B923] uppercase font-bold">
                    Pillar II · Character & Resilience
                  </span>
                  <h4 className="text-sm font-bold text-[#1E2A44]">
                    Values, Craft & Community Service
                  </h4>
                  <p className="text-xs text-[#1E2A44]/70 leading-relaxed font-normal">
                    Resilience, empathy, and discipline matter just as much as academic instruction. Along with strong foundational literacy and science, we build grounded, compassionate, and capable young citizens.
                  </p>
                </div>
              </div>

              {/* Guiding Words Bar */}
              <div className="p-5 sm:p-6 bg-[#FDFBF7] rounded-2xl border border-[#1E2A44]/5 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-between text-xs text-[#1E2A44]/80">
                <div className="flex-1">
                  <p className="font-bold text-[#1E2A44]">To Our Students:</p>
                  <p className="text-xs text-[#1E2A44]/65 mt-0.5">Dream boldly, work with dedication, and lead with quiet integrity.</p>
                </div>
                <div className="w-px h-auto bg-[#1E2A44]/10 hidden sm:block" />
                <div className="flex-1">
                  <p className="font-bold text-[#1E2A44]">To Parents & Teachers:</p>
                  <p className="text-xs text-[#1E2A44]/65 mt-0.5">Together, let us raise young people who will elevate their families and villages.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Four Faculty Pillars Grid */}
        <div className="teachers-pillars bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1E2A44]/10">
            {facultyPillars.map((item) => {
              const Icon = item.IconComponent;
              return (
                <div
                  key={item.index}
                  className="group relative p-7 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-[#FDFBF7]/60"
                >
                  {/* Subtle top indicator hover line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-[#E8B923] transition-colors duration-300" />

                  <div>
                    {/* Top index & icon */}
                    <div className="flex items-center justify-between text-[#1E2A44]/30 mb-6">
                      <span className="text-[11px] font-mono tracking-widest text-[#1E2A44]/40 font-bold">
                        {item.index}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44]/70 group-hover:text-[#1E2A44] group-hover:bg-[#E8B923]/15 transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#1E2A44] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-bold text-[#E8B923] uppercase tracking-wider mt-1">
                      {item.tag}
                    </p>
                  </div>

                  <p className="text-xs text-[#1E2A44]/65 leading-relaxed mt-5 pt-4 border-t border-[#1E2A44]/5">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeachersSection;
