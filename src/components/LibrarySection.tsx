import React, { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import {
  Library,
  BookOpen,
  Landmark,
  Microscope,
  Sparkles,
  ArrowRight,
  Quote,
  Star,
  Heart,
} from "./ui/Icons";

interface BookTitle {
  title: string;
  author: string;
  badge: string;
}

interface BookCategory {
  id: string;
  categoryNumber: string;
  name: string;
  subtitle: string;
  count: string;
  desc: string;
  accentColor: string;
  accentBg: string;
  stampText: string;
  featuredBooks: BookTitle[];
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

const categories: BookCategory[] = [
  {
    id: "fiction",
    categoryNumber: "01",
    name: "Fiction & Novels",
    subtitle: "Classic Fables • Moral Tales • World Imagination",
    count: "700+ Titles",
    desc: "Inspiring moral literature and time-tested classics that transport rural learners into extraordinary realms of imagination, wonder, and deep human empathy.",
    accentColor: "#F59E0B",
    accentBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    stampText: "CLASS ARCHIVE • SALANGAON",
    featuredBooks: [
      {
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        badge: "Class 5 Pick",
      },
      {
        title: "Malgudi Days",
        author: "R.K. Narayan",
        badge: "Classic Indian Lore",
      },
      {
        title: "Alice in Wonderland",
        author: "Lewis Carroll",
        badge: "Fantasy Tale",
      },
      {
        title: "Aesop's Moral Fables",
        author: "Classic Literature",
        badge: "Values & Ethics",
      },
    ],
    IconComponent: Sparkles,
  },
  {
    id: "story",
    categoryNumber: "02",
    name: "Children's Story Books",
    subtitle: "Panchatantra • Illustrated Fables • Bilingual Readers",
    count: "850+ Titles",
    desc: "Vibrant picture books, timeless Panchatantra animal allegories, and dual-language Hindi-English readers designed to build foundational fluency for early learners.",
    accentColor: "#10B981",
    accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    stampText: "EARLY READERS • FOUNDATION",
    featuredBooks: [
      {
        title: "Panchatantra Tales",
        author: "Pt. Vishnu Sharma",
        badge: "Most Borrowed",
      },
      {
        title: "Jataka Folklore",
        author: "Traditional Fables",
        badge: "Illustrated Edition",
      },
      {
        title: "Himalayan Folk Tales",
        author: "Mountain Traditions",
        badge: "Local Legends",
      },
      {
        title: "First Reader Series",
        author: "Hindi & English Readers",
        badge: "Class 1 & 2",
      },
    ],
    IconComponent: BookOpen,
  },
  {
    id: "history",
    categoryNumber: "03",
    name: "History & Heritage",
    subtitle: "Freedom Movement • Dehradun Chronicles • Himalayan Roots",
    count: "450+ Titles",
    desc: "Chronicling India’s freedom movement, world civilizations, and Uttarakhand’s indigenous folklore so young minds remain rooted in pride and cultural heritage.",
    accentColor: "#38BDF8",
    accentBg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
    stampText: "HERITAGE REPOSITORY • ARCHIVE",
    featuredBooks: [
      {
        title: "History of Dehradun Valley",
        author: "Regional Chronicles",
        badge: "Local Heritage",
      },
      {
        title: "Freedom Warriors of India",
        author: "National Biographies",
        badge: "Patriotic Series",
      },
      {
        title: "World Civilizations",
        author: "Ancient Histories",
        badge: "Illustrated Atlas",
      },
      {
        title: "Himalayan Sacred Trails",
        author: "Uttarakhand Heritage",
        badge: "Valley Geography",
      },
    ],
    IconComponent: Landmark,
  },
  {
    id: "science",
    categoryNumber: "04",
    name: "Science & Nature",
    subtitle: "Cosmos & Stars • Himalayan Flora • Hands-on Discovery",
    count: "500+ Titles",
    desc: "Practical hands-on science experiments, field bird-watching guides of the Rajpur foothills, astronomy, and environmental conservation manuals.",
    accentColor: "#C084FC",
    accentBg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    stampText: "DISCOVERY LAB • INQUIRY",
    featuredBooks: [
      {
        title: "Young Scientist Lab",
        author: "DIY Village Experiments",
        badge: "Hands-on STEM",
      },
      {
        title: "Birds of Uttarakhand",
        author: "Foothill Wildlife Guide",
        badge: "Field Naturalist",
      },
      {
        title: "Solar System Guide",
        author: "Cosmos & Astronomy",
        badge: "Stargazing Pick",
      },
      {
        title: "Ecology & Sacred Groves",
        author: "Forest Stewardship",
        badge: "Green Nature",
      },
    ],
    IconComponent: Microscope,
  },
];

/* -------------------------------------------------------------
 * Handcrafted Animated SVG Vignettes for each genre (Left Page)
 * -----------------------------------------------------------*/

const FictionVignette = () => (
  <svg
    viewBox="0 0 320 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-h-[260px] object-contain drop-shadow-xl"
  >
    <defs>
      <radialGradient id="fictionGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E8B923" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#1E2A44" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="magicSparks" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>

    {/* Ambient Moon & Glow */}
    <circle cx="240" cy="65" r="48" fill="url(#fictionGlow)" />
    <path
      d="M255 42C240 42 228 54 228 69C228 84 240 96 255 96C246 96 238 88 238 69C238 50 246 42 255 42Z"
      fill="#FDE68A"
      className="animate-pulse"
      style={{ animationDuration: "4s" }}
    />

    {/* Twinkling Himalayan Stars */}
    <g className="animate-pulse" style={{ animationDuration: "2.5s" }}>
      <circle cx="65" cy="50" r="2" fill="#FEF08A" />
      <circle cx="110" cy="35" r="2.5" fill="#FDE68A" />
      <circle cx="180" cy="45" r="1.5" fill="#FFFFFF" />
      <circle cx="85" cy="90" r="2" fill="#FEF08A" />
      <circle cx="280" cy="115" r="2.5" fill="#FDE68A" />
    </g>

    {/* Distant Mountain Silhouettes */}
    <polygon points="10,210 80,140 160,210" fill="#1e2f57" opacity="0.6" />
    <polygon points="110,210 190,120 270,210" fill="#19284a" opacity="0.8" />
    <polygon points="210,210 270,150 320,210" fill="#14203d" opacity="0.9" />

    {/* Floating Paper Airplane of Imagination */}
    <g className="storybook-plane">
      <path
        d="M60 110 L105 95 L95 125 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <path
        d="M60 110 L105 95 L80 115 Z"
        fill="#E2E8F0"
        opacity="0.8"
      />
      <path
        d="M40 120 Q50 115 60 110"
        stroke="#E8B923"
        strokeDasharray="2,3"
        strokeWidth="1.5"
      />
    </g>

    {/* The Magical Glowing Open Tome */}
    <g transform="translate(90, 160)">
      {/* Golden Magic Aura below book */}
      <ellipse cx="70" cy="45" rx="65" ry="12" fill="url(#fictionGlow)" />
      
      {/* Book Covers */}
      <path
        d="M10 40 C35 32 65 34 70 38 C75 34 105 32 130 40 L134 56 C105 48 75 50 70 54 C65 50 35 48 6 56 Z"
        fill="#78350F"
      />
      {/* Left Open Page */}
      <path
        d="M12 36 C35 28 65 30 69 35 L69 50 C65 46 35 44 8 52 Z"
        fill="#FFFDF7"
      />
      {/* Right Open Page */}
      <path
        d="M71 35 C75 30 105 28 128 36 L132 52 C105 44 75 46 71 50 Z"
        fill="#F8FAFC"
      />
      {/* Page lines */}
      <line x1="22" y1="36" x2="58" y2="33" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="22" y1="41" x2="54" y2="38" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="82" y1="33" x2="118" y2="36" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="82" y1="38" x2="114" y2="41" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Floating Magic Sparks rising from Pages */}
      <g className="storybook-sparkles">
        <polygon points="70,15 73,23 81,26 73,29 70,37 67,29 59,26 67,23" fill="url(#magicSparks)" />
        <circle cx="50" cy="18" r="2.5" fill="#FDE68A" />
        <circle cx="92" cy="16" r="2" fill="#FBBF24" />
        <circle cx="70" cy="5" r="1.5" fill="#FEF08A" />
      </g>
    </g>
  </svg>
);

const StoryVignette = () => (
  <svg
    viewBox="0 0 320 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-h-[260px] object-contain drop-shadow-xl"
  >
    <defs>
      <radialGradient id="storySun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="treeLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>

    {/* Warm Sun glow in the forest */}
    <circle cx="80" cy="70" r="50" fill="url(#storySun)" />
    <circle cx="80" cy="70" r="22" fill="#FDE68A" opacity="0.9" />

    {/* Panchatantra Majestic Banyan Tree Canopy */}
    <g transform="translate(130, 40)">
      {/* Foliage Clouds */}
      <circle cx="55" cy="55" r="45" fill="url(#treeLeaf)" />
      <circle cx="25" cy="65" r="35" fill="#059669" />
      <circle cx="85" cy="70" r="38" fill="#10B981" />
      <circle cx="55" cy="30" r="32" fill="#34D399" opacity="0.9" />

      {/* Tree Trunk */}
      <path
        d="M48 95 C45 125 35 150 20 165 L85 165 C72 150 63 125 58 95 Z"
        fill="#78350F"
      />
      {/* Hanging vines */}
      <path d="M35 85 Q30 115 32 130" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
      <path d="M75 80 Q80 110 78 125" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Forest Ground */}
    <path
      d="M10 215 Q160 190 310 215 L310 250 L10 250 Z"
      fill="#064E3B"
      opacity="0.85"
    />

    {/* Friendly Panchatantra Deer Silhouette */}
    <g transform="translate(55, 145)">
      {/* Body */}
      <ellipse cx="45" cy="40" rx="22" ry="14" fill="#D97706" />
      {/* Legs */}
      <line x1="32" y1="48" x2="30" y2="70" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="48" x2="42" y2="70" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="48" x2="50" y2="70" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="48" x2="62" y2="70" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      {/* Neck & Head */}
      <path d="M30 35 C28 25 22 18 20 12 C24 10 30 14 34 22 Z" fill="#D97706" />
      <ellipse cx="18" cy="11" rx="7" ry="5" fill="#F59E0B" />
      {/* Tiny Antlers */}
      <path d="M19 8 L17 1 M17 4 L14 3 M18 7 L21 2" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M66 38 C70 35 72 38 68 43 Z" fill="#FDE68A" />
    </g>

    {/* Fluttering Golden Butterflies / Fireflies */}
    <g className="storybook-sparkles">
      <path d="M110 115 Q115 110 120 115 Q115 120 110 115" fill="#FDE68A" />
      <circle cx="170" cy="120" r="3" fill="#6EE7B7" className="animate-ping" style={{ animationDuration: "3s" }} />
      <circle cx="250" cy="140" r="2.5" fill="#FCD34D" className="animate-ping" style={{ animationDuration: "2s" }} />
    </g>
  </svg>
);

const HistoryVignette = () => (
  <svg
    viewBox="0 0 320 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-h-[260px] object-contain drop-shadow-xl"
  >
    <defs>
      <linearGradient id="dawnSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#1E2A44" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="snowPeak" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>

    {/* Radiant Dawn Sky over Himalayas */}
    <rect x="20" y="20" width="280" height="200" rx="16" fill="url(#dawnSky)" />

    {/* Radiant Rising Golden Sun */}
    <circle cx="160" cy="95" r="32" fill="#FBBF24" opacity="0.9" />
    <circle cx="160" cy="95" r="46" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3,4" opacity="0.6" className="animate-spin" style={{ animationDuration: "20s" }} />

    {/* Majestic Garhwal Himalayan Mountain Peaks */}
    <polygon points="40,215 110,105 180,215" fill="#334155" />
    <polygon points="100,120 110,105 125,128 116,134 110,126 104,132" fill="url(#snowPeak)" />

    <polygon points="130,215 200,90 280,215" fill="#1E293B" />
    <polygon points="190,110 200,90 216,115 208,122 201,113 194,120" fill="url(#snowPeak)" />

    {/* Historic Heritage Indian Archway & Stupa Silhouette */}
    <g transform="translate(100, 140)">
      {/* Archway Pillars */}
      <rect x="25" y="30" width="12" height="48" fill="#D97706" rx="2" />
      <rect x="83" y="30" width="12" height="48" fill="#D97706" rx="2" />
      {/* Ornate Arch Top */}
      <path
        d="M20 30 Q60 5 100 30 L95 34 Q60 14 25 34 Z"
        fill="#F59E0B"
      />
      {/* Dome / Stupa */}
      <path
        d="M45 28 C45 12 75 12 75 28 Z"
        fill="#B45309"
      />
      <circle cx="60" cy="8" r="3" fill="#FDE68A" />
      <line x1="60" y1="1" x2="60" y2="8" stroke="#FDE68A" strokeWidth="1.5" />
    </g>

    {/* Floating Heritage Scroll */}
    <g transform="translate(35, 175)" className="storybook-plane">
      <rect x="0" y="5" width="55" height="28" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="2" cy="19" r="6" fill="#F59E0B" />
      <circle cx="53" cy="19" r="6" fill="#F59E0B" />
      <line x1="12" y1="12" x2="42" y2="12" stroke="#92400E" strokeWidth="1.5" />
      <line x1="12" y1="18" x2="36" y2="18" stroke="#92400E" strokeWidth="1.5" />
      <line x1="12" y1="24" x2="40" y2="24" stroke="#92400E" strokeWidth="1.5" />
    </g>

    {/* Birds migrating over the valley */}
    <g className="animate-pulse" style={{ animationDuration: "3s" }}>
      <path d="M50 70 Q55 64 60 70 Q65 64 70 70" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
      <path d="M72 82 Q76 77 80 82 Q84 77 88 82" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

const ScienceVignette = () => (
  <svg
    viewBox="0 0 320 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-h-[260px] object-contain drop-shadow-xl"
  >
    <defs>
      <radialGradient id="cosmosGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#1E2A44" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="saturnRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>

    {/* Deep Cosmic Nebula */}
    <circle cx="210" cy="85" r="60" fill="url(#cosmosGlow)" />

    {/* Saturn Planet with Orbiting Rings */}
    <g transform="translate(190, 65)">
      {/* Planet Body */}
      <circle cx="25" cy="25" r="18" fill="#F59E0B" />
      {/* Planet Shading */}
      <path d="M12 25 C12 35 38 35 38 25 C38 18 12 18 12 25 Z" fill="#D97706" opacity="0.6" />
      {/* Ring */}
      <ellipse
        cx="25"
        cy="25"
        rx="36"
        ry="10"
        stroke="url(#saturnRing)"
        strokeWidth="3.5"
        transform="rotate(-20, 25, 25)"
      />
    </g>

    {/* Constellation Lines & Stars */}
    <g className="animate-pulse" style={{ animationDuration: "3s" }}>
      <circle cx="45" cy="40" r="2.5" fill="#E9D5FF" />
      <circle cx="85" cy="30" r="2" fill="#E9D5FF" />
      <circle cx="120" cy="55" r="2.5" fill="#FDE68A" />
      <circle cx="105" cy="85" r="2" fill="#E9D5FF" />
      <line x1="45" y1="40" x2="85" y2="30" stroke="#C084FC" strokeWidth="0.8" strokeDasharray="2,2" />
      <line x1="85" y1="30" x2="120" y2="55" stroke="#C084FC" strokeWidth="0.8" strokeDasharray="2,2" />
      <line x1="120" y1="55" x2="105" y2="85" stroke="#C084FC" strokeWidth="0.8" strokeDasharray="2,2" />
    </g>

    {/* Science Discovery: Swirling Atom Rings */}
    <g transform="translate(45, 110)">
      <ellipse cx="35" cy="35" rx="30" ry="12" stroke="#38BDF8" strokeWidth="1.5" transform="rotate(30, 35, 35)" opacity="0.75" />
      <ellipse cx="35" cy="35" rx="30" ry="12" stroke="#C084FC" strokeWidth="1.5" transform="rotate(-30, 35, 35)" opacity="0.75" />
      <ellipse cx="35" cy="35" rx="30" ry="12" stroke="#34D399" strokeWidth="1.5" transform="rotate(90, 35, 35)" opacity="0.6" />
      {/* Nucleus */}
      <circle cx="35" cy="35" r="6" fill="#FDE68A" className="animate-ping" style={{ animationDuration: "2s" }} />
      <circle cx="35" cy="35" r="4" fill="#F59E0B" />
    </g>

    {/* Observation Telescope on Foothill Tripod */}
    <g transform="translate(130, 135)">
      {/* Tripod Stand */}
      <line x1="45" y1="35" x2="15" y2="85" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="35" x2="45" y2="85" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="35" x2="75" y2="85" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      {/* Telescope Tube pointing up-right */}
      <g transform="rotate(-35, 45, 35)">
        <rect x="10" y="28" width="70" height="14" rx="3" fill="#E2E8F0" />
        <rect x="75" y="25" width="10" height="20" rx="2" fill="#F59E0B" />
        <rect x="5" y="30" width="8" height="10" rx="1" fill="#475569" />
        <circle cx="85" cy="35" r="8" fill="#38BDF8" opacity="0.8" />
      </g>
    </g>

    {/* Ground Pine Trees */}
    <polygon points="15,225 30,185 45,225" fill="#065F46" />
    <polygon points="35,225 50,195 65,225" fill="#047857" />
    <polygon points="265,225 280,185 295,225" fill="#065F46" />
  </svg>
);

const LibrarySection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".library-header", variant: "fadeUp", duration: 0.6 },
      { selector: ".library-left", variant: "fadeUp", duration: 0.65, delay: 0.1 },
      { selector: ".library-book", variant: "fadeScale", duration: 0.7, delay: 0.15 },
    ],
    triggerStart: "top 95%",
  });

  const activeCategory = categories[activeCategoryIndex];
  const ActiveCategoryIcon = activeCategory.IconComponent;

  // Render matching SVG vignette dynamically based on selected genre
  const renderVignette = () => {
    switch (activeCategory.id) {
      case "fiction":
        return <FictionVignette />;
      case "story":
        return <StoryVignette />;
      case "history":
        return <HistoryVignette />;
      case "science":
        return <ScienceVignette />;
      default:
        return <FictionVignette />;
    }
  };

  return (
    <section
      id="library"
      ref={sectionRef}
      className="bg-[#0b1426] text-white relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Scoped CSS micro-animations for storybook whimsy */}
      <style>{`
        @keyframes storybookFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(-1.5deg); }
        }
        @keyframes storybookSparkle {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .storybook-plane {
          animation: storybookFloat 4.5s ease-in-out infinite;
        }
        .storybook-sparkles {
          animation: storybookSparkle 3s ease-in-out infinite;
        }
        .page-fold-shadow {
          background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 15%, transparent 50%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.3) 100%);
        }
      `}</style>

      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="library-header max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold tracking-wide mb-3">
            <Library size={15} />
            <span>CHAPTER 03 • SANCTUARY OF READING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            BOOKS &amp; <span className="text-[#E8B923]">OUR LIBRARY</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
            There are <strong className="text-[#E8B923] font-semibold">more than 2,500 curated books</strong> catalogued for our rural students. In Salangaon, every open page is an invitation to explore the universe.
          </p>
        </div>

        {/* Master Layout: Left Navigation + Right Open Storybook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (5 cols): Metrics & Ribbon Bookmark Discipline Tabs */}
          <div className="library-left lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center backdrop-blur-sm shadow-sm hover:border-[#E8B923]/40 transition-colors">
                <p className="text-2xl font-black text-white">2,500+</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">
                  Volumes
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center backdrop-blur-sm shadow-sm hover:border-[#E8B923]/40 transition-colors">
                <p className="text-2xl font-black text-[#E8B923]">4 Core</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">
                  Disciplines
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center backdrop-blur-sm shadow-sm hover:border-[#E8B923]/40 transition-colors">
                <p className="text-2xl font-black text-emerald-400">100%</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">
                  Free Access
                </p>
              </div>
            </div>

            {/* Bookmark Tabs: Genre Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-black uppercase tracking-wider text-white/50">
                  Select a Learning Realm
                </p>
                <span className="text-[11px] text-[#E8B923] font-medium">
                  Tap to open page
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Library Disciplines"
                className="flex flex-col gap-2.5"
              >
                {categories.map((cat, idx) => {
                  const isSelected = activeCategoryIndex === idx;
                  const CatIcon = cat.IconComponent;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`group relative text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B923] ${
                        isSelected
                          ? "bg-white/15 border-2 border-[#E8B923] text-white shadow-xl shadow-[#E8B923]/10 translate-x-2"
                          : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isSelected
                              ? "bg-[#E8B923] text-[#1E2A44] shadow-md scale-105"
                              : "bg-white/10 text-white/70 group-hover:text-white group-hover:bg-white/15"
                          }`}
                        >
                          <CatIcon size={20} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#E8B923]/80">
                              Vol. {cat.categoryNumber}
                            </span>
                          </div>
                          <p className="text-sm font-bold truncate text-white">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-white/50 truncate">
                            {cat.subtitle.split("•")[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                            isSelected
                              ? "bg-[#E8B923] text-[#1E2A44]"
                              : "bg-white/10 text-white/60"
                          }`}
                        >
                          {cat.count}
                        </span>
                        {isSelected && (
                          <span className="text-[#E8B923] text-xs font-bold hidden sm:inline-block">
                            →
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student & Teacher Quote Ribbon */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3 text-xs text-white/75 italic">
              <Quote size={20} className="text-[#E8B923] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                "For our rural children in Salangaon, holding an illustrated book isn't just schoolwork—it's their passport to explore the cosmos and understand the world."
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): The Open Illustrated Storybook */}
          <div className="library-book lg:col-span-7 flex flex-col">
            
            {/* The Physical Storybook Container */}
            <div className="relative rounded-3xl bg-[#0e172a] border-2 border-[#E8B923]/30 shadow-2xl p-2 sm:p-3 overflow-hidden flex-grow flex flex-col justify-between">
              
              {/* Outer Hardcover Spine Rim / Gold Leaf Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#E8B923]/40 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#E8B923]/40 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#E8B923]/40 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#E8B923]/40 rounded-br pointer-events-none" />

              {/* Silk Bookmark Ribbon Hanging from the Top Spine */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
                <div className="w-4 h-10 bg-red-600 shadow-lg rounded-b flex items-end justify-center pb-1 border-b-2 border-red-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
                </div>
              </div>

              {/* The Two Open Pages (Left Page: Vignette, Right Page: Story Details) */}
              <div className="relative w-full h-full rounded-2xl bg-[#111c35] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-inner">
                
                {/* Center Book Fold Spine Crease Shadow (visible on md+) */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 page-fold-shadow z-20 pointer-events-none" />

                {/* ========================================================
                 * LEFT PAGE: Dynamic Animated SVG Scene & Page Header
                 * ======================================================== */}
                <div className="md:col-span-5 p-5 sm:p-6 bg-[#0c162b] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                  
                  {/* Page Top Stamp Header */}
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider z-10">
                    <span className="text-[#E8B923]">
                      Plate {activeCategory.categoryNumber}
                    </span>
                    <span className="text-white/40">
                      John Martyn Archives
                    </span>
                  </div>

                  {/* Centered Illustrated Animated Scene */}
                  <div className="my-auto py-4 flex items-center justify-center relative min-h-[220px]">
                    {renderVignette()}
                  </div>

                  {/* Page Footer Caption & Page Number */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 z-10">
                    <span className="italic truncate max-w-[150px]">
                      {activeCategory.name}
                    </span>
                    <span className="font-mono text-white/40 font-bold">
                      pg. {Number(activeCategory.categoryNumber) * 24}
                    </span>
                  </div>
                </div>

                {/* ========================================================
                 * RIGHT PAGE: Curated Titles, Library Stamp & Action
                 * ======================================================== */}
                <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-[#13203c] relative">
                  
                  {/* Subtle paper background grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div>
                    {/* Library Official Catalog Stamp */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#E8B923]/40 bg-[#E8B923]/10 text-[#E8B923] text-[10px] font-black tracking-widest uppercase">
                        <Star size={11} className="fill-[#E8B923]" />
                        <span>{activeCategory.stampText}</span>
                      </div>
                      <span className="text-[11px] font-mono text-white/40">
                        JMMS-CAT-0{activeCategory.categoryNumber}
                      </span>
                    </div>

                    {/* Category Title & Subtitle */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-[#E8B923]/20 text-[#E8B923] flex items-center justify-center shrink-0">
                          <ActiveCategoryIcon size={16} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {activeCategory.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#E8B923] font-medium">
                        {activeCategory.subtitle}
                      </p>
                    </div>

                    {/* Category Narrative Description */}
                    <p className="mt-3 text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
                      {activeCategory.desc}
                    </p>

                    {/* Curated Volumes in Circulation (Library Cards) */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[11px] font-black uppercase tracking-wider text-white/60">
                          Featured Volumes on Shelf:
                        </p>
                        <span className="text-[10px] text-white/40">
                          4 of {activeCategory.count}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeCategory.featuredBooks.map((book, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E8B923]/40 hover:bg-white/10 transition-all flex flex-col justify-between group cursor-default"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="text-xs font-bold text-white group-hover:text-[#E8B923] transition-colors truncate">
                                {book.title}
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white/60 shrink-0">
                                {book.badge}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/45 truncate mt-1">
                              {book.author}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Storybook Bottom Action Ribbon */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
                      <Heart size={13} className="text-[#E8B923] shrink-0" />
                      <span>100% donated &amp; sustained by benefactors</span>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8B923] text-[#1E2A44] font-black text-xs hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-[#E8B923]/20 shrink-0"
                    >
                      <span>Sponsor a Book Box</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
