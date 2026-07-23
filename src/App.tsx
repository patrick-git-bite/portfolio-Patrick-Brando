import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { navItems, experience } from "./lib/data";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Cursor from "./components/layout/Cursor";
import SpaceField from "./components/layout/SpaceField";
import Marquee from "./components/layout/Marquee";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Journey from "./components/sections/Journey";
import Process from "./components/sections/Process";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";

export default function App() {
  const { active, rootRef } = useScrollSpy(navItems.map((item) => item.id));

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="relative min-h-screen bg-ink text-paper">
      <SpaceField />
      <div className="relative z-10">
        <Cursor />
        <Toaster theme="dark" position="bottom-right" />

      <Nav activeSection={active} onNavigate={scrollToSection} />

      <main>
        <Hero onNavigate={scrollToSection} />
        <Marquee items={experience.stack.flatMap((group) => group.items)} />
        <About />
        <Education />
        <Experience />
        <Journey />
        <Projects />
        <Process />
        <Services onNavigate={scrollToSection} />
        <Resume />
        <Contact />
      </main>

      <Footer onNavigate={scrollToSection} />
      <Analytics />
      </div>
    </div>
  );
}
