import shubhamImg from "../assets/shubham.png";

export interface Story {
  id: string;
  category: "achiever" | "parent" | "community";
  name: string;
  role: string;
  badge: string;
  quote: string;
  achievement: string;
  avatar: string;
  details?: string;
  storyTitle?: string;
}

export const storiesData: Story[] = [
  {
    id: "shubham-dhiman",
    category: "achiever",
    name: "Shubham Dhiman",
    role: "JMMS & The Doon School Alumnus",
    badge: "Full Ashoka Scholarship",
    storyTitle: "From JMMS Classrooms to Ashoka University & Doon School Weekly Editor",
    quote:
      "Shubham was helpful by nature, especially when new tasks came up one after the other. 'Don’t worry, I will do it', he said often. He kept a level head even if he did get frustrated at times. He was quite artistic and enjoyed drawing and making greeting cards.",
    achievement: "Full scholarship at Ashoka University • Boxing Captain • Published Hindi Poet",
    avatar: shubhamImg,
    details:
      "Shubham Dhiman has just finished his schooling at the Doon School and has been given a full scholarship by the most-sought-after Ashoka University at Sonepat, Haryana. Shubham left Doon with full school colours, as boxing captain and editor of the Hindi edition of the Doon School Weekly. He has published a book of his Hindi poems, breaking the myth that jocks cannot think!",
  },
  {
    id: "rohit-negi",
    category: "achiever",
    name: "Rohit Negi",
    role: "JMMS Alumnus (Class of 2018)",
    badge: "Scholarship Achiever",
    quote:
      "John Martyn Memorial School gave me the confidence to believe in my potential. The teachers stayed after hours to help me prepare for senior school entrance exams.",
    achievement: "Now pursuing BSc Computer Science on full scholarship",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "sunita-rawat",
    category: "achiever",
    name: "Sunita Rawat",
    role: "JMMS Alumna (Class of 2020)",
    badge: "State Level Athlete",
    quote:
      "At JMMS, sports and arts were just as valued as books. The skills development program taught me discipline, focus, and self-belief.",
    achievement: "Gold Medalist at Uttarakhand Junior Athletics",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "priya-sharma",
    category: "parent",
    name: "Priya Sharma",
    role: "Mother of Class 3 Student",
    badge: "Parent Community Member",
    quote:
      "Going by the school’s motto that childhood is a journey, my son never feels burdened. He comes home brimming with curiosity and eager to share what he read in the library.",
    achievement: "Active member in the parent reading circle",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rajesh-kumar",
    category: "parent",
    name: "Rajesh Kumar",
    role: "Father of Class 5 Student",
    badge: "Village Artisan",
    quote:
      "The dedicated teachers with decades of experience treat each student like family. My daughter’s spoken English and mathematical skills have improved tremendously.",
    achievement: "Daughter selected for Inter-School Science Fair",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "kamla-devi",
    category: "community",
    name: "Kamla Devi",
    role: "Village Community Staff & Parent",
    badge: "Community Team Member",
    quote:
      "JMMS didn’t just educate our kids; it identified skills among village parents and welcomed us into the school’s working team. It gave our household financial security and pride.",
    achievement: "School Nutrition & Garden Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
];
