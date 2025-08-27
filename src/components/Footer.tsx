import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Initial state
    gsap.set(footer, { opacity: 0, y: 60, filter: 'blur(10px)' });

    // Scroll triggered animation
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 2,
        from: 'random'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 border-t border-border/20 overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle orb w-32 h-32 top-1/4 left-1/4 opacity-5" />
        <div className="footer-particle orb w-24 h-24 top-1/2 right-1/3 opacity-10" />
        <div className="footer-particle orb w-40 h-40 bottom-1/4 right-1/4 opacity-5" />
        <div className="footer-particle orb w-28 h-28 bottom-1/3 left-1/3 opacity-8" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div 
          className="glass-card glass-hover glass-animated rounded-3xl p-10 md:p-12 border border-white/10"
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            (e.currentTarget as HTMLElement).style.setProperty('--mx', x + 'px');
            (e.currentTarget as HTMLElement).style.setProperty('--my', y + 'px');
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.setProperty('--mx', '50%');
            (e.currentTarget as HTMLElement).style.setProperty('--my', '50%');
          }}
        >
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-3xl font-bold tracking-tight text-glow-primary mb-4">
              Janeesha Gamage
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Creating extraordinary digital experiences through innovative web development 
              and cutting-edge animations.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-6">Navigation</h3>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="glass-hover block text-left text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2 rounded-xl border border-transparent hover:border-white/15"
                  onMouseMove={(e) => {
                    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', x + 'px');
                    (e.currentTarget as HTMLButtonElement).style.setProperty('--my', y + 'px');
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', '50%');
                    (e.currentTarget as HTMLButtonElement).style.setProperty('--my', '50%');
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-6">Get In Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:janeeshagamage02@gmail.com"
                className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                janeeshagamage02@gmail.com
              </a>
              <a 
                href="tel:+94779593243"
                className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                +94 77 959 3243
              </a>
              <p className="text-muted-foreground">
                Available for freelance projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 Janeesha Gamage.</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>Back to top</span>
              <div className="p-2 rounded-full bg-surface-elevated group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ArrowUp size={16} weight="bold" />
              </div>
            </button>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;