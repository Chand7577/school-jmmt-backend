import React, { useState } from "react";
import ZigzagCard from "./ZigzagCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Story {
  id: string;
  category: "achiever" | "parent" | "community";
  name: string;
  role: string;
  badge: string;
  quote: string;
  achievement: string;
  avatar: string;
}

const stories: Story[] = [
  {
    id: "1",
    category: "achiever",
    name: "Rohit Negi",
    role: "JMMS Alumnus (Class of 2018)",
    badge: "Scholarship Achiever",
    quote:
      "John Martyn Memorial School gave me the confidence to believe in my potential. The teachers stayed after hours to help me prepare for senior school entrance exams.",
    achievement: "Now pursuing BSc Computer Science on full scholarship",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    category: "achiever",
    name: "Sunita Rawat",
    role: "JMMS Alumna (Class of 2020)",
    badge: "State Level Athlete",
    quote:
      "At JMMS, sports and arts were just as valued as books. The skills development program taught me discipline, focus, and self-belief.",
    achievement: "Gold Medalist at Uttarakhand Junior Athletics",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    category: "parent",
    name: "Priya Sharma",
    role: "Mother of Class 3 Student",
    badge: "Parent Community Member",
    quote:
      "Going by the school’s motto that childhood is a journey, my son never feels burdened. He comes home brimming with curiosity and eager to share what he read in the library.",
    achievement: "Active member in the parent reading circle",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "4",
    category: "parent",
    name: "Rajesh Kumar",
    role: "Father of Class 5 Student",
    badge: "Village Artisan",
    quote:
      "The dedicated teachers with decades of experience treat each student like family. My daughter’s spoken English and mathematical skills have improved tremendously.",
    achievement: "Daughter selected for Inter-School Science Fair",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "5",
    category: "community",
    name: "Kamla Devi",
    role: "Village Community Staff & Parent",
    badge: "Community Team Member",
    quote:
      "JMMS didn’t just educate our kids; it identified skills among village parents and welcomed us into the school’s working team. It gave our household financial security and pride.",
    achievement: "School Nutrition & Garden Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
];

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { ref: sectionRef, isVisible } = useScrollReveal(0.05);

  const filteredStories =
    activeFilter === "all"
      ? stories
      : stories.filter((s) => s.category === activeFilter);

  return (
    <section
      id="success-stories"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-20 lg:py-28 bg-white relative overflow-hidden reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Background soft circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-3">
            <span>Real Impact, Real Futures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
            SUCCESS STORIES & <span className="text-[#E8B923]">ACHIEVERS</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1E2A44]/75 leading-relaxed">
            From rural Salangaon classrooms to higher secondary excellence, 
            see how our holistic education nurtures true champions in life.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-[#1E2A44]/5 rounded-2xl border border-[#1E2A44]/10 max-w-lg mx-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-[#1E2A44] text-white shadow-md"
                  : "text-[#1E2A44]/70 hover:text-[#1E2A44]"
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setActiveFilter("achiever")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "achiever"
                  ? "bg-[#1E2A44] text-white shadow-md"
                  : "text-[#1E2A44]/70 hover:text-[#1E2A44]"
              }`}
            >
              Student Achievers
            </button>
            <button
              onClick={() => setActiveFilter("parent")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "parent"
                  ? "bg-[#1E2A44] text-white shadow-md"
                  : "text-[#1E2A44]/70 hover:text-[#1E2A44]"
              }`}
            >
              Parent Voices
            </button>
            <button
              onClick={() => setActiveFilter("community")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "community"
                  ? "bg-[#1E2A44] text-white shadow-md"
                  : "text-[#1E2A44]/70 hover:text-[#1E2A44]"
              }`}
            >
              Community
            </button>
          </div>
        </div>

        {/* Dynamic Story Grid (Modern asymmetric cards with hover lift) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredStories.map((item, index) => (
            <div key={item.id} className={`flex reveal reveal-delay-${Math.min(index + 1, 5)} ${isVisible ? "visible" : ""}`}>
              <ZigzagCard
                color="#FFFFFF"
                toothSize={6}
                variant="zigzag"
                className={`flex-1 transform transition-all duration-300 hover:-translate-y-1.5 ${
                  index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                }`}
                innerClassName="flex flex-col h-full"
              >
                <div className="p-7 flex flex-col justify-between flex-1 min-h-[340px]">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-[#1E2A44]">
                        {item.badge}
                      </span>
                      <span className="text-amber-400 text-sm tracking-widest">★★★★★</span>
                    </div>

                    {/* Quote */}
                    <p className="text-[#1E2A44]/85 text-sm sm:text-base leading-relaxed italic relative z-10 mb-6">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Footer Profile & Achievement */}
                  <div>
                    <div className="p-3 bg-[#FDFBF7] rounded-2xl border border-gray-100 mb-4">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        Key Milestone
                      </p>
                      <p className="text-xs font-bold text-[#1E2A44] mt-0.5">
                        {item.achievement}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#E8B923]"
                      />
                      <div>
                        <h4 className="font-extrabold text-sm text-[#1E2A44]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ZigzagCard>
            </div>
          ))}
        </div>

        {/* Bottom Achievement Ribbon */}
        <div className="mt-14 bg-gradient-to-r from-[#1E2A44] to-[#121c30] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-amber-300 text-xs font-black uppercase tracking-wider">
              100% Transition Success
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Are you an alumnus or want to share your JMMS story?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1">
              We take deep pride in every child who walked these corridors since 1985.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-full bg-[#E8B923] text-[#1E2A44] font-bold text-xs hover:bg-amber-400 transition-all shadow-lg"
          >
            Submit Your Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

