import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div className={isLoading ? 'hidden' : 'block'}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
