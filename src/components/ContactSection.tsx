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
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-80 h-80 top-1/4 right-1/4 opacity-10 float-slow" />
        <div className="orb w-56 h-56 bottom-1/3 left-1/4 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold text-glow-primary mb-6"
          >
            Let's build something together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your vision. I'll help bring it to life with thoughtful design and clean code.
          </p>
        </div>

        <div ref={formRef} className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="contact-input">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-3">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="glass-input w-full px-6 py-4 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="contact-input">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="glass-input w-full px-6 py-4 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Input */}
            <div className="contact-input">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-3">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="glass-input w-full px-6 py-4 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none resize-none"
                placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center space-x-3 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed glass-card glass-hover hover:scale-105"
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
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <PaperPlaneTilt size={20} weight="bold" />
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8">
              Or connect with me on social media
            </p>
            <div className="flex justify-center items-center space-x-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon p-4 rounded-full glass-card hover:scale-110 transition-all duration-300 text-muted-foreground ${social.color} hover:glow-primary group`}
                >
                  <social.icon size={24} weight="bold" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;