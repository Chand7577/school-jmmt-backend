import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Coffee,
  Utensils,
  ArrowRight,
  HeartHandshake,
  Hammer,
  ShoppingBag,
} from "lucide-react";
import DonateButton from "../components/DonateButton";
import parallaxBg from "../assets/school-gallery/IMG_9126.jpg";

// ── OTHER WAYS TO SPONSOR DATA ──────────────────────────────────────────────
const otherWays = [
  {
    id: "sponsor-project",
    icon: <Hammer className="w-6 h-6" />,
    title: "Sponsor a Project",
    description:
      "Fund meaningful infrastructure improvements like classroom renovation, library upgrades, or sanitation facilities that benefit every child at school.",
    colorGradient: "from-violet-500 to-purple-600",
  },
  {
    id: "sponsor-milk",
    icon: <Coffee className="w-6 h-6" />,
    title: "Sponsor Milk",
    description:
      "Provide daily milk for children throughout the school year, supporting their health, growth, and ability to concentrate in class.",
    colorGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "sponsor-food",
    icon: <Utensils className="w-6 h-6" />,
    title: "Sponsor Nutritious Food",
    description:
      "Ensure children receive wholesome, nutritious meals every school day — fuelling their energy, focus, and long-term wellbeing.",
    colorGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "adopt-need",
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Adopt a Need at School",
    description:
      "Choose to sponsor specific school supplies and support items — from sports equipment to art materials — directly meeting the school's day-to-day needs.",
    colorGradient: "from-rose-500 to-pink-600",
  },
];

const DonatePage: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const scrolled = -rect.top * 0.35;
      const img = parallaxRef.current.querySelector<HTMLElement>(".parallax-img");
      if (img) img.style.transform = `translateY(${scrolled}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E2A44]">
      {/* ── HEADER ── */}
      <header className="relative bg-[#1E2A44] text-white pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[700px] h-[450px] bg-[#E8B923]/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 font-mono mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#E8B923] font-bold">Donate</span>
          </div>

          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-7 h-px bg-[#E8B923]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#E8B923] uppercase">
                Child Sponsorship &amp; Donations
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Support a Child at <br />
              <span className="text-[#E8B923]">John Martyn Memorial School</span>
            </h1>

            <p className="text-sm sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl">
              Your donation directly supports rural children with quality education, nutrition,
              and daily transport. Click below to donate via our official UPI QR code.
            </p>

            {/* Quick Action Button */}
            <div className="pt-3">
              <a
                href="#sponsorship-packages"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8B923] hover:bg-[#d4a61f] text-[#1E2A44] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>View Sponsorship Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 py-16 lg:py-24 space-y-20">
        {/* ── SPONSOR A CHILD — PARALLAX BANNER ── */}
        <section id="sponsorship-packages">
          {/* Section label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#E8B923]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B923]">
              Primary Sponsorship
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1E2A44] mb-10">
            Sponsor a Child
          </h2>

          {/* Parallax banner */}
          <div className="pt-5 relative">
            <div
              ref={parallaxRef}
              className="relative rounded-3xl overflow-hidden border-2 border-[#E8B923] shadow-2xl ring-2 ring-[#E8B923]/20"
              style={{ minHeight: "420px" }}
            >
              {/* Parallax image layer */}
              <div
                className="parallax-img absolute inset-0 w-full will-change-transform"
                style={{ top: "-15%", height: "130%" }}
              >
                <img
                  src={parallaxBg}
                  alt="Children at John Martyn Memorial School"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Dark gradient overlay so text stays readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A44]/90 via-[#1E2A44]/70 to-[#1E2A44]/30" />

              {/* Content — sits above image */}
              <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center gap-10 min-h-[420px]">
                {/* Left: icon + info */}
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8B923] to-amber-500 flex items-center justify-center text-white shadow-lg mb-6">
                    <GraduationCap className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    Sponsor a Child
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-black text-[#E8B923]">₹50,000</span>
                    <span className="text-sm font-mono text-white/60 uppercase tracking-wider">
                      / per child / year
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl">
                    This contribution supports a child's overall educational needs, including{" "}
                    <span className="text-white font-semibold">school fees</span>,{" "}
                    <span className="text-white font-semibold">stationery</span>, and{" "}
                    <span className="text-white font-semibold">skill development</span> — giving
                    them everything they need to learn, grow, and thrive for an entire year.
                  </p>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0 w-full lg:w-64">
                  <DonateButton initialPackageId="child-sponsorship">
                    <div className="w-full py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer bg-[#E8B923] hover:bg-[#d4a61f] text-[#1E2A44]">
                      <span>Sponsor a Child</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </DonateButton>
                  <p className="text-[11px] text-white/40 text-center mt-3 font-light">
                    Donate via UPI QR &middot; 80G tax benefit eligible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OTHER WAYS TO SPONSOR ── */}
        <section>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#E8B923]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B923]">
              More Ways to Give
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E2A44]">
              Other Ways to Sponsor
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2A44]/60 max-w-sm">
              Every contribution — big or small — makes a real difference in a child's life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {otherWays.map((way) => (
              <div
                key={way.id}
                className="group relative bg-white rounded-2xl border border-[#1E2A44]/10 p-7 flex flex-col justify-between gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[#1E2A44]/25"
              >
                {/* Top content */}
                <div className="flex flex-col gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${way.colorGradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {way.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#1E2A44] mb-2">{way.title}</h3>
                    <p className="text-xs text-[#1E2A44]/65 font-light leading-relaxed">
                      {way.description}
                    </p>
                  </div>
                </div>

                {/* Button always at bottom */}
                <DonateButton initialPackageId={way.id}>
                  <div className="w-full py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-[#1E2A44] hover:bg-[#28385a] text-white">
                    <span>Contribute</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </DonateButton>
              </div>
            ))}
          </div>
        </section>

        {/* ── CUSTOM CONTRIBUTION CALLOUT ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1E2A44]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8B923]/15 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#E8B923]" />
            </div>
            <div>
              <h4 className="text-lg font-black text-[#1E2A44]">
                Want to contribute a custom amount?
              </h4>
              <p className="text-xs sm:text-sm text-[#1E2A44]/70 font-light">
                You can choose any amount and scan our official UPI QR code with zero transaction charges.
              </p>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <DonateButton initialPackageId="custom">
              <div className="px-6 py-3 rounded-full bg-[#1E2A44] hover:bg-[#28385a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer text-center">
                Custom Donation Amount
              </div>
            </DonateButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;
