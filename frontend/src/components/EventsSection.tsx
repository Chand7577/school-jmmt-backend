import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { schoolEventsData, SchoolEvent } from "../data/eventsData";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { API_BASE_URL } from "../config/api";
import {
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "./ui/Icons";

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<SchoolEvent[]>(schoolEventsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Load events from DB if available, otherwise keep our full 8 dummy events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events/index.php?status=active`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length >= 3) {
          const liveFormatted: SchoolEvent[] = json.data.map((e: any) => {
            const d = new Date(e.event_date);
            const slug = e.title
              ? e.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
              : `event-${e.id}`;
            return {
              id: `db-${e.id}`,
              slug: slug || `event-${e.id}`,
              title: e.title,
              category: e.event_type ? e.event_type.charAt(0).toUpperCase() + e.event_type.slice(1) : "School Event",
              date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
              day: d.getDate().toString().padStart(2, "0"),
              month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
              year: d.getFullYear().toString(),
              time: `${e.start_time?.slice(0, 5) || "09:00"} – ${e.end_time?.slice(0, 5) || "14:00"}`,
              location: e.location || "JMMS Campus, Salangaon",
              summary: e.description || "School event organized at John Martyn Memorial School.",
              fullDescription: e.description ? [e.description] : ["Join us for this special campus event."],
              image: e.image_url || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
              badgeColor: "bg-amber-100 text-amber-800",
            };
          });
          setEvents(liveFormatted);
        }
      } catch (err) {
        console.warn("Could not load dynamic events for homepage:", err);
      }
    };
    loadEvents();
  }, []);

  // Update items per view based on responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Maximum valid slide offset
  const maxIndex = Math.max(0, events.length - itemsPerView);

  // Auto-scroll ticker: advances every 3.8s, pauses on hover
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const sectionRef = useGsapReveal<HTMLDivElement>({
    targets: [
      { selector: ".events-header", variant: "fadeUp", duration: 0.7 },
      { selector: ".events-carousel-track", variant: "fadeUp", duration: 0.8, delay: 0.15 },
    ],
    triggerStart: "top 90%",
  });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative bg-[#FDFBF7] py-24 lg:py-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#E8B923]/5 via-amber-100/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header: Editorial & Balanced */}
        <div className="events-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
          <div className="space-y-4 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#1E2A44] uppercase">
                Chapter 06 · Campus Life & Celebrations
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-[#1E2A44] leading-[1.15]">
              Celebrating curiosity through <br className="hidden sm:inline" />
              <span className="font-black text-[#1E2A44]">
                campus life & <span className="text-[#E8B923]">festivities.</span>
              </span>
            </h2>

            <p className="text-sm sm:text-[15px] text-[#1E2A44]/70 leading-relaxed font-normal pt-1 max-w-xl">
              From traditional loom exhibitions and sports championships to classical Himalayan recitals, our students discover pride and joy in every event.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous event"
                className="w-10 h-10 rounded-full border border-[#1E2A44]/10 bg-white hover:bg-[#FDFBF7] text-[#1E2A44] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next event"
                className="w-10 h-10 rounded-full border border-[#1E2A44]/10 bg-white hover:bg-[#FDFBF7] text-[#1E2A44] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
              >
                <ChevronRight size={18} />
              </button>

              <Link
                to="/school-events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2A44] text-white text-xs font-bold hover:bg-[#28385a] transition-all shadow-sm ml-2 group"
              >
                <span>All Events</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Three-Column Auto-scrolling Track */}
        <div
          className="events-carousel-track overflow-hidden -mx-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {events.map((evt) => (
              <div
                key={evt.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <article className="h-full bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] hover:shadow-xl hover:border-[#1E2A44]/20 transition-all duration-500 overflow-hidden flex flex-col justify-between group">
                  <div>
                    {/* Event Image & Floating Badges */}
                    <div className="relative h-56 w-full overflow-hidden bg-[#162035]">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/75 via-transparent to-transparent pointer-events-none" />

                      {/* Date Badge (Top Left) */}
                      <div className="absolute top-4 left-4 bg-[#1E2A44]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/10 flex items-center gap-2">
                        <span className="text-xl font-black text-amber-300 leading-none">
                          {evt.day}
                        </span>
                        <div className="flex flex-col text-left leading-none">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                            {evt.month}
                          </span>
                          <span className="text-[9px] text-white/50">
                            {evt.year}
                          </span>
                        </div>
                      </div>

                      {/* Category Pill (Top Right) */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#1E2A44] backdrop-blur-md shadow-sm">
                          {evt.category}
                        </span>
                      </div>

                      {/* Time pill (Bottom Left of photo) */}
                      {evt.time && (
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                          <Clock size={12} className="text-amber-300" />
                          <span>{evt.time}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-7">
                      <h3 className="text-lg sm:text-xl font-bold text-[#1E2A44] leading-snug group-hover:text-[#E8B923] transition-colors line-clamp-2">
                        <Link to={`/school-events/${evt.slug}`}>
                          {evt.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-[#1E2A44]/70 leading-relaxed line-clamp-3 mt-3">
                        {evt.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Location & Arrow Link */}
                  <div className="px-7 pb-7 pt-4 border-t border-[#1E2A44]/5 flex items-center justify-between text-xs text-[#1E2A44]/70">
                    <span className="flex items-center gap-1.5 truncate max-w-[190px]">
                      <MapPin size={13} className="shrink-0 text-[#E8B923]" />
                      <span className="truncate">{evt.location}</span>
                    </span>

                    <Link
                      to={`/school-events/${evt.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors shrink-0 group/link"
                    >
                      <span>Explore</span>
                      <ArrowRight
                        size={13}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Progress Bar */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-8 bg-[#E8B923]"
                  : "w-2 bg-[#1E2A44]/15 hover:bg-[#1E2A44]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
