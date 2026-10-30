import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { storiesData } from "../data/storiesData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import successBanner from "../assets/successs.jpg";

const avatarColors = [
  "from-amber-500 to-amber-700",
  "from-blue-600 to-indigo-700",
  "from-emerald-600 to-teal-700",
  "from-rose-500 to-pink-700",
  "from-purple-600 to-indigo-800",
  "from-cyan-600 to-blue-700",
  "from-amber-600 to-orange-700",
  "from-indigo-600 to-violet-800",
];

const SuccessStoriesPage: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E2A44]">
      {/* Page Hero Header with banner background */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className={`relative bg-[#1E2A44] text-white py-20 lg:py-28 overflow-hidden reveal ${
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A44]/75 via-[#1E2A44]/85 to-[#1E2A44]/95 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B923]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8B923] text-xs font-bold border border-white/10 mb-6 transition-all"
            >
              <span>← Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E8B923]/20 text-[#E8B923] text-xs font-black uppercase tracking-wider mb-4 border border-[#E8B923]/30">
              Transformative Journeys
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              SUCCESS <span className="text-[#E8B923]">STORIES</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Celebrating the inspiring journeys, achievements, and milestones of our alumni.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {storiesData.map((item, index) => {
            const colorGradient = avatarColors[index % avatarColors.length];

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl border border-[#1E2A44]/10 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Top Row: Index number badge & Star accent */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono font-black text-[#1E2A44] bg-[#FDFBF7] border border-[#1E2A44]/10 px-3 py-1 rounded-full shadow-2xs">
                      #{index + 1}
                    </span>
                    <span className="text-amber-400 text-xs tracking-widest">★★★★★</span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-stone-100">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-13 h-13 rounded-2xl object-cover border-2 border-[#E8B923] shadow-sm shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${colorGradient} text-white flex items-center justify-center font-black text-base shadow-sm shrink-0 border border-white/20`}
                      >
                        {item.initials}
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-[#1E2A44] leading-snug">
                        {item.name}
                      </h2>
                      <p className="text-xs font-bold text-[#E8B923] uppercase tracking-wider mt-0.5">
                        {item.headline}
                      </p>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-sm text-[#1E2A44]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Footer Accent bar */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>John Martyn Memorial School</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
