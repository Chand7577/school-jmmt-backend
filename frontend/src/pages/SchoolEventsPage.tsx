import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { schoolEventsData, SchoolEvent } from "../data/eventsData";
import { API_BASE_URL } from "../config/api";
import eventsHeroBg from "../assets/events-hero-bg.jpg";
import {
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "../components/ui/Icons";

const filterTabs = [
  { id: "all", label: "All Gatherings" },
  { id: "sports", label: "Sports & Athletics", match: ["sports"] },
  { id: "craft", label: "Loom & Craft", match: ["craft", "arts & vocational"] },
  { id: "music", label: "Music & Rhythms", match: ["performing", "music"] },
  { id: "science", label: "Science & Nature", match: ["science", "community & eco"] },
  { id: "cultural", label: "Heritage Festivals", match: ["cultural", "national", "exchange"] },
];

const SchoolEventsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allEvents, setAllEvents] = useState<SchoolEvent[]>(schoolEventsData);
  const [viewMode, setViewMode] = useState<"bento" | "timeline">("bento");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadLiveEvents = async () => {
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
          setAllEvents(liveFormatted);
        }
      } catch (err) {
        console.warn("Using curated school events data:", err);
      }
    };

    loadLiveEvents();
  }, []);

  // Filter & Search Logic
  const filteredEvents = useMemo(() => {
    return allEvents.filter((evt) => {
      let matchesCategory = true;
      if (selectedFilter !== "all") {
        const catConfig = filterTabs.find((c) => c.id === selectedFilter);
        if (catConfig?.match) {
          const eventCat = evt.category.toLowerCase();
          matchesCategory = catConfig.match.some((k) => eventCat.includes(k));
        }
      }

      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          evt.title.toLowerCase().includes(q) ||
          evt.summary.toLowerCase().includes(q) ||
          evt.location.toLowerCase().includes(q) ||
          evt.month.toLowerCase().includes(q) ||
          evt.category.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [allEvents, selectedFilter, searchQuery]);

  // Featured flagship event is the first item
  const featuredEvent = filteredEvents[0] || allEvents[0];
  const secondaryEvents = filteredEvents.slice(1);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E2A44]">
      {/* ── 1. CINEMATIC EDITORIAL MASTHEAD WITH SCHOOL GALLERY BACKGROUND ── */}
      <header className="relative bg-[#1E2A44] text-white pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background photo from school gallery */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={eventsHeroBg}
            alt="Students gathered at JMMS outdoor amphitheatre"
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.7] saturate-[1.1] opacity-95"
          />
          {/* Subtle semi-transparent overlays so the photo remains clearly visible while text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A44]/80 via-[#1E2A44]/50 to-[#1E2A44]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44] via-transparent to-[#1E2A44]/30" />
        </div>

        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[500px] bg-[#E8B923]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Gold hairline rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white/90 hover:text-white text-xs font-semibold border border-white/10 transition-all group shadow-sm"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Campus Home</span>
            </Link>

            <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 hidden sm:inline-block">
              Salangaon Foothills · Estd. 1985
            </span>
          </div>

          {/* Masthead Header Title & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#E8B923]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#E8B923] uppercase">
                  Campus Life &amp; Celebrations Archive
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                Where curiosity finds <br />
                <span className="font-black text-[#E8B923] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  its joyful voice.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                Explore our annual sports tournaments, traditional loom expos, classical Himalayan recitals, and village community drives in Salangaon.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. MAIN BODY SECTION (Search & Filters placed cleanly above events) ── */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        {/* Interactive Control Console: Placed right above events */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] mb-12 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Keyword Search */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E2A44]/40 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sports, loom, music, science, or dates..."
                className="w-full pl-11 pr-14 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#1E2A44]/10 text-[#1E2A44] placeholder:text-[#1E2A44]/40 text-xs sm:text-sm focus:outline-none focus:border-[#E8B923] focus:ring-1 focus:ring-[#E8B923] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E2A44]/50 hover:text-[#1E2A44] text-xs font-mono font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Toggle: Bento vs Timeline */}
            <div className="flex items-center gap-1 bg-[#FDFBF7] p-1 rounded-2xl border border-[#1E2A44]/10 self-start md:self-center">
              <button
                onClick={() => setViewMode("bento")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "bento"
                    ? "bg-[#1E2A44] text-white shadow-sm"
                    : "text-[#1E2A44]/60 hover:text-[#1E2A44]"
                }`}
              >
                Featured Showcase
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "timeline"
                    ? "bg-[#1E2A44] text-white shadow-sm"
                    : "text-[#1E2A44]/60 hover:text-[#1E2A44]"
                }`}
              >
                Chronological Ledger
              </button>
            </div>
          </div>

          {/* Filter Pills & Live Event Count */}
          <div className="pt-3 border-t border-[#1E2A44]/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {filterTabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    selectedFilter === cat.id
                      ? "bg-[#E8B923] text-[#1E2A44] font-bold shadow-sm"
                      : "bg-[#FDFBF7] hover:bg-stone-100 text-[#1E2A44]/70 hover:text-[#1E2A44] border border-[#1E2A44]/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-[#1E2A44]/50 font-mono">
              Showing <strong className="text-[#1E2A44] font-bold">{filteredEvents.length}</strong> events
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          /* Empty Search Feedback */
          <div className="bg-white rounded-3xl border border-[#1E2A44]/10 p-12 lg:p-16 text-center max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8B923]/15 text-[#1E2A44] flex items-center justify-center mx-auto">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1E2A44]">No campus gatherings match your search</h3>
            <p className="text-xs sm:text-sm text-[#1E2A44]/65 leading-relaxed font-light">
              No results found for &ldquo;{searchQuery}&rdquo;. Try another term or reset your category filters.
            </p>
            <button
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[#1E2A44] text-white font-bold text-xs hover:bg-[#28385a] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "bento" ? (
          /* ── BENTO SHOWCASE VIEW ── */
          <div className="space-y-12">
            {/* ── Hero Spotlight Event Plate (Full-bleed Asymmetric 2-Col Card) ── */}
            {featuredEvent && (
              <section className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_30px_rgba(30,42,68,0.06)] overflow-hidden group transition-all duration-500 hover:shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left (Hero Photo) */}
                  <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-[#162035] overflow-hidden">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Hero Tag */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#E8B923] text-[#1E2A44] text-[10px] font-black uppercase tracking-widest shadow-md">
                        Flagship Feature
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E2A44] text-[10px] font-bold uppercase tracking-wider">
                        {featuredEvent.category}
                      </span>
                    </div>

                    {/* Bottom Photo Caption */}
                    <div className="absolute bottom-6 left-6 right-6 text-white text-xs opacity-90 hidden sm:block">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-amber-300">
                        Campus Tradition · Village Salangaon
                      </p>
                    </div>
                  </div>

                  {/* Right (Hero Details) */}
                  <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                    <div>
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-3 mb-6 pb-4 border-b border-[#1E2A44]/10">
                        <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#1E2A44]">
                          <span className="text-[#E8B923]">{featuredEvent.day}</span>
                          <span className="text-base font-bold text-[#1E2A44] uppercase tracking-wider">
                            {featuredEvent.month} {featuredEvent.year}
                          </span>
                        </div>
                        {featuredEvent.time && (
                          <>
                            <span className="text-stone-300">•</span>
                            <span className="flex items-center gap-1.5 text-xs text-[#1E2A44]/65 font-medium">
                              <Clock size={13} className="text-[#E8B923]" />
                              <span>{featuredEvent.time}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-[#1E2A44] leading-tight group-hover:text-[#E8B923] transition-colors mb-4">
                        <Link to={`/school-events/${featuredEvent.slug}`}>
                          {featuredEvent.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-[#1E2A44]/75 leading-relaxed font-normal mb-6">
                        {featuredEvent.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#1E2A44]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#1E2A44]/70">
                        <MapPin size={14} className="text-[#E8B923] shrink-0" />
                        <span className="font-medium">{featuredEvent.location}</span>
                      </span>

                      <Link
                        to={`/school-events/${featuredEvent.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E2A44] text-white hover:bg-amber-500 hover:text-[#1E2A44] text-xs font-bold transition-all group/btn shadow-md"
                      >
                        <span>Full Event Dispatch</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ── Asymmetric Bento Grid for Secondary Events ── */}
            {secondaryEvents.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2A44]/10">
                  <h3 className="text-lg font-bold text-[#1E2A44]">
                    More Gatherings &amp; Celebrations
                  </h3>
                  <span className="text-xs text-[#1E2A44]/50 font-mono">
                    {secondaryEvents.length} events archived
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {secondaryEvents.map((evt) => {
                    return (
                      <article
                        key={evt.id}
                        className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] hover:shadow-xl hover:border-[#1E2A44]/20 transition-all duration-500 overflow-hidden flex flex-col justify-between group col-span-1"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative w-full overflow-hidden bg-[#162035] h-56">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/80 via-transparent to-transparent pointer-events-none" />

                            {/* Floating Date Badge */}
                            <div className="absolute top-4 left-4 bg-[#1E2A44]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/10 flex items-center gap-2">
                              <span className="text-xl font-black text-amber-300 leading-none">
                                {evt.day}
                              </span>
                              <div className="flex flex-col text-left leading-none">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                                  {evt.month}
                                </span>
                                <span className="text-[9px] text-white/50">{evt.year}</span>
                              </div>
                            </div>

                            {/* Category Pill */}
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#1E2A44] backdrop-blur-md shadow-sm">
                                {evt.category}
                              </span>
                            </div>

                            {evt.time && (
                              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                                <Clock size={12} className="text-amber-300" />
                                <span>{evt.time}</span>
                              </div>
                            )}
                          </div>

                          {/* Body */}
                          <div className="p-7">
                            <h4 className="text-lg sm:text-xl font-bold text-[#1E2A44] leading-snug group-hover:text-[#E8B923] transition-colors line-clamp-2">
                              <Link to={`/school-events/${evt.slug}`}>
                                {evt.title}
                              </Link>
                            </h4>
                            <p className="text-xs sm:text-sm text-[#1E2A44]/70 leading-relaxed line-clamp-3 mt-3 font-normal">
                              {evt.summary}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-7 pb-7 pt-4 border-t border-[#1E2A44]/5 flex items-center justify-between text-xs text-[#1E2A44]/70">
                          <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                            <MapPin size={13} className="shrink-0 text-[#E8B923]" />
                            <span className="truncate">{evt.location}</span>
                          </span>

                          <Link
                            to={`/school-events/${evt.slug}`}
                            className="inline-flex items-center gap-1 font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors shrink-0 group/link"
                          >
                            <span>Read Story</span>
                            <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── CHRONOLOGICAL LEDGER VIEW ── */
          <div className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_30px_rgba(30,42,68,0.04)] overflow-hidden divide-y divide-[#1E2A44]/10">
            {filteredEvents.map((evt, idx) => (
              <div
                key={evt.id}
                className="p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#FDFBF7]/60 transition-colors group"
              >
                {/* Date Plate */}
                <div className="flex items-center gap-6 shrink-0 lg:w-48">
                  <span className="font-mono text-xs text-[#1E2A44]/30 font-bold">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1E2A44] group-hover:text-[#E8B923] transition-colors">
                      {evt.day}
                    </span>
                    <div className="flex flex-col text-left text-xs leading-none">
                      <span className="font-bold text-[#1E2A44] uppercase">{evt.month}</span>
                      <span className="text-[#1E2A44]/50">{evt.year}</span>
                    </div>
                  </div>
                </div>

                {/* Event Core Info */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E8B923]">
                      {evt.category}
                    </span>
                    {evt.time && (
                      <span className="text-[11px] text-[#1E2A44]/50 font-medium">
                        • {evt.time}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#1E2A44] group-hover:text-[#E8B923] transition-colors leading-snug">
                    <Link to={`/school-events/${evt.slug}`}>
                      {evt.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E2A44]/65 leading-relaxed line-clamp-2 max-w-2xl font-light">
                    {evt.summary}
                  </p>
                </div>

                {/* Location & Action Link */}
                <div className="shrink-0 flex items-center gap-6 self-end lg:self-center">
                  <span className="text-xs text-[#1E2A44]/60 hidden sm:flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#E8B923]" />
                    <span>{evt.location}</span>
                  </span>

                  <Link
                    to={`/school-events/${evt.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E2A44] text-white hover:bg-[#E8B923] hover:text-[#1E2A44] text-xs font-bold transition-all shadow-sm group/btn"
                  >
                    <span>Read Dispatch</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 3. BOTTOM VISITOR INVITATION PLATE ── */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#1E2A44] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl text-left relative z-10">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
                Community Access &amp; Celebrations
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white/95">
              Would you like to attend our <br className="hidden sm:inline" />
              <span className="font-black text-[#E8B923]">next campus gathering?</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              All JMMS festivals, sports meets, loom exhibitions, and classical recitals are open to parents, community elders, and education well-wishers across the Doon Valley.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 relative z-10">
            <Link
              to="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-bold text-xs hover:bg-amber-400 transition-all shadow-lg shadow-[#E8B923]/20"
            >
              <span>Contact School Office</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              <span>Our 40-Year Story</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SchoolEventsPage;
