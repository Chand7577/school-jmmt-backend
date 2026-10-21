import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ZigzagDivider from "./ZigzagDivider";
import heroImg from "../assets/hero-img.png";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".h-label",   { opacity: 0 },            { opacity: 1, duration: 0.5 }, 0.2)
        .fromTo(".h-line-1",  { y: 60, opacity: 0 },     { y: 0, opacity: 1, duration: 0.8 }, 0.35)
        .fromTo(".h-line-2",  { y: 60, opacity: 0 },     { y: 0, opacity: 1, duration: 0.8 }, 0.5)
        .fromTo(".h-line-3",  { y: 60, opacity: 0 },     { y: 0, opacity: 1, duration: 0.8 }, 0.65)
        .fromTo(".h-body",    { y: 20, opacity: 0 },     { y: 0, opacity: 1, duration: 0.6 }, 0.9)
        .fromTo(".h-actions", { y: 16, opacity: 0 },     { y: 0, opacity: 1, duration: 0.5 }, 1.05)
        .fromTo(".h-photo",   { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, 0.1)
        .fromTo(".h-stats",   { opacity: 0 },            { opacity: 1, duration: 0.6 }, 1.15);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-[#1E2A44] overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Floating background decorative icons — subtle, left panel only */}
      <div className="absolute left-6 top-20 hidden lg:block opacity-20 animate-float-slow pointer-events-none z-10">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="absolute left-[44%] top-28 hidden lg:block opacity-20 animate-float pointer-events-none z-10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      {/* ── Split layout ── */}
      <div className="flex flex-col lg:flex-row min-h-[100svh]">

        {/* ── LEFT: Content ── */}
        <div className="relative z-10 flex flex-col justify-between
                        w-full lg:w-[52%]
                        px-8 sm:px-12 lg:px-16 xl:px-20
                        pt-32 pb-16 lg:pt-36 lg:pb-20">

          {/* Top: location label */}
          <div className="h-label flex items-center gap-2.5 mb-auto">
            <span className="block w-6 h-px bg-[#E8B923]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] text-[#E8B923] uppercase">
              Salangaon, Dehradun
            </span>
          </div>

          {/* Middle: Big headline */}
          <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">
            {/* Overflow clip per line for theatrical reveal */}
            <div className="overflow-hidden">
              <p className="h-line-1
                            text-[clamp(2.8rem,6.5vw,5.2rem)]
                            font-extralight leading-[1.08] tracking-tight
                            text-white/80">
                Giving rural
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="h-line-2
                            text-[clamp(2.8rem,6.5vw,5.2rem)]
                            font-extralight leading-[1.08] tracking-tight
                            text-white/80">
                children the
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="h-line-3
                            text-[clamp(2.8rem,6.5vw,5.2rem)]
                            font-black leading-[1.08] tracking-tight
                            text-[#E8B923]">
                future they deserve.
              </p>
            </div>

            {/* Body */}
            <p className="h-body mt-8 lg:mt-10
                          text-sm sm:text-[15px] text-white/40
                          leading-[1.9] font-light
                          max-w-[380px]">
              John Martyn Memorial School has served underprivileged children
              in Uttarakhand since 1985 — through education, skill-building,
              and community care.
            </p>

            {/* Actions */}
            <div className="h-actions mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Music note floating just left of the button */}
              <div className="relative flex items-center">
                <div className="absolute -left-8 -top-4 opacity-20 animate-float-delayed pointer-events-none hidden sm:block">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <a
                  href="#offers"
                  className="inline-flex items-center gap-3 px-8 py-3.5
                             bg-[#E8B923] text-[#1E2A44]
                             rounded-full text-sm font-bold
                             hover:bg-amber-300 transition-colors
                             shadow-[0_8px_30px_rgba(232,185,35,0.25)]"
                >
                  Explore the school
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <Link
                to="/about/history"
                className="text-[13px] text-white/35 hover:text-white/70
                           transition-colors tracking-wide font-light"
              >
                40 years of history →
              </Link>
            </div>
          </div>

          {/* Bottom: three micro-stats + nearby floating icons */}
          <div className="relative">
            {/* Floating icons near the stats row */}
            <div className="absolute -top-10 right-10 hidden lg:block opacity-15 animate-float-slow pointer-events-none">
              {/* Pencil */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
              </svg>
            </div>
            <div className="absolute -top-6 right-32 hidden lg:block opacity-15 animate-float pointer-events-none">
              {/* Star */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="absolute -top-14 right-56 hidden lg:block opacity-15 animate-float-delayed pointer-events-none">
              {/* Music note */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>

            <div className="absolute -top-14 right-56 hidden lg:block opacity-15 animate-float-delayed pointer-events-none">
              {/* Music note */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>

            <div className="h-stats flex items-end gap-10 sm:gap-14 pt-8 border-t border-white/[0.07]">
              {[
                { value: "194",    unit: "Students" },
                { value: "14",     unit: "Teachers" },
                { value: "2,500+", unit: "Books" },
              ].map(({ value, unit }) => (
                <div key={unit}>
                  <p className="text-xl sm:text-2xl font-black text-white tracking-tight">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mt-1">{unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Full-height photo panel ── */}
        <div className="h-photo relative
                        w-full lg:w-[48%]
                        h-[50vw] lg:h-auto
                        flex-shrink-0 overflow-hidden
                        bg-[#162035]">

          {/* The school photo — full-bleed, no border, no card */}
          <img
            src={heroImg}
            alt="Students of John Martyn Memorial School, Salangaon"
            className="absolute inset-0 w-full h-full object-cover object-center
                       opacity-80"
          />

          {/* Left-edge gradient so photo bleeds into text panel smoothly */}
          <div className="absolute inset-y-0 left-0 w-32
                          bg-gradient-to-r from-[#1E2A44] to-transparent
                          pointer-events-none" />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40
                          bg-gradient-to-t from-[#162035]/80 to-transparent
                          pointer-events-none" />

          {/* Small caption bottom-right */}
          <p className="absolute bottom-6 right-6
                        text-[10px] uppercase tracking-[0.2em] text-white/25
                        hidden lg:block">
            Est. 1985 · Uttarakhand
          </p>
        </div>
      </div>

      {/* Zigzag Divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0] z-20">
        <ZigzagDivider color="#FDFBF7" height={48} />
      </div>
    </section>
  );
};

export default Hero;
