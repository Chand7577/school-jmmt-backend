import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ZigzagDivider from "./ZigzagDivider";
import heroImg from "../assets/hero-img.png";

if (typeof window !== "undefined") {
  // gsap is already loaded — just ensure no duplicate plugin warning
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left column — staggered fade-up sequence
      tl.fromTo(".hero-pill",   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo(".hero-h1",     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.3")
        .fromTo(".hero-sub",    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-chips",  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5  }, "-=0.3")
        .fromTo(".hero-ctas",   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5  }, "-=0.3")
        // Right column — slides in from the right
        .fromTo(".hero-visual", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75 }, "-=0.55");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative bg-gradient-to-b from-[#1E2A44] via-[#1E2A44] to-[#162035] text-white overflow-hidden pt-10 pb-36 sm:pb-28 lg:pt-16 lg:pb-32">
      {/* Background glowing ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating background decorative icons */}
      <div className="absolute left-6 top-16 hidden lg:block opacity-20 animate-float-slow">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="absolute right-12 top-24 hidden lg:block opacity-20 animate-float">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="hero-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-bold text-amber-300 shadow-sm animate-pulse-subtle">
              <span className="w-2 h-2 rounded-full bg-[#E8B923]"></span>
              <span>Village Salangaon, Dehradun • Since 1985</span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Welcome to{" "}
              <span className="text-[#E8B923] relative inline-block">
                JMMS,
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E8B923]/40"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,0 100,7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Where Dreams Begin.
            </h1>

            {/* Subtext */}
            <p className="hero-sub text-base sm:text-lg text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              At <strong className="text-white font-semibold">John Martyn Memorial School</strong>, 
              we empower rural children in Dehradun with enlightened primary education, 
              creative skill development, and community-driven mentorship in a joyful, nurturing atmosphere.
            </p>

            {/* Key mini highlights */}
            <div className="hero-chips pt-2 flex flex-wrap gap-4 justify-center lg:justify-start text-xs font-semibold text-white/90">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
                <span className="text-amber-400">✓</span> 194 Active Students
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
                <span className="text-amber-400">✓</span> 14 Qualified Teachers
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
                <span className="text-amber-400">✓</span> 2,500+ Books
              </div>
            </div>

            {/* Call to Actions */}
            <div className="hero-ctas pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#offers"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-extrabold text-sm hover:bg-amber-400 shadow-lg shadow-[#E8B923]/30 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
              >
                What We Offer
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <a
                href="#stats"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all w-full sm:w-auto"
              >
                Strength in Numbers
              </a>

              <Link
                to="/about/history"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-white/80 hover:text-white font-semibold text-sm transition-colors w-full sm:w-auto text-center"
              >
                Our 40-Yr Story →
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Collage with Floating Modern Badges */}
          <div className="hero-visual lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Visual — Container faded away, keeping natural circular image */}
              <div className="relative flex flex-col items-center justify-center py-6 sm:py-8 group">
                {/* Ambient glow behind circular photo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[440px] sm:h-[440px] bg-gradient-to-tr from-amber-500/25 via-amber-300/15 to-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>

                {/* Subtle soft decorative rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[430px] sm:h-[430px] rounded-full border border-amber-400/20 pointer-events-none animate-pulse-subtle"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full border border-white/5 pointer-events-none"></div>

                {/* Natural Circular Image */}
                <div className="relative z-10 w-56 h-56 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                  <img
                    src={heroImg}
                    alt="Students of John Martyn Memorial School"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Caption beneath */}
                <div className="relative z-10 mt-5 text-center px-4">
                  <p className="text-[#E8B923] text-xs font-black uppercase tracking-wider">
                    Rural Empowerment • Salangaon
                  </p>
                  <p className="text-white/90 font-medium text-xs sm:text-sm mt-0.5">
                    Equal opportunities for every child in our community
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Teachers & Principal (Top Right) */}
              <div className="absolute top-2 right-2 sm:-top-8 sm:-right-6 max-w-[180px] bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-amber-200/50 text-[#1E2A44] animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
                    👩‍🏫
                  </div>
                  <div>
                    <p className="text-xs font-black leading-tight text-[#1E2A44]">
                      14 Qualified Teachers
                    </p>
                    <p className="text-[11px] text-amber-700 font-semibold">
                      Principal: 18 Yrs Exp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: School Timings (Bottom Left) */}
              <div className="absolute -bottom-24 sm:-bottom-16 left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-blue-100 text-[#1E2A44] animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
                    ⏰
                  </div>
                  <div>
                    <p className="text-xs font-black leading-tight text-[#1E2A44]">
                      Summer: 8:00 AM – 2:00 PM
                    </p>
                    <p className="text-[11px] text-gray-500 font-semibold">
                      Winter: 8:30 AM – 2:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 3: Community & History (Right Edge) */}
              <div className="hidden sm:flex absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-[#1E2A44]/95 text-white p-2.5 px-3.5 rounded-2xl shadow-xl border border-amber-400/40 items-center gap-2.5 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <div className="text-left">
                  <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Estd.</p>
                  <p className="text-xs font-black">1985 Legacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sharp Zigzag Divider to Next Section (Like reference design) */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <ZigzagDivider color="#FDFBF7" height={48} />
      </div>
    </section>
  );
};

export default Hero;

