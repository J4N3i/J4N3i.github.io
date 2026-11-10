import type { Profile, CVItem, CVOption } from '@/types';

export const SITE_URL = 'https://www.janeeshagamage.com';

// TODO: Delete legacy CV copies (Janeesha_Vishwaprabha_CV*.pdf) after inbound links and caches expire
export const cvs: CVItem[] = [
  {
    id: 'devops',
    label: 'DevOps / Cloud',
    desc: 'Infrastructure, CI/CD and cloud',
    href: '/Janeesha_Gamage_CV_DevOps.pdf',
    filename: 'Janeesha_Gamage_CV_DevOps.pdf',
  },
  {
    id: 'general',
    label: 'General',
    desc: 'Full-stack and software engineering',
    href: '/Janeesha_Gamage_CV.pdf',
    filename: 'Janeesha_Gamage_CV.pdf',
  },
  {
    id: 'ai',
    label: 'AI / ML',
    desc: 'Machine learning and data science',
    href: '/Janeesha_Gamage_CV_AI.pdf',
    filename: 'Janeesha_Gamage_CV_AI.pdf',
  },
];

export const cvDevops: CVOption = {
  label: 'DevOps / Cloud CV',
  desc: 'Infrastructure, CI/CD & cloud',
  href: '/Janeesha_Gamage_CV_DevOps.pdf',
  color: 'text-accent-cyan',
  dot: 'bg-accent-cyan',
};

export const cvGeneral: CVOption = {
  label: 'General CV',
  desc: 'Full-stack & software engineering',
  href: '/Janeesha_Gamage_CV.pdf',
  color: 'text-primary',
  dot: 'bg-primary',
};

export const cvAi: CVOption = {
  label: 'AI / ML CV',
  desc: 'Machine learning & data science',
  href: '/Janeesha_Gamage_CV_AI.pdf',
  color: 'text-accent-violet',
  dot: 'bg-accent-violet',
};

export const cvOptions: CVOption[] = [cvDevops, cvGeneral, cvAi];

export const profile: Profile = {
  name: 'Janeesha Gamage',
  // TODO: add my full name variant here if I use one (e.g. with a middle name)
  alternateNames: ['Janeesha Vishwaprabha'],
  initials: 'JG',
  shortName: 'JG',
  role: 'Full-Stack & DevOps Engineer',
  headline: 'I build and ship reliable web systems, from code to cloud.',
  tagline:
    'Final-year Computer Science undergraduate at SLIIT. Full-Stack Developer & DevOps Enthusiast.',
  studyYear: '4th-year (final-year) Computer Science undergraduate at SLIIT',
  currentRoles: [
    'Member, Faculty of Computing Student Community, SLIIT',
    'Member, Student Interactive Society, SLIIT',
  ],
  pastRoles: [
    'Vice President, Computer Science Student Community',
    'Team Leader, AIESEC in SLIIT',
    'Batch Representative',
    'Member, Microsoft Club of SLIIT',
  ],
  departmentRole: 'Member, Faculty of Computing Student Community, SLIIT',
  university: 'Sri Lanka Institute of Information Technology (SLIIT)',
  email: 'janeeshagamage02@gmail.com',
  phone: '+94 77 959 3243',
  location: 'Sri Lanka',
  siteUrl: SITE_URL,
  githubUrl: 'https://github.com/J4N3i',
  linkedinUrl: 'https://www.linkedin.com/in/janeesha-gamage-522717298',
  bio: "I'm Janeesha Gamage (also known as Janeesha Vishwaprabha), a final-year Computer Science undergraduate at SLIIT. I build systems across the full stack — from immersive React frontends to distributed backends, private cloud infrastructure running Proxmox and Docker, and CI/CD pipelines on Azure. I'm passionate about clean architecture, DevOps, and zero-trust security.",
  aboutParagraphs: [
    "I'm Janeesha Gamage (also known as Janeesha Vishwaprabha), a final-year Computer Science undergraduate at SLIIT.",
    "I design and build systems across the full stack — from immersive React frontends with GSAP to distributed backends, cloud infrastructure on Microsoft Azure, and private self-hosted labs running Proxmox, Docker, and TrueNAS. I'm passionate about clean architecture, DevOps, and zero-trust security.",
  ],
  quickStats: [
    { value: '3+', label: 'Years of Coding' },
    { value: '4', label: 'Featured Projects' },
    { value: '2', label: 'Student Communities' },
  ],
  cvs: Object.assign([...cvs], {
    devops: cvs[0],
    general: cvs[1],
    ai: cvs[2],
  }),
  cvOptions,
};
