import React from "react";
import ZigzagCard from "./ZigzagCard";
import { useGsapReveal } from "../hooks/useGsapReveal";
import geometryBg from "../assets/geometry-bg.jpg";

const CTA = () => {
  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".cta-badge",   variant: "fadeDown", duration: 0.5 },
      { selector: ".cta-heading", variant: "fadeUp",   duration: 0.7, delay: 0.1, distance: 50 },
      { selector: ".cta-sub",     variant: "fade",     duration: 0.6, delay: 0.25 },
      { selector: ".cta-btns",    variant: "fadeUp",   duration: 0.55, delay: 0.35 },
      { selector: ".cta-info",    variant: "fadeUp",   duration: 0.55, delay: 0.5 },
    ],
    triggerStart: "top 95%",
  }) as React.RefObject<HTMLElement>;

  return (
    <section
      id="admissions"
      ref={sectionRef}
      className="py-20 lg:py-28 relative"
      style={{
        backgroundImage: `url(${geometryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light overlay so the section bg doesn't overpower the card */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ZigzagCard
          color="#1E2A44"
          toothSize={10}
          variant="scallop"
          className="mx-auto"
        >
          <div className="relative overflow-hidden px-6 py-8 sm:px-16 sm:py-10 text-white border border-white/10">
            {/* Decorative ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B923]/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <span className="cta-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/10">
                Admissions &amp; Sponsorship 2026-27
              </span>

              <h2 className="cta-heading text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                YOUR CHILD'S LEARNING{" "}
                <span className="text-[#E8B923]">JOURNEY STARTS HERE</span>
              </h2>

              <p className="cta-sub text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Join the John Martyn Memorial School family. We believe childhood should be a journey, not a race. Experience holistic learning, dedicated teachers, and a caring community.
              </p>

              <div className="cta-btns pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+919412051913"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-base hover:bg-amber-400 shadow-xl shadow-[#E8B923]/30 hover:scale-105 active:scale-95 transition-all animate-ring-pulse"
                >
                  <span>Call For Admissions: +91-9412051913</span>
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-sm transition-all"
                >
                  <span>Get In Touch / Inquire</span>
                </a>
              </div>

              {/* Quick Contact & Address Information Bar */}
              <div className="cta-info mt-12 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6 text-left">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-amber-300 font-bold uppercase">Campus Address</p>
                  <p className="text-xs text-white/80 mt-1">
                    Village Salangaon, P.O. Bhagwantpur, Dehradun 248009, Uttarakhand
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-amber-300 font-bold uppercase">Office Direct</p>
                  <p className="text-xs text-white/80 mt-1">
                    Phone: +91-9412051913<br />
                    Email: jmms.dehradun@gmail.com
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-amber-300 font-bold uppercase">School Timings</p>
                  <div className="text-xs text-white/80 mt-1.5 space-y-1">
                    <p>
                      <strong className="text-white font-semibold">Summer:</strong> 8:00 AM to 2:00 PM
                    </p>
                    <p>
                      <strong className="text-white font-semibold">Winter:</strong> 8:30 AM to 2:30 PM
                    </p>
                    <p className="text-[11px] text-white/60 pt-0.5">
                      Mon – Sat • Office visits welcome with prior notice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ZigzagCard>
      </div>
    </section>
  );
};

export default CTA;
