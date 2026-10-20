import React from "react";
import principalPhoto from "../assets/jmmt-principal.JPG";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  GraduationCap,
  Star,
  Users,
  Lightbulb,
  Quote,
} from "./ui/Icons";

interface TeacherStat {
  title: string;
  desc: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const teacherStats: TeacherStat[] = [
  {
    title: "14 Certified Educators",
    desc: "Child psychology & foundational pedagogy",
    IconComponent: GraduationCap,
  },
  {
    title: "18 Years Leadership",
    desc: "Pedagogical excellence since inception",
    IconComponent: Star,
  },
  {
    title: "1:14 Mentorship Ratio",
    desc: "Personalized attention for every child",
    IconComponent: Users,
  },
  {
    title: "Continuous Training",
    desc: "Modern craft & digital literacy workshops",
    IconComponent: Lightbulb,
  },
];

const TeachersSection: React.FC = () => {
  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".teachers-header", variant: "fadeUp", duration: 0.6 },
      { selector: ".teachers-spotlight", variant: "fadeUp", duration: 0.7, delay: 0.15 },
      { selector: ".teachers-strip", variant: "fadeUp", duration: 0.6, delay: 0.3 },
    ],
    triggerStart: "top 95%",
  });

  return (
    <section
      id="teachers"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#FDFBF7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="teachers-header text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2A44]/5 border border-[#1E2A44]/10 text-xs font-bold text-[#1E2A44] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span className="tracking-wide text-center break-words">CHAPTER 03 • ACADEMIC LEADERSHIP &amp; MENTORSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
            MEET OUR <span className="text-[#E8B923]">TEACHERS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1E2A44]/75 leading-relaxed font-medium">
            JMMS has <strong className="text-[#1E2A44]">14 qualified and trained teachers</strong> along with the 
            principal with <strong className="text-[#1E2A44]">18 years of experience</strong> shaping curious minds with patience, empathy, and devotion.
          </p>
        </div>

        {/* Editorial Spotlight Layout */}
        <div className="teachers-spotlight bg-white rounded-3xl border border-gray-200/80 shadow-xl p-5 sm:p-10 lg:p-16 relative overflow-hidden">
          {/* Subtle watermark quote icon in background */}
          <div className="absolute top-4 right-8 text-[#1E2A44]/5 pointer-events-none select-none">
            <Quote size={180} strokeWidth={1} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left/Side: Principal Photo/Avatar & Credential Pill */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative mb-5">
                <div className="w-full max-w-[260px] sm:max-w-sm lg:max-w-none aspect-[3/4] mx-auto rounded-3xl shadow-lg border-2 border-amber-300/30 overflow-hidden relative">
                  <img
                    src={principalPhoto}
                    alt="Ms. Anu Ahuja – Principal, JMMS"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2.5 -right-2.5 bg-[#E8B923] text-[#1E2A44] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  18 Yrs
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44]">
                School Principal
              </h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 mt-0.5">
                18 Years Pedagogical Leadership
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>John Martyn Memorial School</span>
              </div>
            </div>

            {/* Right/Center: Complete Message Treatment */}
            <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10">
              <span className="text-4xl sm:text-5xl font-serif text-[#E8B923] leading-none block mb-3 select-none">
                “
              </span>
              <div className="space-y-4 text-[#1E2A44] leading-relaxed">
                <p className="text-lg sm:text-xl font-bold leading-snug tracking-tight text-[#1E2A44]">
                  My vision for John Martyn Memorial School is simple — to build a school where every child feels seen, valued, and empowered to <span className="text-[#E8B923]">Learn, Lead, and Serve</span>.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  I believe education must go beyond marks. It must nurture curiosity, build character, and instill responsibility. At JMMS, we strive to create classrooms where children ask questions freely, playgrounds where they learn teamwork, and a community where they understand the joy of giving back.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  The last few years have taught us that resilience and compassion matter as much as academics. That is why, along with strong learning, we focus on values, discipline, and service to others.
                </p>
                <div className="pt-3 border-t border-gray-100 grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <p className="font-bold text-[#1E2A44]">
                    To our students: <span className="font-normal text-gray-600 block sm:inline">Dream big, work hard, and lead with integrity.</span>
                  </p>
                  <p className="font-bold text-[#1E2A44]">
                    To our parents &amp; teachers: <span className="font-normal text-gray-600 block sm:inline">Together, let us raise young people who are confident and kind.</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <p className="text-sm font-extrabold text-[#1E2A44]">
                  Ms. Anu Ahuja
                  <span className="block text-xs font-semibold text-gray-500">
                    Principal &amp; Educational Visionary
                  </span>
                </p>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  18 Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Thin Horizontal Stat Strip Below the Quote (No separate bordered cards) */}
          <div className="teachers-strip mt-10 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 lg:divide-x lg:divide-gray-200">
              {teacherStats.map((item, index) => {
                const StatIcon = item.IconComponent;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3.5 ${
                      index !== 0 ? "lg:pl-6" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1E2A44]/5 text-[#1E2A44] flex items-center justify-center shrink-0 mt-0.5">
                      <StatIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#1E2A44] leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
