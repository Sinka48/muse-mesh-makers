import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import WritingSection from "@/components/WritingSection";
import MusicSection from "@/components/MusicSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="grain">
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <ProjectsSection />
      <ExperimentsSection />
      <WritingSection />
      <MusicSection />
      <ContactSection />
    </div>
  );
};

export default Index;
