import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Coffee,
  Utensils,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import DonateButton from "../components/DonateButton";
import { donationTiers } from "../data/donationsData";

const getTierIcon = (iconName: string) => {
  switch (iconName) {
    case "graduation":
      return <GraduationCap className="w-7 h-7" />;
    case "milk":
      return <Coffee className="w-7 h-7" />;
    case "food":
      return <Utensils className="w-7 h-7" />;
    default:
      return <GraduationCap className="w-7 h-7" />;
  }
};

const DonatePage: React.FC = () => {
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
                Child Sponsorship & Donations
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
                <span>View Annual Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── 3 DONATION TIERS ── */}
      <main
        id="sponsorship-packages"
        className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 py-16 lg:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-[#E8B923]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B923]">
                Annual Sponsorship Packages
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E2A44]">
              Choose How You Want to Make an Impact
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#1E2A44]/70 max-w-md">
            Click any package to view the direct UPI QR payment details. All donations qualify for 80G tax benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {donationTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-white rounded-3xl border-2 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${
                tier.popular
                  ? "border-[#E8B923] shadow-xl ring-2 ring-[#E8B923]/20"
                  : "border-[#1E2A44]/10 hover:border-[#1E2A44]/25 shadow-sm"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-8">
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-sm ${
                      tier.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Icon */}
                <div className="mb-6 pt-1">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.colorGradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    {getTierIcon(tier.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44] leading-snug">
                  {tier.title}
                </h3>

                {/* Price */}
                <div className="my-6 py-4 border-y border-[#1E2A44]/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#1E2A44]">
                      ₹{tier.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                      / {tier.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#1E2A44]/70 font-light leading-relaxed mb-8">
                  {tier.description}
                </p>
              </div>

              {/* Donate Button - Opens QR Code Modal */}
              <DonateButton initialPackageId={tier.id}>
                <div
                  className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer ${
                    tier.popular
                      ? "bg-[#E8B923] hover:bg-[#d4a61f] text-[#1E2A44]"
                      : "bg-[#1E2A44] hover:bg-[#28385a] text-white"
                  }`}
                >
                  <span>Donate ₹{tier.amount.toLocaleString("en-IN")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </DonateButton>
            </div>
          ))}
        </div>

        {/* ── CUSTOM CONTRIBUTION CALLOUT ── */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#1E2A44]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8B923]/15 flex items-center justify-center text-[#1E2A44] shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#E8B923]" />
            </div>
            <div>
              <h4 className="text-lg font-black text-[#1E2A44]">
                Want to contribute a custom amount?
              </h4>
              <p className="text-xs sm:text-sm text-[#1E2A44]/70 font-light">
                You can choose any custom contribution amount and scan our official UPI QR code with zero transaction charges.
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
