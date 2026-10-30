import shubhamImg from "../assets/shubham.png";

export interface Story {
  id: string;
  name: string;
  headline: string;
  description: string;
  avatar?: string;
  initials: string;
}

export const storiesData: Story[] = [
  {
    id: "saniya-bhandari",
    name: "Saniya Bhandari",
    headline: "From Student to Mentor",
    description:
      "A proud alumna of John Martyn Memorial School, Saniya Bhandari holds a B.Sc. (Hons.) in Agriculture and has been associated with Yuva Kalyan Samiti (YKS) for two years. She has returned to her alma mater to conduct free classes, helping students prepare for the Jawahar Navodaya Vidyalaya (JNV) entrance examination.",
    initials: "SB",
  },
  {
    id: "radhika",
    name: "Radhika",
    headline: "Pursuing Higher Education with Determination",
    description:
      "Radhika is pursuing a four-year undergraduate programme in B.Sc. Economics (Major) at Ahmedabad University. With the support of financial aid, she continues to work towards her academic goals and a promising future.",
    initials: "R",
  },
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    headline: "Building a Career in Inclusive Education",
    description:
      "After completing her schooling at Doon Valley Public School and Scholars Home, Ananya Sharma enrolled in the Diploma in Indian Sign Language Interpretation (DISLI) programme at NIEPVD, Dehradun, for the 2025–27 session. She is preparing for a career dedicated to communication and inclusion.",
    initials: "AS",
  },
  {
    id: "rahul-das",
    name: "Rahul Das",
    headline: "From Academics to Professional Growth",
    description:
      "Rahul Das completed Class XII at The Doon School in 2017 and earned a B.Sc. in Sports Science from Manipal University in 2021. He subsequently worked in the Administration Department at TCS, Odisha, reflecting his commitment to professional growth.",
    initials: "RD",
  },
  {
    id: "shubham-dhiman",
    name: "Shubham Dhiman",
    headline: "Pursuing Excellence in the Humanities",
    description:
      "Shubham Dhiman completed Class XII at The Doon School in 2018 and went on to pursue English Honours at Ashoka University, Sonipat, Haryana. His academic journey reflects his dedication to higher learning and intellectual growth.",
    avatar: shubhamImg,
    initials: "SD",
  },
  {
    id: "dilip-maurya",
    name: "Dilip Maurya",
    headline: "Turning Technical Knowledge into a Career",
    description:
      "Dilip Maurya completed Class XII at The Doon School in 2020 and pursued Computer Science Engineering at Shoolini University, Himachal Pradesh. He subsequently joined TCS Ltd., Adibatla, Hyderabad, as an Assistant System Engineer – Trainee.",
    initials: "DM",
  },
  {
    id: "kapil-thapli",
    name: "Kapil Thapli",
    headline: "Embracing Global Opportunities",
    description:
      "Kapil Thapli completed Class XII at The Doon School in July 2023 and secured admission to Muskingum University, USA, for a four-year programme in Chemical Engineering. His achievement marks an exciting step towards international higher education.",
    initials: "KT",
  },
  {
    id: "shashank-dhiman",
    name: "Shashank Dhiman",
    headline: "A Promising Step Towards International Education",
    description:
      "Currently studying in Class XII at The Doon School, Shashank Dhiman has secured admission to Muskingum University, USA, for a four-year programme in Economics and Mathematics. This milestone reflects his ambition and promising academic future.",
    initials: "SD",
  },
];
