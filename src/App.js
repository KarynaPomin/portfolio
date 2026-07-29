import "./App.css";
import AboutPage from "./Components/AboutPage";
import PricePage from "./Components/PricePage";
import ProjectsPage from "./Components/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNavigation from "./Components/SideNavigation";
import LanguageSwitch from "./Components/LanguageSwitch";
import { translations } from "./data/translation";

const sections = ["home", "prices", "projects"];

function HomePage({ text, lang }) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.dataset.section);
        }
      },
      { threshold: [0.35, 0.6] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <SideNavigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <main>
        <AboutPage text={text} />
        <PricePage text={text} />
        <ProjectsPage text={text} lang={lang} />
      </main>
    </>
  );
}

function App() {
  const [language, setLanguage] = useState("pl");
  const text = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <BrowserRouter>
      <LanguageSwitch language={language} onChangeLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<HomePage text={text} lang={language} />} />
        <Route
          path="/projects/:slug"
          element={<ProjectPage text={text} lang={language} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
