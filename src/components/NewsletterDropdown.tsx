import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, ExternalLink, Newspaper } from "lucide-react";
import { newslettersData, NewsletterItem } from "@/data/newslettersData";

interface NewsletterDropdownProps {
  className?: string;
  buttonClassName?: string;
}

export const NewsletterDropdown: React.FC<NewsletterDropdownProps> = ({
  className = "",
  buttonClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none border ${
          isOpen
            ? "bg-[#E8B923] text-[#1E2A44] border-[#E8B923] shadow-md shadow-[#E8B923]/20"
            : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
        } ${buttonClassName}`}
      >
        <Newspaper
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "scale-110 text-[#1E2A44]" : "text-[#E8B923] group-hover:scale-110"
          }`}
        />
        <span>Newsletters</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#1E2A44]" : "text-white/70 group-hover:text-white"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-2xl bg-[#172136] border border-white/15 shadow-2xl shadow-black/60 overflow-hidden z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-[#111928] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-[#E8B923]/20 text-[#E8B923]">
                <FileText className="w-3.5 h-3.5" />
              </span>
              <div>
                <h4 className="text-white text-xs font-bold tracking-wide">
                  School Newsletters
                </h4>
                <p className="text-[10px] text-white/60">
                  2026 Monthly Editions
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold border border-amber-400/25">
              2026 • {newslettersData.length} Issues
            </span>
          </div>

          {/* Serial-wise List */}
          <div className="p-1.5 max-h-80 overflow-y-auto divide-y divide-white/5">
            {newslettersData.map((item: NewsletterItem) => (
              <a
                key={item.id}
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-all duration-150 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Serial Number Bubble */}
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 group-hover:bg-[#E8B923] text-white/80 group-hover:text-[#1E2A44] text-[10px] font-extrabold transition-colors shrink-0">
                    {String(item.serial).padStart(2, "0")}
                  </span>

                  {/* Title and Edition */}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-[#E8B923] truncate transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5">
                      <span>{item.edition}</span>
                      <span>•</span>
                      <span>{item.month} {item.year}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Badge & External Icon */}
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase border ${
                      item.format === "pdf"
                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                        : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                    }`}
                  >
                    {item.format}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#E8B923] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="px-4 py-2 bg-[#111928]/60 border-t border-white/5 text-[10px] text-white/40 text-center flex items-center justify-center gap-1">
            <span>Clicking an issue opens in a new tab</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterDropdown;
