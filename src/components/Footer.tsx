import { Link } from "react-router-dom";
import footerPattern from "../assets/footer-pattern.png";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/John+Martyn+Memorial+School/@30.408385,78.073935,12z/data=!4m6!3m5!1s0x3908d71a4c5e4785:0xbfba3c0fb50ce177!8m2!3d30.4083847!4d78.0739347!16s%2Fg%2F1hjgs0f1h?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D";

const Footer = () => {
  return (
    <footer className="bg-[#1E2A44] text-white py-10 lg:py-16 relative overflow-hidden">
      {/* Educational Doodle Pattern Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={footerPattern}
          alt=""
          className="w-full h-full object-cover object-center opacity-20 sm:opacity-25"
        />
        {/* Soft contrast shield to ensure text remains crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A44]/40 via-transparent to-[#1E2A44]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Section: Brand, Navigation, Contact & Benefactors (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            {/* Brand Identity */}
            <div>
              <Link to="/" className="inline-flex flex-wrap items-center gap-3 group">
                <img
                  src="https://jmmt.org.in/wp-content/uploads/2022/07/jmms-logo-7-1-e1525669143761-1.webp"
                  alt="John Martyn Memorial School"
                  className="h-12 w-auto object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div>
                  <p className="text-white font-black text-lg leading-tight group-hover:text-[#E8B923] transition-colors drop-shadow-sm">
                    John Martyn
                  </p>
                  <p className="text-[#E8B923] text-sm font-bold">
                    Memorial School
                  </p>
                </div>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-white/90 max-w-xl font-medium drop-shadow-sm">
                Nurturing young minds with quality primary education, strong
                values, and holistic development in rural Dehradun since 1985.
              </p>
            </div>

            {/* Navigation & Contact Subgrid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/15">
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                  <span>Quick Exploration</span>
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a
                      href="#offers"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      What We Offer
                    </a>
                  </li>
                  <li>
                    <a
                      href="#stats"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      Strength in Numbers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#teachers"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      Our Teachers & Leadership
                    </a>
                  </li>
                  <li>
                    <a
                      href="#success-stories"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      Success Stories & Achievers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#events"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      School Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="#supporters"
                      className="hover:text-[#E8B923] transition-colors text-white/90 font-medium hover:translate-x-1 inline-block duration-150"
                    >
                      Our Supporters
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Us & Benefactors */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                    <span>Contact Information</span>
                  </h4>
                  <ul className="space-y-3.5 text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#E8B923] mt-0.5 text-base shrink-0">📍</span>
                      <div>
                        <span className="text-white leading-relaxed text-xs sm:text-sm block font-medium">
                          Village Salangaon, P.O. Bhagwantpur,
                          <br />
                          Dehradun, Uttarakhand 248009, India
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#E8B923] text-base shrink-0">📞</span>
                      <a
                        href="tel:+919412051913"
                        className="hover:text-[#E8B923] transition-colors text-white font-medium text-xs sm:text-sm"
                      >
                        +91-9412051913
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#E8B923] text-base shrink-0">📧</span>
                      <a
                        href="mailto:jmms.dehradun@gmail.com"
                        className="hover:text-[#E8B923] transition-colors text-white font-medium text-xs sm:text-sm break-all"
                      >
                        jmms.dehradun@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Benefactors */}
                <div className="pt-4 border-t border-white/15">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#E8B923] mb-2.5">
                    Our Benefactors
                  </h5>
                  <ul className="space-y-1.5 text-xs text-white/85 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                      <span>Lal Family Foundation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                      <span>Hemchand Mahindra Foundation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                      <span>Doon School Old Boys Society</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Expanded Wide Campus Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                <span>Campus Location & Map</span>
              </h4>
              <span className="text-xs text-[#E8B923] font-bold hidden sm:inline-block">
                Salangaon, Dehradun
              </span>
            </div>

            {/* Embedded Interactive Map Card with increased width & height */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl flex flex-col group">
              <div className="relative w-full h-64 sm:h-72 bg-[#162035] overflow-hidden">
                <iframe
                  title="John Martyn Memorial School Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13768.4!2d78.0739347!3d30.4083847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d71a4c5e4785%3A0xbfba3c0fb50ce177!2sJohn%20Martyn%20Memorial%20School!5e0!3m2!1sen!2sin!4v1727165000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover filter contrast-[1.05] opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Action / Directions footer */}
              <div className="p-4 bg-[#15213b] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    John Martyn Memorial School
                  </p>
                  <p className="text-xs text-white/80 font-medium truncate mt-0.5">
                    Village Salangaon, P.O. Bhagwantpur, Dehradun
                  </p>
                </div>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E8B923] text-[#1E2A44] font-black text-xs hover:bg-amber-400 active:scale-95 transition-all shrink-0 shadow-md shadow-[#E8B923]/20"
                  aria-label="Open John Martyn Memorial School in Google Maps"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/80 font-medium mt-3 px-1">
              <span>Located in the foothills of Salangaon</span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8B923] hover:underline font-bold"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/80 font-medium">
          <p>© 2026 John Martyn Memorial School. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E8B923] transition-colors text-white/80 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#E8B923] transition-colors text-white/80 hover:text-white">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
