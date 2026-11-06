import { useState, useEffect } from 'react';
import { PaperPlaneTilt, CheckCircle, WarningCircle, Timer } from 'phosphor-react';
import { gsap } from 'gsap';
import { sendContactEmail } from '@/lib/email';
import { profile } from '@/data';

const COOLDOWN_MS = 30_000;
let lastSubmitTime = 0;

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Countdown timer for rate-limit UI
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.ceil((lastSubmitTime + COOLDOWN_MS - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownLeft(0);
        clearInterval(id);
      } else {
        setCooldownLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const now = Date.now();
    const elapsed = now - lastSubmitTime;
    if (elapsed < COOLDOWN_MS) {
      const secs = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setCooldownLeft(secs);
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setIsSubmitting(true);
    setStatus('idle');

    gsap.to('.submit-btn', {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    try {
      await sendContactEmail({ name, email, message, toName: profile.name.split(' ')[0] });
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

  const isOnCooldown = cooldownLeft > 0;
  const submitDisabled = isSubmitting || isOnCooldown;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl" />
      <div className="relative bg-surface-elevated/30 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

        {status === 'success' && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
            <CheckCircle size={20} weight="fill" />
            <span className="text-sm font-medium">Message sent! I'll get back to you soon 🎉</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <WarningCircle size={20} weight="fill" />
            <span className="text-sm font-medium">
              Failed to send. Please email me directly at {profile.email}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot */}
          <div
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="contact-input space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">
              Your Name
            </label>
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

          <div className="contact-input space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">
              Email Address
            </label>
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

          <div className="contact-input space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">
              Message
            </label>
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

          <button
            type="submit"
            disabled={submitDisabled}
            className="submit-btn w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
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
  );
};
