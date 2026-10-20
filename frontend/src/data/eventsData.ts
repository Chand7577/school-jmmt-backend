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
      "A day of thrills and triumphs! Our school's Annual Sports Day was held on February 22, 2025 with great enthusiasm and excitement.",
    fullDescription: [
      "A day of thrills and triumphs. Our school’s Annual Sport’s Day was held on February 22, 2025 with great enthusiasm and excitement.",
      "The event witnessed spectacular teamwork and sportsmanship among our students. The day began with a colorful marchpast by the four houses — 'Jal', 'Agni', 'Surya', and 'Dharti' — followed by a series of thrilling events including track and field competitions and fun games.",
      "Our students showcased their exceptional skills, speed, and agility, leaving the audience in awe. The energy on the grounds was palpable as teachers, parents, and village community members cheered for every child.",
      "The event concluded with an inspiring prize distribution ceremony where our esteemed Principal Ms. Promita Sen and our Chief Guest Wing Commander Satish Aparajit awarded medals, trophies, and books to the winning participants and houses.",
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80",
    ],
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "visit-to-gyananda-school",
    slug: "visit-to-gyananda-school",
    title: "Visit to Gyananda School",
    category: "Inter-School Exchange",
    date: "August 16, 2023",
    day: "16",
    month: "AUG",
    year: "2023",
    time: "8:30 AM – 12:00 PM",
    location: "Gyananda School, Dehradun",
    summary:
      "15 children of class V along with teacher Mrs. Renu were invited to Gyananda School for flag hoisting, special assembly, and interactive collaborative activities.",
    fullDescription: [
      "16th AUGUST 2023: 15 children of class V and teacher Mrs. Renu were invited to Gyananda School for flag hoisting and a special celebratory assembly from 8:30 AM to 12:00 PM.",
      "Our children had a wonderful, enriching day packed with engaging activities, cultural presentations, and friendly camaraderie with peers.",
      "Exposure visits like this broaden our rural students' horizons, nurture social confidence, and build meaningful relationships across different schooling communities in the valley.",
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    ],
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "39th-annual-day-celebrations",
    slug: "39th-annual-day-celebrations",
    title: "39th Annual Day Celebrations",
    category: "Cultural & Arts",
    date: "November 20, 2024",
    day: "20",
    month: "NOV",
    year: "2024",
    time: "10:00 AM – 3:30 PM",
    location: "Open Air Amphitheatre, JMMS",
    summary:
      "Celebrating 39 glorious years of service with dynamic student folk dances, musical plays, poetry recitals, and academic honors.",
    fullDescription: [
      "The 39th Annual Day marked another monumental milestone in John Martyn Memorial School's four-decade journey in Salangaon.",
      "Students from Nursery to Class 5 captivated parents, guests, and alumni with regional Garhwali folk dances, Hindi dramas, and English choral recitations.",
      "Distinguished trustees and community leaders commended the faculty and presented academic and character excellence awards to budding achievers.",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "independence-day-celebration",
    slug: "independence-day-celebration",
    title: "Independence Day Celebration",
    category: "National Celebration",
    date: "August 15, 2024",
    day: "15",
    month: "AUG",
    year: "2024",
    time: "8:00 AM – 11:30 AM",
    location: "JMMS Assembly Grounds",
    summary:
      "Patriotic songs, tricolor unfurling, and student speeches reflecting on unity, freedom, and the transformative power of education.",
    fullDescription: [
      "The campus was dressed in the vibrant hues of the Tiranga as students, staff, and village elders assembled to commemorate India's Independence Day.",
      "The national flag was unfurled by the Principal, followed by the National Anthem resonating through the Doon foothills.",
      "Students delivered passionate speeches in Hindi and English on freedom fighters, constitutional values, and their personal aspirations for the nation.",
    ],
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "bg-rose-100 text-rose-800",
  },
];
