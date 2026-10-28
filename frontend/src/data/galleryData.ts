// Gallery image imports – all HEIC converted to JPG for browser compatibility
import img1033 from "../assets/school-gallery/IMG_1033.jpg";
import img1085 from "../assets/school-gallery/IMG_1085.jpg";
import img1104 from "../assets/school-gallery/IMG_1104.jpg";
import img1175 from "../assets/school-gallery/IMG_1175.jpg";
import img1291 from "../assets/school-gallery/IMG_1291.jpeg";
import img1367 from "../assets/school-gallery/IMG_1367.jpg";
import img1391 from "../assets/school-gallery/IMG_1391.jpg";
import img1465 from "../assets/school-gallery/IMG_1465.jpg";
import img1492 from "../assets/school-gallery/IMG_1492.jpg";
import img1566 from "../assets/school-gallery/IMG_1566.PNG";
import img1567 from "../assets/school-gallery/IMG_1567.PNG";
import img8782 from "../assets/school-gallery/IMG_8782.JPG";
import img8783 from "../assets/school-gallery/IMG_8783.JPG";
import img9126 from "../assets/school-gallery/IMG_9126.jpg";
import img9141 from "../assets/school-gallery/IMG_9141.jpg";
import img9164 from "../assets/school-gallery/IMG_9164.jpg";
import img9285 from "../assets/school-gallery/IMG_9285.JPG";
import img9287 from "../assets/school-gallery/IMG_9287.JPG";
import img9288 from "../assets/school-gallery/IMG_9288.JPG";
import img9289 from "../assets/school-gallery/IMG_9289.JPG";
import img9290 from "../assets/school-gallery/IMG_9290.JPG";
import img9291 from "../assets/school-gallery/IMG_9291.JPG";
import img9314 from "../assets/school-gallery/IMG_9314.jpg";
import img9315 from "../assets/school-gallery/IMG_9315.PNG";
import img9316 from "../assets/school-gallery/IMG_9316.PNG";
import img9318 from "../assets/school-gallery/IMG_9318.PNG";
import img9348 from "../assets/school-gallery/IMG_9348.jpg";
import img9353 from "../assets/school-gallery/IMG_9353.jpg";
import img9356 from "../assets/school-gallery/IMG_9356.jpg";
import img9852 from "../assets/school-gallery/IMG_9852.jpg";

export type GalleryCategory = "All" | "Classrooms" | "Events" | "Campus" | "Students";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "wide" | "tall" | "normal"; // masonry hint
}

export const galleryImages: GalleryImage[] = [
  { id: 1,  src: img9285, alt: "School activity",       category: "Students",   span: "wide" },
  { id: 2,  src: img9287, alt: "Students at school",    category: "Students",   span: "normal" },
  { id: 3,  src: img9288, alt: "Classroom session",     category: "Classrooms", span: "normal" },
  { id: 4,  src: img9289, alt: "Students learning",     category: "Classrooms", span: "wide" },
  { id: 5,  src: img9290, alt: "School event",          category: "Events",     span: "normal" },
  { id: 6,  src: img9291, alt: "School gathering",      category: "Events",     span: "normal" },
  { id: 7,  src: img8782, alt: "Campus view",           category: "Campus",     span: "wide" },
  { id: 8,  src: img8783, alt: "School grounds",        category: "Campus",     span: "normal" },
  { id: 9,  src: img1566, alt: "School activity",       category: "Students",   span: "normal" },
  { id: 10, src: img1567, alt: "Student life",          category: "Students",   span: "normal" },
  { id: 11, src: img9315, alt: "Classroom",             category: "Classrooms", span: "wide" },
  { id: 12, src: img9316, alt: "School day",            category: "Classrooms", span: "normal" },
  { id: 13, src: img9318, alt: "Students together",     category: "Students",   span: "normal" },
  { id: 14, src: img9314, alt: "School life",           category: "Campus",     span: "normal" },
  { id: 15, src: img1033, alt: "School moment",         category: "Events",     span: "wide" },
  { id: 16, src: img1085, alt: "Campus life",           category: "Campus",     span: "normal" },
  { id: 17, src: img1104, alt: "Learning in progress",  category: "Classrooms", span: "normal" },
  { id: 18, src: img1175, alt: "Students at school",    category: "Students",   span: "normal" },
  { id: 19, src: img1291, alt: "School event",          category: "Events",     span: "wide" },
  { id: 20, src: img1367, alt: "School gathering",      category: "Events",     span: "normal" },
  { id: 21, src: img1391, alt: "Classroom session",     category: "Classrooms", span: "normal" },
  { id: 22, src: img1465, alt: "Students learning",     category: "Students",   span: "normal" },
  { id: 23, src: img1492, alt: "School activity",       category: "Campus",     span: "wide" },
  { id: 24, src: img9126, alt: "Campus view",           category: "Campus",     span: "normal" },
  { id: 25, src: img9141, alt: "School life",           category: "Students",   span: "normal" },
  { id: 26, src: img9164, alt: "Students together",     category: "Events",     span: "normal" },
  { id: 27, src: img9348, alt: "Classroom moment",      category: "Classrooms", span: "wide" },
  { id: 28, src: img9353, alt: "School day",            category: "Campus",     span: "normal" },
  { id: 29, src: img9356, alt: "Learning together",     category: "Students",   span: "normal" },
  { id: 30, src: img9852, alt: "School gathering",      category: "Events",     span: "normal" },
];

export const galleryCategories: GalleryCategory[] = ["All", "Students", "Classrooms", "Events", "Campus"];
