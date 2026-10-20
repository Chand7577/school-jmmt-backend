import { lazy } from "react";

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/Home"));
const SuccessStoriesPage = lazy(() => import("../pages/SuccessStoriesPage"));
const SchoolEventsPage = lazy(() => import("../pages/SchoolEventsPage"));
const EventDetailPage = lazy(() => import("../pages/EventDetailPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
// const History = lazy(() => import("../pages/about/History"));
// const PrincipalMessage = lazy(() => import("../pages/about/PrincipalMessage"));
// const Trustees = lazy(() => import("../pages/about/Trustees"));
// const NewTrustees = lazy(() => import("../pages/about/NewTrustees"));
// const PrimaryEducation = lazy(
//   () => import("../pages/our-work/PrimaryEducation"),
// );
// const SkillDevelopment = lazy(
//   () => import("../pages/our-work/SkillDevelopment"),
// );
// const ParentsCommunity = lazy(
//   () => import("../pages/our-work/ParentsCommunity"),
// );
// const Gallery = lazy(() => import("../pages/Gallery"));
// const Newsletter = lazy(() => import("../pages/Newsletter"));

export const routes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
  {
    path: "/success-stories",
    element: <SuccessStoriesPage />,
    name: "Success Stories",
  },
  {
    path: "/school-events",
    element: <SchoolEventsPage />,
    name: "School Events",
  },
  {
    path: "/school-events/:slug",
    element: <EventDetailPage />,
    name: "Event Detail",
  },
  {
    path: "/about",
    element: <AboutPage />,
    name: "About",
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    name: "Admin Portal",
  },
  {
    path: "/admin/login",
    element: <AdminDashboard />,
    name: "Admin Login",
  },
  //   {
  //     path: "/about/history",
  //     element: <History />,
  //     name: "History",
  //   },
  //   {
  //     path: "/about/principal-message",
  //     element: <PrincipalMessage />,
  //     name: "Principal’s Message",
  //   },
  //   {
  //     path: "/about/trustees",
  //     element: <Trustees />,
  //     name: "Board of Trustees",
  //   },
  //   {
  //     path: "/about/new-trustees",
  //     element: <NewTrustees />,
  //     name: "New Trustees",
  //   },
  //   {
  //     path: "/our-work/primary-education",
  //     element: <PrimaryEducation />,
  //     name: "Basic Primary Education",
  //   },
  //   {
  //     path: "/our-work/skill-development",
  //     element: <SkillDevelopment />,
  //     name: "Skill Development",
  //   },
  //   {
  //     path: "/our-work/parents-community",
  //     element: <ParentsCommunity />,
  //     name: "Parents Community",
  //   },
  //   {
  //     path: "/success-stories",
  //     element: <SuccessStories />,
  //     name: "Success Stories",
  //   },
  //   {
  //     path: "/gallery",
  //     element: <Gallery />,
  //     name: "Gallery",
  //   },
  //   {
  //     path: "/events",
  //     element: <Events />,
  //     name: "Events",
  //   },
  //   {
  //     path: "/newsletter",
  //     element: <Newsletter />,
  //     name: "Newsletter",
  //   },
];
