import { MapPin, Mail, Phone, Quote } from "../components/ui/Icons";
import historyBanner from "../assets/history-banner.webp";
import pic1 from "../assets/Picture1.png";
import pic2 from "../assets/Picture2.jpg";
import pic3 from "../assets/Picture3.jpg";
import photoRahul from "../assets/mr-rahul.png";
import photoPhilip from "../assets/mr-philip.png";
import photoNarain from "../assets/mr-narain.png";
import photoGoyal from "../assets/mr-goyal.png";
import photoPadamvir from "../assets/mr-padamvir.png";
import photoAftab from "../assets/mr-aftab.jpg";
import photoChandani from "../assets/ms-chandani.png";
import photoSinghVirk from "../assets/mr-singh-virk.png";
import photoVibha from "../assets/ms-vibha.png";
import photoJagpreet from "../assets/mr-jagpreet.png";
import photoSameer from "../assets/mr-sameer.jpeg";
import principalPhoto from "../assets/jmmt-principal.JPG";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HistoryEntry {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}

interface Trustee {
  name: string;
  role?: string;
  badge?: string;
  photoUrl?: string;
  bio?: string;
  highlights?: string[];
  address?: string;
  email?: string;
  phone?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const historyEntries: HistoryEntry[] = [
  {
    title: "Established in 1985",
    body: "Established in 1985, The John Martyn Memorial School is a charitable primary school for children from rural areas of Dehradun. The school was formed in Salangaon as a response to the desperate need for a good primary education of children from 20 surrounding villages. Children from impoverished families, who had no access to quality education, are provided with an opportunity to create a strong foundation of learning for a brighter future.",
    image: pic1,
    imageAlt: "John Martyn Memorial School — founding days, 1985",
  },
  {
    title: "Origin",
    body: "After the sad demise of Mr John Martyn, the legendary Headmaster of The Doon School, his wife Mrs Mady Martyn started the JMMS in partnership with the notable educationist Mr Gulab Ramchandani and one of India's leading women diplomats and politicians, Mrs Vijayalakshmi Pandit. The school took its first steps with generous support of British High Commission, The Doon School, Rotary Club of Victoria Harbourside, Swedish Organization for Individual Relief, and many other benefactors.",
    image: pic2,
    imageAlt: "Founders and early supporters of JMMS",
  },
  {
    title: "Journey",
    body: "The past 37 years has been an incredible journey as the school witnessed lives of many disadvantaged children transforming because of quality primary education. Since its inception, JMMS has grown from 25 students in a tent to 175 students in 7 classes from Nursery to grade 5. Most of these children are first generation learners in their families.",
    image: pic3,
    imageAlt: "JMMS students through the decades",
  },
];

const trustees: Trustee[] = [
  {
    name: "Mr. Rahul Gupta",
    badge: "Managing Trustee",
    photoUrl: photoRahul,
    bio: "Seasoned Entrepreneur and Business Development Leader with 20+ years of experience driving sales, building relationships, and managing teams across diverse industries (Legal, Hospitality, Education, IT). Proven ability to develop and execute strategic plans, resulting in revenue growth and market expansion. Skilled in branding, marketing, and customer acquisition. Holds an MBA with a focus on international management.",
    highlights: [
      "Successfully launched and managed multiple businesses in India and the US.",
      "Closed deals exceeding $100 million with Fortune 500 companies and Wall Street firms.",
      "Established offshore development centers and implemented Six Sigma quality standards.",
      "Led cross-functional teams and built strong relationships with key stakeholders.",
      "Passionate about leadership, entrepreneurship, and social service.",
    ],
    address: "111 Rajpur Road, Dehradun - 248001",
    email: "Chessy70@gmail.com",
    phone: "+91 9897978215",
  },
  {
    name: "Mr. Philip Burret",
    photoUrl: photoPhilip,
    address: "G1-301 Pacific Golf Estate, Sahastradhara, Dehradun - 248013",
    email: "phylb712@gmail.com",
    phone: "01352526400, +91 9412048258",
  },
  {
    name: "Ms. Ramni Nirula",
    bio: "Ms. Nirula has over three decades of experience in the financial sector, beginning her career with erstwhile ICICI Limited in 1976 in Project Appraisal. She has held senior leadership positions across Project Financing, Strategy, Planning & Resources, and Corporate Banking. She served as Managing Director & CEO of ICICI Securities Limited and headed the Corporate Banking Group of ICICI Bank. She was also part of the senior management team that helped transform ICICI Bank into a technology-led, diversified financial services group with a strong retail presence. After retiring as Senior General Manager, she served as an advisor and key management team member at ICICI Foundation. She has served on the boards of several ICICI Group and leading Indian companies, as well as Welham Girls' School, Dehradun. Ms. Nirula holds a Bachelor's degree in Economics and an MBA from Delhi University.",
    highlights: [
      "Over three decades of experience in the financial sector, starting with ICICI Limited in 1976.",
      "Served as Managing Director & CEO of ICICI Securities Limited.",
      "Headed the Corporate Banking Group of ICICI Bank.",
      "Part of senior management team that transformed ICICI Bank into a technology-led financial services group.",
      "Served on boards of several ICICI Group and leading Indian companies.",
      "Board member of Welham Girls' School, Dehradun.",
      "Holds a Bachelor's degree in Economics and an MBA from Delhi University.",
    ],
    email: "ramninirula@gmail.com",
    phone: "+91 9810191284",
  },
  {
    name: "Mr. Ashutosh Goyal",
    role: "Secretary, The Doon School Old Boys Society",
    photoUrl: photoGoyal,
    address: "21-A Teg Bahadur Road, Dehradun - 248001",
    email: "dosco@india.com",
    phone: "+91 9412052456",
  },
  {
    name: "Mr. Padamvir Singh",
    photoUrl: photoPadamvir,
    address:
      "B-710 Pacific Hills Mussoorie Diversion, Rajpur Road, Dehradun 248009",
    email: "padamvirsingh@gmail.com",
    phone: "+91 8968898059",
  },
  {
    name: "Mr. Aftab Seth",
    photoUrl: photoAftab,
    bio: "Aftab is a distinguished diplomat, scholar, and poet with a storied career spanning multiple continents. Currently serving as President of the Global Schools Foundation and Chairman of the Global Indian International Schools in Japan, he also chairs the Yoga Organization of Japan. His extensive diplomatic service includes roles as Consul General in Hamburg, Karachi, Cairo, Beirut, and Jakarta, and as Ambassador to Greece, Vietnam, and Japan. Born in Patna on September 17, 1943, Aftab has authored several notable works, including Half A Century: My Connections with Japan, and has deep expertise in the Japanese language, history, and culture. His academic journey includes a First Class degree in History from St. Stephen’s College, a Rhodes Scholarship at Oxford University, and a tenure as Director of the Global Security Research Institute at Keio University, Japan. His career reflects a profound engagement with Japan, from early diplomatic roles to influential academic and cultural contributions.",
    address:
      "Flat No.521, Antara Senior Living, Guniyal Gaon, Dehradun - 248003",
    email: "aftabseth@hotmail.com",
    phone: "+91 9811944183",
  },
  {
    name: "Ms. Chandani Batta",
    role: "Kasiga School",
    photoUrl: photoChandani,
    address: "Kasiga School, Dehradun - 248009",
    email: "chandni@kasiga.com",
    phone: "+91 999763999",
  },
  {
    name: "Mr. Dilsher Singh Virk",
    photoUrl: photoSinghVirk,
    bio: "Mr Dilsher Virk, son of Mady Martyn, the Founder of the John Martyn Memorial School, was born at Bombay in 1943. He was educated at the Doon School in Dehradun where he completed his Higher School Certificate (HSc). He graduated with Honours in Mechanical Engineering from the Imperial College (London University) in 1967. At that time he moved to Canada where he has been working as a software engineer, and latterly a consultant, till his retirement in 2010. His specialization is in Geomatics and Cadastral Mapping. Mr. Virk was a registered Professional Engineer in the Province of Alberta for over 20 years. He is a current member and past president of the Rotary Club of Victoria – Harbourside. Some initial projects of the JMMTrust were funded by this Rotary Club.",
    address: "40, Durrance Road, British Columbia V8X4M6, Canada",
    email: "dsvirk@gmail.com",
    phone: "+91 9810147925, +2506866265",
  },
];

const exOfficioTrustees: Trustee[] = [
  {
    name: "Ms. Vibha Kapoor",
    role: "Principal, Welham Girls' School",
    badge: "Ex-Officio Trustee",
    photoUrl: photoVibha,
    address:
      "19, Municipal Rd, Panchpuri Colony, Dalanwala, Dehradun, Uttarakhand - 248001",
    email: "principal@welhamgirls.com",
  },
  {
    name: "Mr. Jagpreet Singh",
    role: "Headmaster, The Doon School",
    badge: "Ex-Officio Trustee",
    photoUrl: photoJagpreet,
    address: "The Doon School, Mall Road, Dehradun - 248001",
    email: "hm@doonschool.com",
    phone: "01352526400, 7088992223",
  },
  {
    name: "Mr. Sameer Dhingra",
    role: "President, The Doon School Old Boys Society",
    badge: "Ex-Officio Trustee",
    photoUrl: photoSameer,
    address:
      "1007 10th floor, Bhikaji Cama Bhawan, Bhikaji Cama Place, New Delhi 110066",
  },
  {
    name: "Mr. Rahul Narain Bhagat",
    badge: "Ex-Officio Trustee",
    photoUrl: photoNarain,
    address:
      "B-502 Viva Rea, Sane Guruji Marg, Jacob Circle, Mumbai 400011, Maharashtra",
    email: "rnb2709@gmail.com",
    phone: "+91 9820189324",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Eyebrow label reused across all three sections */
const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="h-px w-8 bg-[#E8B923]" />
    <span className="text-xs font-black uppercase tracking-widest text-[#E8B923]">
      {label}
    </span>
  </div>
);

// ─── Section 1: School History ────────────────────────────────────────────────

const SchoolHistory = () => (
  <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
    <div className="max-w-5xl mx-auto">
      <SectionEyebrow label="School history" />
      <h2 className="text-3xl sm:text-4xl font-black text-[#1E2A44] mb-14 leading-tight">
        Four Decades of Purpose
      </h2>

      {/* Timeline wrapper */}
      <div className="relative flex flex-col gap-0">
        {historyEntries.map((entry, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div key={entry.title} className="relative flex gap-0">
              {/* ── Left gutter: dot + continuous line ── */}
              <div className="flex flex-col items-center w-10 shrink-0 mr-6 sm:mr-10">
                {/* dot */}
                <div className="relative z-10 mt-2 w-3.5 h-3.5 rounded-full bg-[#E8B923] border-2 border-[#1E2A44] shrink-0" />
                {/* line segment — hidden on last item */}
                {idx < historyEntries.length - 1 && (
                  <div className="flex-1 w-px bg-[#E8B923]/40 mt-1" />
                )}
              </div>

              {/* ── Entry content ── */}
              <div
                className={`flex-1 flex flex-col md:flex-row gap-8 pb-16 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* History photo */}
                <div className="w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden aspect-video">
                  <img
                    src={entry.image}
                    alt={entry.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44] mb-4 leading-snug">
                    {entry.title}
                  </h3>
                  <p className="text-[#1E2A44]/75 text-sm sm:text-base leading-relaxed">
                    {entry.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Section 2: Principal's Message ──────────────────────────────────────────

const PrincipalsMessage = () => (
  <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1E2A44]">
    <div className="max-w-4xl mx-auto">
      <SectionEyebrow label="Principal's message" />
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-10 leading-tight">
        A Word from Our Principal
      </h2>

      {/* Editorial spotlight band */}
      <div className="bg-white/5 border border-white/10 rounded-3xl px-5 sm:px-10 lg:px-12 py-8 sm:py-10">
        {/* Decorative quote icon */}
        <Quote
          size={48}
          strokeWidth={1.5}
          className="text-[#E8B923] mb-6 opacity-80"
        />

        {/* Avatar + name */}
        <div className="flex items-center gap-5 mb-8">
          {/* Principal photograph container */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 border-[#E8B923]/40 shrink-0 overflow-hidden shadow-inner relative">
            <img
              src={principalPhoto}
              alt="Ms. Anu Ahuja – Principal, JMMS"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <p className="text-white font-black text-lg">Ms. Anu Ahuja</p>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E8B923] text-[#1E2A44]">
                18 Yrs Experience
              </span>
            </div>
            <p className="text-[#E8B923] text-sm font-semibold">
              Principal, JMMS
            </p>
          </div>
        </div>

        {/* Principal's Message */}
        <div className="space-y-6 text-white/90 text-base leading-relaxed">
          <p>
            My vision for John Martyn Memorial School is simple — to build a school where every child feels seen, valued, 
            and empowered to <strong className="text-[#E8B923]">Learn, Lead, and Serve</strong>.
          </p>
          
          <p>
            I believe education must go beyond marks. It must nurture curiosity, build character, and instill 
            responsibility. At JMMS, we strive to create classrooms where children ask questions freely, 
            playgrounds where they learn teamwork, and a community where they understand the joy of giving back.
          </p>
          
          <p>
            The last few years have taught us that resilience and compassion matter as much as academics. 
            That is why, along with strong learning, we focus on values, discipline, and service to others.
          </p>
          
          <div className="border-t border-white/10 pt-6 space-y-3">
            <p className="font-semibold text-[#E8B923]">
              To our students: <span className="text-white font-normal">Dream big, work hard, and lead with integrity.</span>
            </p>
            
            <p className="font-semibold text-[#E8B923]">
              To our parents and teachers: <span className="text-white font-normal">Thank you for being partners in this journey. Together, let us raise young people who are confident, kind, and ready to make a difference.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Section 3: Board of Trustees ────────────────────────────────────────────

const TrusteeCard = ({
  trustee,
  index,
}: {
  trustee: Trustee;
  index: number;
}) => {
  const isReversed = index % 2 === 1;

  return (
    <div className="py-12 border-b border-[#1E2A44]/10 last:border-b-0">
      {/* Profile spread */}
      <div
        className={`flex flex-col sm:flex-row gap-8 sm:gap-12 ${
          isReversed ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/* Photo */}
        <div className="sm:w-48 shrink-0 flex flex-col items-center sm:items-start">
          <div className="w-36 h-36 rounded-2xl bg-[#1E2A44]/5 border border-[#1E2A44]/10 flex items-center justify-center overflow-hidden shadow-sm">
            {trustee.photoUrl ? (
              <img
                src={trustee.photoUrl}
                alt={trustee.name}
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            ) : (
              <div className="text-center p-4">
                <svg
                  className="w-10 h-10 text-[#1E2A44]/25 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <p className="text-[10px] text-[#1E2A44]/40 font-semibold tracking-wide uppercase">
                  Photo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bio & Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44]">
              {trustee.name}
            </h3>
            {trustee.badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8B923]/20 text-[#1E2A44] border border-[#E8B923]/40">
                {trustee.badge}
              </span>
            )}
          </div>

          {trustee.role && (
            <p className="text-xs sm:text-sm font-bold text-[#E8B923] tracking-wide uppercase mb-3">
              {trustee.role}
            </p>
          )}

          {trustee.bio && (
            <p className="text-[#1E2A44]/75 text-sm sm:text-base leading-relaxed mb-4">
              {trustee.bio}
            </p>
          )}

          {trustee.highlights && trustee.highlights.length > 0 && (
            <div className="mb-5 bg-[#1E2A44]/[0.02] border border-[#1E2A44]/5 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wider text-[#1E2A44] mb-2.5">
                Key Highlights:
              </p>
              <ul className="space-y-1.5">
                {trustee.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1E2A44]/80 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact strip */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-[#1E2A44]/70 font-medium pt-2">
            {trustee.address && (
              <span className="flex items-start gap-2">
                <MapPin size={15} className="text-[#E8B923] shrink-0 mt-0.5" />
                <span>{trustee.address}</span>
              </span>
            )}
            {trustee.email && (
              <a
                href={`mailto:${trustee.email.trim()}`}
                className="flex items-center gap-2 hover:text-[#1E2A44] transition-colors"
              >
                <Mail size={15} className="text-[#E8B923] shrink-0" />
                <span>{trustee.email.trim()}</span>
              </a>
            )}
            {trustee.phone && (
              <span className="flex items-center gap-2">
                <Phone size={15} className="text-[#E8B923] shrink-0" />
                <span>{trustee.phone}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardOfTrustees = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
    <div className="max-w-5xl mx-auto">
      <SectionEyebrow label="Leadership & Governance" />
      <h2 className="text-3xl sm:text-4xl font-black text-[#1E2A44] mb-3 leading-tight">
        Board of Trustees
      </h2>
      <p className="text-[#1E2A44]/70 text-sm sm:text-base max-w-2xl mb-12">
        Distinguished leaders, educators, and visionaries dedicated to guiding
        John Martyn Memorial School and fostering its founding mission.
      </p>

      {/* Main Board Trustees */}
      <div className="divide-y divide-[#1E2A44]/10">
        {trustees.map((trustee, idx) => (
          <TrusteeCard key={trustee.name + idx} trustee={trustee} index={idx} />
        ))}
      </div>

      {/* Ex-Officio Trustees Sub-section */}
      <div className="mt-20 pt-16 border-t-2 border-[#1E2A44]/10">
        <div className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#E8B923]">
            Institutional Guardianship
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#1E2A44] mt-1.5">
            Ex-Officio Trustees
          </h3>
          <p className="text-[#1E2A44]/70 text-sm mt-1">
            Institutional heads and leadership providing continuing guidance and
            solidarity.
          </p>
        </div>

        <div className="divide-y divide-[#1E2A44]/10">
          {exOfficioTrustees.map((trustee, idx) => (
            <TrusteeCard
              key={trustee.name + idx}
              trustee={trustee}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Page hero banner ─────────────────────────────────────────────────────────

const AboutHero = () => (
  <div
    className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    style={{
      backgroundImage: `url(${historyBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Gradient overlay: transparent at top → solid navy at bottom for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A44]/30 via-[#1E2A44]/55 to-[#1E2A44]/85" />

    <div className="relative z-10 max-w-5xl mx-auto">
      <p className="text-[#E8B923] text-xs font-black uppercase tracking-widest mb-4">
        About JMMS
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
        Our Story, <br className="hidden sm:block" />
        Our People
      </h1>
      <p className="text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed">
        Since 1985, John Martyn Memorial School has been a beacon of hope for
        children from 20 rural villages around Salangaon — transforming
        impoverished beginnings into brighter futures through quality primary
        education.
      </p>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const AboutPage = () => (
  <>
    <AboutHero />
    <SchoolHistory />
    <PrincipalsMessage />
    <BoardOfTrustees />
  </>
);

export default AboutPage;
