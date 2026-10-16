import React, { useEffect, useState } from "react";

interface Chapter {
  id: string;
  number: string;
  title: string;
}

const chapters: Chapter[] = [
  { id: "stats", number: "01", title: "Impact" },
  { id: "offers", number: "02", title: "Pillars" },
  { id: "teachers", number: "03", title: "Faculty" },
  { id: "success-stories", number: "04", title: "Scholar" },
  { id: "events", number: "05", title: "Campus" },
  { id: "supporters", number: "06", title: "Patrons" },
  { id: "contact", number: "07", title: "Inquire" },
];

export const ChapterIndex: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>("stats");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling past hero (e.g. 350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Story Chapter Navigation"
      className={`fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 transition-opacity duration-300 pointer-events-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#1E2A44]/90 backdrop-blur-md border border-white/15 py-3 px-2 rounded-2xl shadow-2xl flex flex-col items-center gap-2">
        <span className="text-[9px] font-black tracking-widest text-[#E8B923] uppercase rotate-180 [writing-mode:vertical-rl] mb-1">
          CHAPTERS
        </span>
        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              aria-label={`Jump to Chapter ${ch.number}: ${ch.title}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923] rounded-lg"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#1E2A44] text-white text-[11px] font-bold tracking-wide rounded-md whitespace-nowrap shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Ch. {ch.number} — {ch.title}
              </span>

              {/* Indicator Pip / Pill */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? "w-6 h-6 bg-[#E8B923] text-[#1E2A44] font-black text-[10px] shadow-md shadow-[#E8B923]/30 scale-110"
                    : "w-2.5 h-2.5 bg-white/40 group-hover:bg-white group-hover:scale-125"
                }`}
              >
                {isActive && ch.number}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ChapterIndex;
