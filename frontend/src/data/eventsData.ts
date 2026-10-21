export interface SchoolEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  day: string;
  month: string;
  year: string;
  time?: string;
  location: string;
  summary: string;
  fullDescription: string[];
  image: string;
  galleryImages?: string[];
  badgeColor: string;
}

export const schoolEventsData: SchoolEvent[] = [
  {
    id: "annual-sports-day-2025",
    slug: "annual-sports-day-2025",
    title: "Annual Sports Day 2025",
    category: "Sports & Athletics",
    date: "February 22, 2025",
    day: "22",
    month: "FEB",
    year: "2025",
    time: "9:00 AM – 2:00 PM",
    location: "JMMS School Grounds, Salangaon",
    summary:
      "A day of thrills and triumphs! Our school's Annual Sports Day was held with colorful house marchpasts, track competitions, and community cheers.",
    fullDescription: [
      "A day of thrills and triumphs. Our school’s Annual Sport’s Day was held on February 22, 2025 with great enthusiasm and excitement.",
      "The event witnessed spectacular teamwork and sportsmanship among our students. The day began with a colorful marchpast by the four houses — 'Jal', 'Agni', 'Surya', and 'Dharti' — followed by a series of thrilling events including track and field competitions and fun games.",
      "Our students showcased their exceptional skills, speed, and agility, leaving the audience in awe. The energy on the grounds was palpable as teachers, parents, and village community members cheered for every child.",
      "The event concluded with an inspiring prize distribution ceremony where our esteemed Principal Ms. Promita Sen and our Chief Guest Wing Commander Satish Aparajit awarded medals, trophies, and books to the winning participants and houses.",
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80",
    ],
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "spring-loom-craft-exhibition-2025",
    slug: "spring-loom-craft-exhibition-2025",
    title: "Spring Loom & Textile Craft Expo",
    category: "Arts & Vocational Craft",
    date: "March 15, 2025",
    day: "15",
    month: "MAR",
    year: "2025",
    time: "10:00 AM – 3:00 PM",
    location: "JMMS Loom Room & Central Courtyard",
    summary:
      "Showcasing intricate handwoven shawls, embroidery, and patchwork crafted by our students in the school's historic vocational loom workshop.",
    fullDescription: [
      "The annual Spring Loom & Textile Craft Expo is a proud tradition at John Martyn Memorial School, celebrating rural craft heritage.",
      "Children from Classes 3 to 5 demonstrated their skills on traditional wooden looms, presenting vibrant hand-loomed table runners, woolen scarves, and colorful patchworks.",
      "Visiting patrons and parents praised the fine craftsmanship, emphasizing how vocational training builds patience, motor precision, and self-sufficiency.",
    ],
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "classical-music-tabla-recital-2025",
    slug: "classical-music-tabla-recital-2025",
    title: "Himalayan Rhythms: Music & Tabla Recital",
    category: "Performing Arts",
    date: "April 08, 2025",
    day: "08",
    month: "APR",
    year: "2025",
    time: "11:00 AM – 1:30 PM",
    location: "Open Air Amphitheatre, JMMS",
    summary:
      "A soulful afternoon of Indian classical vocals and synchronised tabla jugalbandi, guided by our dedicated full-time music faculty.",
    fullDescription: [
      "Guided by our two dedicated music educators, students performed Indian classical ragas, traditional Garhwali folk ballads, and complex tabla teentaal compositions.",
      "The performance reflected JMMS's commitment to holistic arts education alongside academic subjects.",
      "The audience gave a standing ovation to the young percussionists who performed without sheet notes from memory.",
    ],
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "science-valley-ecology-fair-2025",
    slug: "science-valley-ecology-fair-2025",
    title: "Inter-School Science & Valley Ecology Fair",
    category: "Science & Nature",
    date: "April 26, 2025",
    day: "26",
    month: "APR",
    year: "2025",
    time: "9:30 AM – 2:30 PM",
    location: "JMMS Science Lab & Gardens",
    summary:
      "Hands-on science models, solar cooker experiments, and interactive exhibits on the biodiversity and river systems of the Doon Valley.",
    fullDescription: [
      "Students prepared practical science exhibits covering rainwater harvesting, renewable solar energy, native plant biodiversity, and basic physics mechanics.",
      "Peer schools from Dehradun participated in interactive quizzes and hands-on laboratory workshops.",
      "The emphasis remained on experiential science directly linked to the children's daily rural surroundings.",
    ],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-teal-100 text-teal-800",
  },
  {
    id: "salangaon-community-tree-plantation-2025",
    slug: "salangaon-community-tree-plantation-2025",
    title: "Green Salangaon: Community Plantation Drive",
    category: "Community & Eco",
    date: "May 12, 2025",
    day: "12",
    month: "MAY",
    year: "2025",
    time: "7:30 AM – 11:00 AM",
    location: "Salangaon Foothills & JMMS Campus",
    summary:
      "Students, teachers, and village elders join hands to plant 500 indigenous oak and fruit saplings to preserve local water tables.",
    fullDescription: [
      "Environmental stewardship is an essential cornerstone of the JMMS philosophy. Every student adopts a sapling and nurtures it through the academic year.",
      "Supported by local forest department mentors, children learned the role of root systems in preventing landslide erosion in mountain foothills.",
      "The morning concluded with a community breakfast prepared collaboratively with parent volunteers.",
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: "visit-to-gyananda-school",
    slug: "visit-to-gyananda-school",
    title: "Visit to Gyananda School",
    category: "Inter-School Exchange",
    date: "August 16, 2024",
    day: "16",
    month: "AUG",
    year: "2024",
    time: "8:30 AM – 12:00 PM",
    location: "Gyananda School, Dehradun",
    summary:
      "15 children of Class V along with faculty visited Gyananda School for special assemblies, collaborative reading circles, and peer exchange.",
    fullDescription: [
      "15 children of class V and teacher Mrs. Renu were invited to Gyananda School for flag hoisting and a special celebratory assembly.",
      "Our children had a wonderful, enriching day packed with engaging activities, cultural presentations, and friendly camaraderie with peers.",
      "Exposure visits like this broaden our rural students' horizons, nurture social confidence, and build meaningful relationships across different schooling communities in the valley.",
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "39th-annual-day-celebrations",
    slug: "39th-annual-day-celebrations",
    title: "Annual Day Celebrations & Heritage Gala",
    category: "Cultural & Arts",
    date: "November 20, 2024",
    day: "20",
    month: "NOV",
    year: "2024",
    time: "10:00 AM – 3:30 PM",
    location: "Open Air Amphitheatre, JMMS",
    summary:
      "Celebrating decades of service with dynamic student folk dances, theatrical dramas, choral recitals, and prestigious academic honors.",
    fullDescription: [
      "The Annual Day marked another monumental milestone in John Martyn Memorial School's four-decade journey in Salangaon.",
      "Students from Nursery to Class 5 captivated parents, guests, and alumni with regional Garhwali folk dances, Hindi dramas, and English choral recitations.",
      "Distinguished trustees and community leaders commended the faculty and presented academic and character excellence awards to budding achievers.",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "independence-day-celebration",
    slug: "independence-day-celebration",
    title: "Independence Day & Tricolor Assembly",
    category: "National Celebration",
    date: "August 15, 2024",
    day: "15",
    month: "AUG",
    year: "2024",
    time: "8:00 AM – 11:30 AM",
    location: "JMMS Assembly Grounds",
    summary:
      "Patriotic songs, tricolor flag hoisting, and inspiring student speeches reflecting on unity, freedom, and the empowering gift of education.",
    fullDescription: [
      "The campus was dressed in the vibrant hues of the Tiranga as students, staff, and village elders assembled to commemorate India's Independence Day.",
      "The national flag was unfurled by the Principal, followed by the National Anthem resonating through the Doon foothills.",
      "Students delivered passionate speeches in Hindi and English on freedom fighters, constitutional values, and their personal aspirations for the nation.",
    ],
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-rose-100 text-rose-800",
  },
  {
    id: "himalayan-birdwatching-nature-trail-2024",
    slug: "himalayan-birdwatching-nature-trail-2024",
    title: "Himalayan Birdwatching & Nature Trail",
    category: "Science & Nature",
    date: "October 14, 2024",
    day: "14",
    month: "OCT",
    year: "2024",
    time: "7:00 AM – 10:30 AM",
    location: "Salangaon Reserve Forest Trail",
    summary:
      "Early morning ornithology walk where students recorded over 40 native bird species and learned the principles of Himalayan forest conservation.",
    fullDescription: [
      "Accompanied by wildlife naturalists from Dehradun, Class 4 and 5 students set out at dawn on the Salangaon forest trail.",
      "Equipped with field binoculars and illustrated bird guides, the children identified Himalayan bulbuls, woodpeckers, and paradise flycatchers.",
      "The trail deepened their appreciation for local mountain biodiversity and the need to preserve clean stream ecosystems in the foothills.",
    ],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "childrens-day-cultural-play-puppet-theatre-2024",
    slug: "childrens-day-cultural-play-puppet-theatre-2024",
    title: "Children's Day Gala & Folk Puppet Theatre",
    category: "Cultural & Arts",
    date: "November 14, 2024",
    day: "14",
    month: "NOV",
    year: "2024",
    time: "10:30 AM – 2:00 PM",
    location: "JMMS Central Amphitheatre",
    summary:
      "A joyful day of traditional Garhwali shadow puppetry, humorous student plays, musical choirs, and sweet distributions celebrating childhood.",
    fullDescription: [
      "Children's Day at JMMS is celebrated as a celebration of innocence, creativity, and the right of every child to joyful learning.",
      "Teachers put up surprise theatrical skits for the students, followed by traditional folk puppetry depicting moral fables from the Panchatantra.",
      "Every student received storybooks and festive sweets distributed by community elders and visiting trustees.",
    ],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-rose-100 text-rose-800",
  },
];
