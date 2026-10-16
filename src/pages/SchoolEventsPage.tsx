import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ZigzagCard from "../components/ZigzagCard";
import { schoolEventsData } from "../data/eventsData";

const SchoolEventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "Sports & Athletics", label: "Sports & Athletics" },
    { id: "Inter-School Exchange", label: "Inter-School Exchange" },
    { id: "Cultural & Arts", label: "Cultural & Arts" },
    { id: "National Celebration", label: "National Celebrations" },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? schoolEventsData
      : schoolEventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#1E2A44] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold border border-white/10 mb-6 transition-all"
          >
            <span>← Back to Home</span>
          </Link>

          <span className="block text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
            Campus Life & Calendar
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            SCHOOL <span className="text-[#E8B923]">EVENTS</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Catch up on sports meets, inter-school visits, cultural festivals, and patriotic celebrations at John Martyn Memorial School.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 bg-white/10 rounded-2xl border border-white/15 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#E8B923] text-[#1E2A44] font-black shadow-md"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="flex">
              <ZigzagCard
                color="#FFFFFF"
                toothSize={6}
                variant="scallop"
                className="flex-1 hover:shadow-xl transition-shadow"
                innerClassName="flex flex-col justify-between h-full overflow-hidden"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100 group">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#1E2A44]/95 backdrop-blur-md text-white shadow-lg border border-white/20">
                        <span className="text-[10px] font-black uppercase text-amber-300 leading-none">
                          {evt.month}
                        </span>
                        <span className="text-xl font-black leading-tight mt-0.5">
                          {evt.day}
                        </span>
                        <span className="text-[9px] text-white/60 leading-none">
                          {evt.year}
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md ${evt.badgeColor} shadow-sm`}>
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-[#1E2A44] mb-2 leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#1E2A44]/75 leading-relaxed mb-4">
                      {evt.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span>📍 {evt.location}</span>
                      {evt.time && <span>🕒 {evt.time}</span>}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/school-events/${evt.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1E2A44] text-white hover:bg-[#E8B923] hover:text-[#1E2A44] text-xs font-black transition-all group"
                  >
                    <span>Read Full Event Story</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </ZigzagCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SchoolEventsPage;
