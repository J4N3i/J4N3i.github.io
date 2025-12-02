import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration - Replace with your actual EmailJS credentials
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const title = titleRef.current;

    if (!section || !form || !title) return;

    // Initial states
    gsap.set([title, form], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.contact-input', { opacity: 0, x: -30 });
    gsap.set('.social-icon', { opacity: 0, scale: 0.5, y: 20 });

    // Scroll triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
      .to(form, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }, '-=0.7')
      .to('.contact-input', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
      }, '-=0.5')
      .to('.social-icon', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1
      }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      toast({
        title: "Configuration Required",
        description: "Please configure your EmailJS credentials in the ContactSection component.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Janeesha', // Your name
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubLogo,
      href: 'https://github.com/J4N3i',
      color: 'hover:text-accent-electric'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      href: 'https://www.linkedin.com/in/janeesha-gamage-522717298',
      color: 'hover:text-accent-violet'
    },
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:janeeshagamage02@gmail.com',
      color: 'hover:text-accent-cyan'
    }
  ];

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
          {/* Left Column: Info & Socials */}
          <div className="space-y-8">
            <div>
              <h2
                ref={titleRef}
                className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
              >
                Let's build something <br />
                <span className="text-glow-primary">extraordinary</span>
              </h2>
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

          {/* Right Column: Form */}
          <div ref={formRef} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-surface-elevated/30 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="contact-input space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Input */}
                <div className="contact-input space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Input */}
                <div className="contact-input space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <PaperPlaneTilt size={20} weight="bold" />
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