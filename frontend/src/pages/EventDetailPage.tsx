import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { schoolEventsData, SchoolEvent } from "../data/eventsData";
import schoolEventsBanner from "../assets/school-events.jpg";
import { API_BASE_URL } from "../config/api";
import {
  Clock,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Landmark,
  Check,
} from "../components/ui/Icons";

const formatDbEvent = (e: any): SchoolEvent => {
  const d = new Date(e.event_date);
  const slug = e.title
    ? e.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : `event-${e.id}`;

  return {
    id: `db-${e.id}`,
    slug: slug || `event-${e.id}`,
    title: e.title,
    category: e.event_type
      ? e.event_type.charAt(0).toUpperCase() + e.event_type.slice(1)
      : "School Event",
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
    time: `${e.start_time?.slice(0, 5) || "09:00"} – ${
      e.end_time?.slice(0, 5) || "14:00"
    }`,
    location: e.location || "JMMS Campus, Salangaon",
    summary:
      e.description || "School event organized at John Martyn Memorial School.",
    fullDescription: e.description
      ? [e.description]
      : ["Join us for this special campus event at John Martyn Memorial School."],
    image: e.image_url || schoolEventsBanner,
    badgeColor: "bg-amber-100 text-amber-800",
  };
};

const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<SchoolEvent | null>(() => {
    return (
      schoolEventsData.find((e) => e.slug === slug || e.id === slug) || null
    );
  });
  const [loading, setLoading] = useState<boolean>(!event);
  const [otherEvents, setOtherEvents] = useState<SchoolEvent[]>(() => {
    return schoolEventsData.filter((e) => e.slug !== slug).slice(0, 4);
  });
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadEventData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events/index.php?status=active`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveEvents = json.data.map(formatDbEvent);
          const found = liveEvents.find(
            (e: SchoolEvent) =>
              e.slug === slug ||
              e.id === slug ||
              e.id === `db-${slug}` ||
              e.title.toLowerCase().trim() === slug?.toLowerCase().trim()
          );

          if (found) {
            setEvent(found);
            const otherLive = liveEvents.filter(
              (e: SchoolEvent) => e.slug !== found.slug && e.id !== found.id
            );
            setOtherEvents(
              (otherLive.length > 0 ? otherLive : schoolEventsData.filter((e) => e.slug !== found.slug)).slice(0, 4)
            );
          } else {
            const staticFound = schoolEventsData.find(
              (e) => e.slug === slug || e.id === slug
            );
            if (staticFound) {
              setEvent(staticFound);
              setOtherEvents(schoolEventsData.filter((e) => e.slug !== staticFound.slug).slice(0, 4));
            }
          }
        }
      } catch (err) {
        console.warn("Could not load event detail from API:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-10 h-10 border-2 border-[#1E2A44] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#1E2A44]/50 font-bold">
          Loading event story...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="bg-white rounded-3xl border border-[#1E2A44]/10 p-12 max-w-md shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-[#1E2A44]">Event Not Found</h2>
          <p className="text-xs text-[#1E2A44]/65 leading-relaxed font-light">
            The campus gathering you are looking for does not exist or has been archived.
          </p>
          <Link
            to="/school-events"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E2A44] text-white font-bold text-xs hover:bg-[#28385a] transition-all"
          >
            <span>View All Events</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E2A44]">
      {/* ── 1. EDITORIAL EVENT MASTHEAD ── */}
      <header className="relative bg-[#1E2A44] text-white pt-28 pb-14 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[500px] bg-[#E8B923]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Gold hairline rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />

        {/* Expanded container for wide displays */}
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white/90 hover:text-white text-xs font-semibold border border-white/10 transition-all group shadow-sm cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Events</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/school-events" className="hover:text-white transition-colors">Events</Link>
              <span>/</span>
              <span className="text-[#E8B923] truncate max-w-[240px] font-bold">{event.title}</span>
            </div>
          </div>

          {/* Event Header Details */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#E8B923] uppercase">
                {event.category} · Salangaon Campus
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {event.title}
            </h1>

            {/* Quick meta strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#E8B923]" />
                <span className="font-bold text-white">{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#E8B923]" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-[#E8B923]" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. MAIN STORY SECTION (Wider Container + Gap-Filled Sidebar) ── */}
      <main className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* ── LEFT COLUMN (8 Cols): Story Narrative & Photos ── */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {/* Featured Hero Banner Image */}
            <div className="relative w-full h-[340px] sm:h-[480px] rounded-3xl overflow-hidden bg-[#162035] shadow-xl border border-[#1E2A44]/10">
              <img
                src={event.image || schoolEventsBanner}
                alt={event.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = schoolEventsBanner;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Date Badge */}
              <div className="absolute bottom-6 left-6 bg-[#1E2A44]/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5">
                <span className="text-2xl font-black text-amber-300 leading-none">
                  {event.day}
                </span>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                    {event.month}
                  </span>
                  <span className="text-[10px] text-white/50">{event.year}</span>
                </div>
              </div>

              {/* Category Pill on Image */}
              <div className="absolute top-6 right-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#1E2A44] shadow-md backdrop-blur-sm">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Article Narrative Body */}
            <div className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_30px_rgba(30,42,68,0.04)] p-7 sm:p-12 space-y-6">
              {event.fullDescription.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`leading-[1.8] ${
                    idx === 0
                      ? "text-lg sm:text-xl font-bold text-[#1E2A44] leading-snug border-l-2 border-[#E8B923] pl-5"
                      : "text-sm sm:text-base text-[#1E2A44]/80 font-normal"
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              {/* Photo Highlights Gallery (If Available) */}
              {event.galleryImages && event.galleryImages.length > 0 && (
                <div className="pt-8 border-t border-[#1E2A44]/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E2A44]">
                        Event Photo Highlights
                      </h3>
                      <p className="text-xs text-[#1E2A44]/60">
                        Moments captured during the gathering
                      </p>
                    </div>
                    <span className="text-xs text-[#1E2A44]/50 font-mono">
                      {event.galleryImages.length} Photographs
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {event.galleryImages.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden shadow-sm h-64 bg-stone-100 border border-[#1E2A44]/5 group relative"
                      >
                        <img
                          src={imgUrl}
                          alt={`${event.title} highlight ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = schoolEventsBanner;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dispatch Footnote & Quick Share */}
              <div className="pt-8 border-t border-[#1E2A44]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#1E2A44]/60">
                <p className="font-mono text-[11px]">
                  Dispatch published by JMMS Editorial Office · Salangaon Campus
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleShare}
                    className="font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-600" />
                        <span className="text-emerald-600">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>Share Story</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                  <span className="text-stone-300">|</span>
                  <Link
                    to="/#contact"
                    className="font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors"
                  >
                    Contact School →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (4 Cols): Enriched Sidebar (No Gaps) ── */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* CARD 1: Quick Fact Ledger Card */}
            <div className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2A44]/10">
                <h3 className="text-base font-bold text-[#1E2A44]">
                  Event Information
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-bold">
                  Salangaon
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44] shrink-0 mt-0.5">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                      Date of Gathering
                    </span>
                    <span className="font-bold text-sm text-[#1E2A44]">{event.date}</span>
                  </div>
                </div>

                {/* Time */}
                {event.time && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44] shrink-0 mt-0.5">
                      <Clock size={15} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                        Schedule
                      </span>
                      <span className="font-bold text-sm text-[#1E2A44]">{event.time}</span>
                    </div>
                  </div>
                )}

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44] shrink-0 mt-0.5">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                      Venue &amp; Location
                    </span>
                    <span className="font-bold text-sm text-[#1E2A44]">{event.location}</span>
                  </div>
                </div>

                {/* Access */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#E8B923] shrink-0 mt-0.5">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                      Community Access
                    </span>
                    <span className="font-bold text-xs text-[#1E2A44]">
                      Free Entry · Parents, Alumni &amp; Well-wishers Welcome
                    </span>
                  </div>
                </div>

                {/* Organization */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E2A44]/5 flex items-center justify-center text-[#1E2A44] shrink-0 mt-0.5">
                    <Landmark size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                      Organized By
                    </span>
                    <span className="font-bold text-xs text-[#1E2A44]">
                      John Martyn Memorial Trust &amp; Faculty
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1E2A44]/10 space-y-2.5">
                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1E2A44] text-white hover:bg-[#28385a] text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Link Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <span>Share Event with Friends</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>

                <Link
                  to="/school-events"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FDFBF7] hover:bg-stone-100 text-[#1E2A44] border border-[#1E2A44]/10 text-xs font-bold transition-all"
                >
                  <ArrowLeft size={13} />
                  <span>Browse All Events</span>
                </Link>
              </div>
            </div>

            {/* CARD 2: Upcoming Events Quick Feed (Directly fills the vertical space!) */}
            <div className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2A44]/10">
                <h3 className="text-base font-bold text-[#1E2A44]">
                  Upcoming Gatherings
                </h3>
                <Link
                  to="/school-events"
                  className="text-[11px] font-bold text-[#E8B923] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {otherEvents.slice(0, 3).map((oe) => (
                  <Link
                    key={oe.id}
                    to={`/school-events/${oe.slug}`}
                    className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-2xl hover:bg-[#FDFBF7] border border-transparent hover:border-[#1E2A44]/5 transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative border border-[#1E2A44]/10">
                      <img
                        src={oe.image}
                        alt={oe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = schoolEventsBanner;
                        }}
                      />
                      <div className="absolute top-1 left-1 bg-[#1E2A44]/90 text-amber-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                        {oe.day} {oe.month}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                        {oe.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#1E2A44] group-hover:text-[#E8B923] transition-colors leading-snug line-clamp-2 mt-0.5">
                        {oe.title}
                      </h4>
                      <span className="text-[11px] font-medium text-[#1E2A44]/60 mt-1 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Read details</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CARD 3: Support Campus Life / Donations Appeal */}
            <div className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] p-6 sm:p-7 space-y-4">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#E8B923]">
                <Heart size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-bold block">
                  Support Our Mission
                </span>
                <h4 className="text-sm font-bold text-[#1E2A44] mt-0.5 leading-snug">
                  Power Student Sports &amp; Cultural Fairs
                </h4>
              </div>
              <p className="text-xs text-[#1E2A44]/75 leading-relaxed font-light">
                John Martyn Memorial School is a charitable institution providing high-quality free education and hot midday meals to 160+ rural children.
              </p>
              <Link
                to="/#support"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#E8B923] hover:bg-[#d4a81f] text-[#1E2A44] text-xs font-bold transition-all shadow-sm group"
              >
                <span>Support Student Activities</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* CARD 4: School Tradition Host Card */}
            <div className="bg-[#1E2A44] text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden space-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8B923]/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[10px] font-mono tracking-widest text-[#E8B923] uppercase font-bold">
                About JMMS Gatherings
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                Childhood Celebrated in the Foothills
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Every event at John Martyn Memorial School is organized with student dignity, village participation, and non-commercial values at heart.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-white/60 font-mono">
                <MapPin size={12} className="text-[#E8B923]" />
                <span>Salangaon, Dehradun, Uttarakhand</span>
              </div>
            </div>

          </aside>

        </div>

        {/* ── 3. RELATED CAMPUS GATHERINGS (Bottom Wide Showcase) ── */}
        <section className="mt-16 lg:mt-24 pt-14 border-t border-[#1E2A44]/10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8B923] font-bold">
                More Campus Dispatches
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1E2A44] mt-1">
                Other Notable School Events
              </h3>
            </div>

            <Link
              to="/school-events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors group"
            >
              <span>View Full Calendar ({schoolEventsData.length} Events)</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherEvents.slice(0, 3).map((evt) => (
              <article
                key={evt.id}
                className="bg-white rounded-3xl border border-[#1E2A44]/10 shadow-[0_4px_24px_rgba(30,42,68,0.04)] hover:shadow-xl hover:border-[#1E2A44]/20 transition-all duration-500 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#162035]">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = schoolEventsBanner;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/75 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 bg-[#1E2A44]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/10 flex items-center gap-2">
                      <span className="text-base font-black text-amber-300 leading-none">
                        {evt.day}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        {evt.month}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#1E2A44]">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-base font-bold text-[#1E2A44] leading-snug group-hover:text-[#E8B923] transition-colors line-clamp-2">
                      <Link to={`/school-events/${evt.slug}`}>
                        {evt.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[#1E2A44]/70 leading-relaxed line-clamp-2 mt-2">
                      {evt.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#1E2A44]/5 flex items-center justify-between text-xs text-[#1E2A44]/70">
                  <span className="truncate max-w-[170px] flex items-center gap-1">
                    <MapPin size={12} className="text-[#E8B923] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </span>

                  <Link
                    to={`/school-events/${evt.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors group/link"
                  >
                    <span>Read</span>
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventDetailPage;
