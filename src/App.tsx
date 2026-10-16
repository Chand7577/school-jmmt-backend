import { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { routes } from "./routes";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* React Bits Pro Preloader */}
      {loading && (
        <Preloader
          variant="stairs"
          duration={1500}
          stairCount={8}
          stairsRevealDirection="up"
          stairsRevealFrom="left"
          loadingText="John Martyn Memorial School"
          subtitle="Salangaon, Dehradun • Est. 1985"
          onComplete={() => {
            setLoading(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 80);
          }}
        />
      )}

      <div className="min-h-screen bg-[#FDFBF7] flex flex-col w-full max-w-full overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-[#1E2A44] text-lg font-medium">
                  Loading...
                </div>
              </div>
            }
          >
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
