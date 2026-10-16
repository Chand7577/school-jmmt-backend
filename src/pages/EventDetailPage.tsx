import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { schoolEventsData } from "../data/eventsData";
import ZigzagCard from "../components/ZigzagCard";
import schoolEventsBanner from "../assets/school-events.jpg";

const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const event = schoolEventsData.find((e) => e.slug === slug || e.id === slug);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-black text-[#1E2A44] mb-3">Event Not Found</h2>
        <p className="text-gray-600 mb-6">The event you are looking for does not exist or has been moved.</p>
        <Link
          to="/school-events"
          className="px-6 py-2.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-sm hover:bg-amber-400 transition-all"
        >
          View All School Events
        </Link>
      </div>
    );
  }

  // Related events (other events)
  const otherEvents = schoolEventsData.filter((e) => e.slug !== event.slug).slice(0, 2);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 text-xs font-bold text-gray-500">
          <Link to="/" className="hover:text-[#1E2A44]">Home</Link>
          <span>/</span>
          <Link to="/school-events" className="hover:text-[#1E2A44]">School Events</Link>
          <span>/</span>
          <span className="text-[#E8B923] truncate">{event.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-black text-[#1E2A44] hover:text-amber-600 mb-6 transition-colors"
        >
          <span>← Back to previous page</span>
        </button>

        {/* Main Event Article Card */}
        <article className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden mb-12">
          {/* Hero Banner Image */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-gray-100">
            <img
              src={schoolEventsBanner}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                <span>{event.category}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Event Meta Ribbon */}
          <div className="bg-[#1E2A44] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
            <div className="flex items-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">📅</span>
                <span className="font-bold">{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">🕒</span>
                  <span className="text-white/80">{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-amber-400">📍</span>
                <span className="text-white/80">{event.location}</span>
              </div>
            </div>

            <Link
              to="/school-events"
              className="text-xs font-bold text-amber-300 hover:underline"
            >
              All Events →
            </Link>
          </div>

          {/* Article Body Content */}
          <div className="p-8 sm:p-12 space-y-6 text-[#1E2A44]/85 leading-relaxed text-base sm:text-lg">
            {event.fullDescription.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "text-lg sm:text-xl font-bold text-[#1E2A44] leading-snug" : ""}>
                {paragraph}
              </p>
            ))}

            {/* Optional Gallery if present */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-black text-[#1E2A44] mb-4">Event Photo Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.galleryImages.map((imgUrl, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-md h-56 bg-gray-50">
                      <img
                        src={imgUrl}
                        alt={`${event.title} snapshot ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Other Notable School Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-[#1E2A44]">
              More School Events
            </h3>
            <Link
              to="/school-events"
              className="text-xs font-black text-[#E8B923] hover:text-amber-600"
            >
              View Full Calendar →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {otherEvents.map((evt) => (
              <ZigzagCard
                key={evt.id}
                color="#FFFFFF"
                toothSize={6}
                variant="zigzag"
                className="h-full"
                innerClassName="flex flex-col justify-between h-full p-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${evt.badgeColor}`}>
                      {evt.category}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">
                      {evt.date}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1E2A44] mb-2 leading-snug">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-[#1E2A44]/75 line-clamp-2 leading-relaxed">
                    {evt.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">📍 {evt.location}</span>
                  <Link
                    to={`/school-events/${evt.slug}`}
                    className="text-xs font-black text-[#1E2A44] hover:text-amber-600"
                  >
                    Read More →
                  </Link>
                </div>
              </ZigzagCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
