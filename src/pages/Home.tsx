import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import TeachersSection from "../components/TeachersSection";
import ShubhamSpotlight from "../components/ShubhamSpotlight";
import EventsSection from "../components/EventsSection";
import SupportersSection from "../components/SupportersSection";
import CTA from "../components/CTA";
import ContactSection from "../components/ContactSection";
import ChapterIndex from "../components/ChapterIndex";

const Home = () => {
  return (
    <>
      <ChapterIndex />
      <Hero />
      <Stats />
      <Features />
      <TeachersSection />
      <ShubhamSpotlight />
      <EventsSection />
      <SupportersSection />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;
