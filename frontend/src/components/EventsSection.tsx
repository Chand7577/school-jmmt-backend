import React, { useRef, useState, useEffect } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<SchoolEvent[]>(schoolEventsData);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events/index.php?status=active`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
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
          // Use live events directly from database
          setEvents(liveFormatted);
        }
      } catch (err) {
        console.warn("Could not load dynamic events for homepage:", err);
      }
    };

    loadEvents();
  }, []);

  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".events-header", variant: "fadeUp", duration: 0.6 },
      { selector: ".events-carousel-container", variant: "fadeUp", duration: 0.7, delay: 0.15 },
    ],
    triggerStart: "top 95%",
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#FDFBF7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="events-header flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2A44]/5 border border-[#1E2A44]/10 text-xs font-bold text-[#1E2A44] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
              <span className="tracking-wide">CHAPTER 06 • CAMPUS LIFE &amp; CELEBRATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
              UPCOMING &amp; RECENT <span className="text-[#E8B923]">EVENTS</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#1E2A44]/75 leading-relaxed">
              Experience the vibrant spirit of John Martyn Memorial School
              through sports, field visits, and co-curricular festivities.
            </p>
          </div>

          {/* Navigation Controls: Carousel Arrows & View All */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous events"
                className="w-10 h-10 rounded-full border border-gray-200/80 bg-white hover:bg-gray-50 text-[#1E2A44] flex items-center justify-center transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next events"
                className="w-10 h-10 rounded-full border border-gray-200/80 bg-white hover:bg-gray-50 text-[#1E2A44] flex items-center justify-center transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <Link
              to="/school-events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2A44] text-white text-xs font-bold hover:bg-[#2b3b5e] transition-colors shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923]"
            >
              <span>All Events</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll-Snap Carousel */}
        <div className="events-carousel-container relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth focus:outline-none no-scrollbar"
          >
            {events.map((evt) => (
              <div
                key={evt.id}
                className="snap-start shrink-0 w-[88vw] sm:w-[380px] md:w-[400px] lg:w-[410px] bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1E2A44] text-white shrink-0 shadow-md">
                      <span className="text-[11px] font-bold uppercase text-amber-300 leading-none">
                        {evt.month}
                      </span>
                      <span className="text-xl sm:text-2xl font-black leading-tight mt-0.5">
                        {evt.day}
                      </span>
                      <span className="text-[10px] text-white/60 leading-none">
                        {evt.year}
                      </span>
                    </div>

                    {/* Category & Time */}
                    <div className="text-right space-y-1">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full inline-block ${evt.badgeColor}`}>
                        {evt.category}
                      </span>
                      {evt.time && (
                        <div className="flex items-center justify-end gap-1 text-[11px] text-gray-500 font-medium">
                          <Clock size={12} />
                          <span>{evt.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-lg sm:text-xl font-black text-[#1E2A44] mb-2 leading-snug group-hover:text-[#1E2A44] transition-colors">
                    <Link
                      to={`/school-events/${evt.slug}`}
                      className="hover:underline focus:outline-none focus-visible:underline"
                    >
                      {evt.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1E2A44]/75 leading-relaxed line-clamp-3 mb-4">
                    {evt.summary}
                  </p>
                </div>

                {/* Footer details: Location & Read More */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-gray-500 truncate max-w-[200px]">
                    <MapPin size={13} className="shrink-0 text-gray-400" />
                    <span className="truncate">{evt.location}</span>
                  </span>
                  
                  <Link
                    to={`/school-events/${evt.slug}`}
                    className="inline-flex items-center gap-1 text-[#1E2A44] font-black hover:text-[#E8B923] transition-colors group/link shrink-0"
                  >
                    <span>Read More</span>
                    <ArrowRight
                      size={13}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
