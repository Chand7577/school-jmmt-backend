import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";
import DonateButton from "./DonateButtonOld";
import NewsletterDropdown from "./NewsletterDropdown";

// Items shown in the StaggeredMenu side-panel (all screens)
const staggeredMenuItems = [
  { label: "Home", link: "/", isAnchor: false },
  { label: "About", link: "/about", isAnchor: false },
  { label: "What We Offer", link: "/#offers", isAnchor: true },
  { label: "Our Teachers", link: "/#teachers", isAnchor: true },
  { label: "Success Stories", link: "/success-stories", isAnchor: false },
  { label: "School Events", link: "/school-events", isAnchor: false },
  { label: "Newsletters", link: "/#newsletters", isAnchor: true },
  { label: "Contact Us", link: "/#contact", isAnchor: true },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#141e30] text-white/80 text-xs border-b border-white/5 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Estd. 1985 • Salangaon, Dehradun
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/70 truncate max-w-lg">
              “Childhood should be a journey, not a race” — Imparting holistic primary schooling
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90">
            <a
              href="tel:+919412051913"
              className="hover:text-[#E8B923] transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>📞</span> +91-9412051913
            </a>
            <span className="text-white/30">|</span>
            <a
              href="mailto:jmms.dehradun@gmail.com"
              className="hover:text-[#E8B923] transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>✉️</span> jmms.dehradun@gmail.com
            </a>
            <a
              href="/#admissions"
              className="ml-2 bg-[#E8B923] text-[#1E2A44] font-extrabold px-3 py-1 rounded-full hover:bg-amber-400 transition-all text-[11px] shadow-sm"
            >
              Support JMMS
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#1E2A44]/95 backdrop-blur-md shadow-2xl py-2"
            : "bg-[#1E2A44] py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink"
            >
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src="https://jmmt.org.in/wp-content/uploads/2022/07/jmms-logo-7-1-e1525669143761-1.webp"
                  alt="John Martyn Memorial School Logo"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-white font-black text-base sm:text-lg tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  JMMS
                </span>
                <span className="text-white/70 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider mt-0.5 truncate max-w-[130px] sm:max-w-none">
                  John Martyn Memorial School
                </span>
              </div>
            </Link>

            {/* Right: Action Buttons & Staggered Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Newsletter — hidden on mobile, shown from sm upward */}
              <div className="hidden sm:block">
                <NewsletterDropdown />
              </div>

              <div className="hidden lg:flex items-center gap-2.5">
                <a
                  href="/#admissions"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
                >
                  Admissions
                </a>
                <a
                  href="/#contact"
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
                >
                  Contact
                </a>
              </div>

              {/* Donate Button - Visible on both Mobile & Desktop */}
              <DonateButton />

              {/* Animated Staggered Menu for all screens */}
              <StaggeredMenu
                items={staggeredMenuItems}
                position="right"
                colors={["#E8B923", "#141e30"]}
                accentColor="#E8B923"
                menuButtonColor="#ffffff"
                openMenuButtonColor="#E8B923"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
