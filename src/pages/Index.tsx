import { useState, useEffect, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const hasSeenIntro = (): boolean => {
  try {
    return sessionStorage.getItem('intro-seen') === '1';
  } catch {
    return false;
  }
};

const markIntroSeen = (): void => {
  try {
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    // Storage access blocked or unavailable
  }
};

const shouldSkipIntro = (): boolean => {
  if (typeof window === 'undefined') return true;

  // 1. Already seen in this session
  if (hasSeenIntro()) return true;

  // 2. Accessibility preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  // 3. Direct deep link with anchor hash
  if (window.location.hash) return true;

  // 4. Navigated via reload or back/forward
  try {
    const navEntries = performance.getEntriesByType('navigation');
    const navEntry = navEntries[0] as PerformanceNavigationTiming | undefined;
    if (navEntry && navEntry.type !== 'navigate') {
      return true;
    }
  } catch {
    // Fallback if performance entry is unavailable
  }

  return false;
};

const Index = () => {
  // Preloader renders only on the client after hydration so prerendered HTML has no overlay
  const [showPreloader, setShowPreloader] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [hasIntroDelay, setHasIntroDelay] = useState(false);

  useEffect(() => {
    if (shouldSkipIntro()) {
      markIntroSeen();
      setShowPreloader(false);
      setHasIntroDelay(false);
      setIsHeroReady(true);
      return;
    }

    setHasIntroDelay(true);
    setShowPreloader(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    markIntroSeen();
    setShowPreloader(false);
    setIsHeroReady(true);
  }, []);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Preloader - client-only, skipped in SSR and reduced-motion */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div>
        <Navigation />
        <main>
          <HeroSection ready={isHeroReady} startDelay={hasIntroDelay ? 0.1 : 0} />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
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
