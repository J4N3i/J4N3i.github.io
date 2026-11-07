import { useState, useEffect, useRef } from 'react';
import { PaperPlaneTilt, Timer } from 'phosphor-react';
import { sendContactEmail } from '@/lib/email';
import { profile } from '@/data';
import { FormStatusBanner } from './FormStatusBanner';
import { TopicChips, type TopicOption } from './TopicChips';

const COOLDOWN_MS = 30_000;
let lastSubmitTime = 0;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedTopic, setSelectedTopic] = useState<TopicOption | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const statusRef = useRef<HTMLDivElement>(null);

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleToggleTopic = (topic: TopicOption) => {
    setSelectedTopic((prev) => (prev === topic ? null : topic));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) newErrors.name = 'Please enter your name.';
    if (!email) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!message) newErrors.message = 'Please enter a message.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || honeypot) return;

    const now = Date.now();
    const elapsed = now - lastSubmitTime;
    if (elapsed < COOLDOWN_MS) {
      setCooldownLeft(Math.ceil((COOLDOWN_MS - elapsed) / 1000));
      return;
    }

    if (!validate()) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const rawMessage = formData.message.trim();
    const message = selectedTopic ? `[${selectedTopic}] ${rawMessage}` : rawMessage;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      await sendContactEmail({ name, email, message, toName: profile.name.split(' ')[0] });
      lastSubmitTime = Date.now();
      setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setSelectedTopic(null);
      setErrors({});
      setTimeout(() => {
        if (typeof statusRef.current?.scrollIntoView === 'function') {
          statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => {
        if (typeof statusRef.current?.scrollIntoView === 'function') {
          statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOnCooldown = cooldownLeft > 0;
  const submitDisabled = isSubmitting || isOnCooldown;

  return (
    <div className="relative bg-white/[0.03] border border-white/10 p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Send a Message</h3>

      <div ref={statusRef}>
        <FormStatusBanner status={status} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 ml-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            autoCapitalize="words"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder-white/40 focus:outline-none text-base transition-colors focus-visible:ring-2 ${
              errors.name
                ? 'border-rose-500/70 focus-visible:ring-rose-500'
                : 'border-white/10 focus:border-primary/50 focus-visible:ring-primary'
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-rose-400 ml-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 ml-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder-white/40 focus:outline-none text-base transition-colors focus-visible:ring-2 ${
              errors.email
                ? 'border-rose-500/70 focus-visible:ring-rose-500'
                : 'border-white/10 focus:border-primary/50 focus-visible:ring-primary'
            }`}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-rose-400 ml-1">
              {errors.email}
            </p>
          )}
        </div>

        <TopicChips selectedTopic={selectedTopic} onToggleTopic={handleToggleTopic} />

        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 ml-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            autoCapitalize="sentences"
            enterKeyHint="send"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            maxLength={2000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message && formData.message.length >= 1600
                ? 'message-error message-counter'
                : errors.message
                  ? 'message-error'
                  : formData.message.length >= 1600
                    ? 'message-counter'
                    : undefined
            }
            className={`w-full min-h-[120px] px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder-white/40 focus:outline-none text-base transition-colors resize-none focus-visible:ring-2 ${
              errors.message
                ? 'border-rose-500/70 focus-visible:ring-rose-500'
                : 'border-white/10 focus:border-primary/50 focus-visible:ring-primary'
            }`}
            placeholder="Tell me about the role or opportunity..."
          />
          <div className="flex items-center justify-between text-xs px-1 min-h-[1.25rem]">
            {errors.message ? (
              <p id="message-error" role="alert" className="text-rose-400">
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            {formData.message.length >= 1600 && (
              <p id="message-counter" className="text-xs text-white/60 ml-auto">
                {formData.message.length}/2000
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitDisabled}
          aria-busy={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              <Timer size={18} weight="bold" />
              <span>Wait {cooldownLeft}s before sending again</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <PaperPlaneTilt size={18} weight="bold" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
