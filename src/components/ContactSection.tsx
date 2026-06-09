import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple, CheckCircle, WarningCircle, Timer } from 'phosphor-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

// ─── EmailJS config ─────────────────────────────────────────────────────────
// These are PUBLIC keys, designed for client-side use by EmailJS.
// Real protection = domain whitelist in EmailJS dashboard → Security tab.
const EJS_SERVICE  = 'service_oxud7fh';
const EJS_TEMPLATE = 'template_ivzh6re';
const EJS_KEY      = 't1UTKBJvAWvw1zyYD';

// Rate-limit: one submission per COOLDOWN_MS (30 seconds)
const COOLDOWN_MS = 30_000;
let lastSubmitTime = 0;

// ─── Component ───────────────────────────────────────────────────────────────
const ContactSection = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const formRef      = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // Honeypot — bots fill this, humans don't see it
  const [honeypot, setHoneypot]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // ── Animations ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const form    = formRef.current;
    const title   = titleRef.current;
    if (!section || !form || !title) return;

    gsap.set([title, form], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.contact-input', { opacity: 0, x: -30 });
    gsap.set('.social-icon',   { opacity: 0, scale: 0.5, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' })
      .to(form,  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1,   ease: 'power2.out' }, '-=0.7')
      .to('.contact-input', { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.5')
      .to('.social-icon',   { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.1 }, '-=0.3');

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // Countdown timer for rate-limit UI
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.ceil((lastSubmitTime + COOLDOWN_MS - Date.now()) / 1000);
      if (remaining <= 0) { setCooldownLeft(0); clearInterval(id); }
      else                { setCooldownLeft(remaining); }
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownLeft]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check — silent reject for bots
    if (honeypot) return;

    // 2. Rate-limit check
    const now = Date.now();
    const elapsed = now - lastSubmitTime;
    if (elapsed < COOLDOWN_MS) {
      const secs = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setCooldownLeft(secs);
      return;
    }

    // 3. Basic validation
    const name    = formData.name.trim();
    const email   = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setIsSubmitting(true);
    setStatus('idle');

    gsap.to('.submit-btn', { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  name,
          from_email: email,
          message:    message,
          to_name:    'Janeesha',
        },
        EJS_KEY,
      );

      lastSubmitTime = Date.now();
      setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const isOnCooldown = cooldownLeft > 0;
  const submitDisabled = isSubmitting || isOnCooldown;

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

          {/* ── Left Column ── */}
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
                  <a href="mailto:janeeshagamage02@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">
                    janeeshagamage02@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-elevated/30 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GithubLogo size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check my code</p>
                  <a href="https://github.com/J4N3i" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    github.com/J4N3i
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-elevated/30 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <LinkedinLogo size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connect professionally</p>
                  <a href="https://www.linkedin.com/in/janeesha-gamage-522717298" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    linkedin.com/in/janeesha-gamage
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Form ── */}
          <div ref={formRef} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-surface-elevated/30 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

              {/* Success / Error banners */}
              {status === 'success' && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle size={20} weight="fill" />
                  <span className="text-sm font-medium">Message sent! I'll get back to you soon 🎉</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  <WarningCircle size={20} weight="fill" />
                  <span className="text-sm font-medium">Failed to send. Please email me directly at janeeshagamage02@gmail.com</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* ── Honeypot (hidden from real users) ── */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Name */}
                <div className="contact-input space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="contact-input space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message */}
                <div className="contact-input space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={2000}
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <p className="text-xs text-white/20 text-right">{formData.message.length}/2000</p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="submit-btn w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Sending…</span>
                    </>
                  ) : isOnCooldown ? (
                    <>
                      <Timer size={20} weight="bold" />
                      <span>Wait {cooldownLeft}s before sending again</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <PaperPlaneTilt size={20} weight="bold" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;