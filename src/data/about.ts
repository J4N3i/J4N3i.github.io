import type { AboutData } from '@/types';
import { profile } from './profile';

export const aboutData: AboutData = {
  badge: 'About me',
  heading: 'I like building things that work, and keeping them working.',
  paragraphs: [
    "I'm Janeesha Gamage (also known as Janeesha Vishwaprabha), a final-year Computer Science undergraduate at SLIIT.",
    "I build web applications from the screen you see to the servers behind it. I'm especially interested in DevOps: automating how software is tested, released and kept secure. I also run my own home lab to practise it for real.",
  ],
  statusPill: 'Open to DevOps & full-stack internships',
  facts: [
    { title: 'Year 4', subtitle: 'BSc at SLIIT' },
    { title: 'Member', subtitle: 'Faculty of Computing Student Community' },
    { title: 'Member', subtitle: 'Student Interactive Society' },
  ],
  whatIDo: [
    {
      title: 'Full-stack development',
      description: 'I build complete web apps, front end to back end.',
    },
    {
      title: 'DevOps & cloud',
      description: 'I automate deployment and run systems on Azure and my own servers.',
    },
    {
      title: 'Teamwork & leadership',
      description:
        "I've led teams and student groups at SLIIT, and I'm now an active member of two student communities.",
    },
  ],
  image: {
    src: '/images/janeesha-gamage-800.webp',
    srcSet: '/images/janeesha-gamage-480.webp 480w, /images/janeesha-gamage-800.webp 800w',
    sizes: '(max-width: 640px) 320px, 360px',
    alt: `${profile.name} - Full-Stack & DevOps Engineer`,
    width: 800,
    height: 1000,
  },
};
