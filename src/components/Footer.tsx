import { useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUp, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';
import { profile } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { FooterNav } from './footer/FooterNav';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useSectionReveal(footerRef, () => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/10 bg-transparent pt-8 sm:pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-10 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10 space-y-8">
        {/* Row 1: Brand Info, Nav Links, Social Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Left: Name & Role/Location */}
          <div className="space-y-1">
            <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              {profile.name}
            </div>
            <p className="text-xs text-white/60">
              {profile.role} · {profile.location}
            </p>
          </div>

          {/* Centre: Nav links */}
          <FooterNav onNavigate={scrollToSection} />

          {/* Right: Social & Email icon buttons (44px min touch target) */}
          <div className="flex items-center gap-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            >
              <GithubLogo size={20} weight="fill" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            >
              <LinkedinLogo size={20} weight="fill" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            >
              <EnvelopeSimple size={20} weight="fill" />
            </a>
          </div>
        </div>

        {/* Row 2: Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
          >
            <span>Back to top</span>
            <ArrowUp size={14} weight="bold" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
