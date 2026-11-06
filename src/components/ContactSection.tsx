import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';
import { profile } from '@/data';
import { ContactForm } from './contact/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const title = titleRef.current;
    if (!section || !form || !title) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set([title, form], { opacity: 0, y: 50, filter: 'blur(10px)' });
      gsap.set('.contact-input', { opacity: 0, x: -30 });
      gsap.set('.social-icon', { opacity: 0, scale: 0.5, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' })
        .to(form, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }, '-=0.7')
        .to('.contact-input', { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.5')
        .to('.social-icon', { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.1 }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-80 h-80 top-1/4 right-1/4 opacity-10 float-slow" />
        <div className="orb w-56 h-56 bottom-1/3 left-1/4 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
                <PaperPlaneTilt size={14} weight="bold" />
                Get In Touch
              </div>
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 leading-tight"
              >
                Let's Build Something <br />
                <span className="text-primary">Extraordinary</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-violet rounded-full opacity-50 mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you have a groundbreaking idea or just want to say hi, I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-elevated/30 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <EnvelopeSimple size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Me</p>
                  <a href={`mailto:${profile.email}`} className="text-foreground font-medium hover:text-primary transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-elevated/30 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GithubLogo size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check my code</p>
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    {profile.githubUrl.replace('https://', '')}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-elevated/30 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <LinkedinLogo size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connect professionally</p>
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    {profile.linkedinUrl.replace('https://www.', '').replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div ref={formRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
