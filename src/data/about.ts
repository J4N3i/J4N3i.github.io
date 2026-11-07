import type { AboutData } from '@/types';

export const aboutData: AboutData = {
  badge: 'About me',
  heading: 'I like building things that work, and keeping them working.',
  paragraphs: [
    "I'm a Year 3 Computer Science undergraduate at SLIIT, Vice President of the Computer Science Student Community, and a team leader at AIESEC.",
    "I build web applications from the screen you see to the servers behind it. I'm especially interested in DevOps: automating how software is tested, released and kept secure. I also run my own home lab to practise it for real.",
  ],
  statusPill: 'Open to DevOps & full-stack internships',
  facts: [
    { title: 'Year 3', subtitle: 'BSc at SLIIT' },
    { title: 'Vice President', subtitle: 'CS Student Community' },
    { title: 'Team Leader', subtitle: 'AIESEC' },
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
      title: 'Leadership',
      description: 'I lead teams and student communities, and coordinate people toward a goal.',
    },
  ],
  image: {
    src: '/lovable-uploads/30872b2d-0d86-4a0b-846f-852771a82f6e.png',
    alt: 'Janeesha Vishwaprabha - Full-Stack & DevOps Engineer',
    width: 480,
    height: 600,
  },
};
