import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { galleryImages, galleryCategories, GalleryCategory, GalleryImage } from "../data/galleryData";

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({});

  const filtered: GalleryImage[] =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prev = useCallback(() =>
    setLightbox((l) => ({ ...l, index: (l.index - 1 + filtered.length) % filtered.length })),
    [filtered.length]
  );
  const next = useCallback(() =>
    setLightbox((l) => ({ ...l, index: (l.index + 1) % filtered.length })),
    [filtered.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);

  const currentImg = filtered[lightbox.index];

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E2A44]">

      {/* ── HEADER ── */}
      <header className="relative bg-[#1E2A44] text-white pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#E8B923]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8B923] font-semibold">Gallery</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#E8B923]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#E8B923] uppercase">
                  School Life
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Our Gallery
              </h1>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                A glimpse into everyday life at John Martyn Memorial School — classrooms, events, campus, and the smiling faces that make it all worthwhile.
              </p>
            </div>

            {/* Photo count badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-xs font-semibold text-white/80 shrink-0">
              <Images className="w-4 h-4 text-[#E8B923]" />
              <span>{galleryImages.length} Photos</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── CATEGORY FILTERS ── */}
      <div className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1E2A44]/8 shadow-sm">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {galleryCategories.map((cat) => {
            const count = cat === "All" ? galleryImages.length : galleryImages.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1E2A44] text-white shadow-sm"
                    : "bg-white text-[#1E2A44]/70 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
      <main className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">No photos in this category yet.</div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl bg-stone-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Skeleton shimmer until loaded */}
                {!imgLoaded[img.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 animate-pulse rounded-xl" />
                )}

                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  onLoad={() => setImgLoaded((prev) => ({ ...prev, [img.id]: true }))}
                  className={`w-full object-cover rounded-xl transition-all duration-500 group-hover:scale-[1.03] ${
                    imgLoaded[img.id] ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#1E2A44]/0 group-hover:bg-[#1E2A44]/30 transition-all duration-300 rounded-xl flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-[10px] font-semibold uppercase tracking-wider bg-[#1E2A44]/60 px-2 py-1 rounded-full backdrop-blur-sm">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── LIGHTBOX ── */}
      {lightbox.open && currentImg && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
            {lightbox.index + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            src={currentImg.src}
            alt={currentImg.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Category tag at bottom */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {currentImg.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
