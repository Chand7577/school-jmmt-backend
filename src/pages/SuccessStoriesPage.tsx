import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ZigzagCard from "../components/ZigzagCard";
import { storiesData } from "../data/storiesData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import successBanner from "../assets/successs.jpg";

const SuccessStoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredStories =
    activeFilter === "all"
      ? storiesData
      : storiesData.filter((s) => s.category === activeFilter);

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Page Hero Header with custom banner background */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className={`relative bg-[#1E2A44] text-white py-20 lg:py-24 overflow-hidden reveal ${
          heroVisible ? "visible" : ""
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${successBanner})`,
          }}
        />
        {/* Balanced gradient overlay so background is clear while white text stays crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A44]/60 via-[#1E2A44]/75 to-[#1E2A44]/90 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B923]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold border border-white/10 mb-6 transition-all"
            >
              <span>← Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-400/30">
              Transformative Journeys Since 1985
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              JMMS <span className="text-[#E8B923]">SUCCESS STORIES</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Explore how students, parents, and community members from Salangaon and surrounding villages build remarkable confidence, skills, and futures.
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 gap-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === "all"
                    ? "bg-[#E8B923] text-[#1E2A44] shadow-md font-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                All Stories ({storiesData.length})
              </button>
              <button
                onClick={() => setActiveFilter("achiever")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === "achiever"
                    ? "bg-[#E8B923] text-[#1E2A44] shadow-md font-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Student Achievers
              </button>
              <button
                onClick={() => setActiveFilter("parent")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === "parent"
                    ? "bg-[#E8B923] text-[#1E2A44] shadow-md font-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Parent Voices
              </button>
              <button
                onClick={() => setActiveFilter("community")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === "community"
                    ? "bg-[#E8B923] text-[#1E2A44] shadow-md font-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Community Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredStories.map((item, index) => (
            <div key={item.id} className="flex">
              <ZigzagCard
                color="#FFFFFF"
                toothSize={6}
                variant="zigzag"
                className={`flex-1 transform transition-all duration-300 hover:-translate-y-1.5 ${
                  index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                }`}
                innerClassName="flex flex-col h-full"
              >
                <div className="p-7 flex flex-col justify-between flex-1 min-h-[360px]">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-[#1E2A44]">
                        {item.badge}
                      </span>
                      <span className="text-amber-400 text-sm tracking-widest">★★★★★</span>
                    </div>

                    {/* Extended Details if available */}
                    {item.details && (
                      <p className="text-xs text-[#1E2A44]/70 mb-3 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                        {item.details}
                      </p>
                    )}

                    {/* Quote */}
                    <p className="text-[#1E2A44]/85 text-sm leading-relaxed italic relative z-10 mb-6">
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

        {/* Bottom Banner to Share Story */}
        <div className="mt-16 bg-gradient-to-r from-[#1E2A44] to-[#121c30] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-amber-300 text-xs font-black uppercase tracking-wider">
              JMMS Alumni & Parent Network
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              Have a story or update you want to share with us?
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Every graduate's milestone is celebrated by the teachers and trustees who supported their journey.
            </p>
          </div>

          <a
            href="/#contact"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-sm hover:bg-amber-400 transition-all shadow-lg"
          >
            Submit Your Story
          </a>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
