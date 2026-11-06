import type { Profile, CVOption } from '@/types';

export const cvGeneral: CVOption = {
  label: 'General CV',
  desc: 'Full-stack & software engineering',
  href: '/Janeesha_Vishwaprabha_CV.pdf',
  color: 'text-primary',
  dot: 'bg-primary',
};

export const cvDevops: CVOption = {
  label: 'DevOps / Cloud CV',
  desc: 'Infrastructure, CI/CD & cloud',
  href: '/Janeesha_Vishwaprabha_CV_DevOps.pdf',
  color: 'text-accent-cyan',
  dot: 'bg-accent-cyan',
};

export const cvAi: CVOption = {
  label: 'AI / ML CV',
  desc: 'Machine learning & data science',
  href: '/Janeesha_Vishwaprabha_CV_AI.pdf',
  color: 'text-accent-violet',
  dot: 'bg-accent-violet',
};

export const cvOptions: CVOption[] = [cvGeneral, cvDevops, cvAi];

export const profile: Profile = {
  name: 'Janeesha Vishwaprabha',
  shortName: 'JG',
  role: 'Full-Stack Developer & DevOps Engineer',
  headline: 'Building the Digital Future',
  tagline: 'Computer Science Undergraduate. Full-Stack Developer & DevOps Enthusiast.',
  university: 'Sri Lanka Institute of Information Technology (SLIIT)',
  departmentRole: 'Vice President of the Computer Sciences Student Community',
  email: 'janeeshagamage02@gmail.com',
  phone: '+94 77 959 3243',
  location: 'Udagama, Embilipitiya, Sri Lanka',
  siteUrl: 'https://janeeshagamage.com',
  githubUrl: 'https://github.com/J4N3i',
  linkedinUrl: 'https://www.linkedin.com/in/janeesha-gamage-522717298',
  bio: "I'm a Computer Science undergraduate at SLIIT and Vice President of the Computer Sciences Student Community. I build systems across the full stack — from immersive React frontends to distributed backends, private cloud infrastructure running Proxmox and Docker, and CI/CD pipelines on Azure. I'm passionate about clean architecture, DevOps, and zero-trust security.",
  aboutParagraphs: [
    "I'm a Computer Science undergraduate at SLIIT, currently serving as Vice President of the Computer Sciences Student Community.",
    "I design and build systems across the full stack — from immersive React frontends with GSAP to distributed backends, cloud infrastructure on Microsoft Azure, and private self-hosted labs running Proxmox, Docker, and TrueNAS. I'm passionate about clean architecture, DevOps, and zero-trust security.",
  ],
  quickStats: [
    { value: '3+', label: 'Years of Coding' },
    { value: '6+', label: 'Projects' },
    { value: '5+', label: 'Leadership Roles' },
  ],
  cvs: {
    general: cvGeneral,
    devops: cvDevops,
    ai: cvAi,
  },
  cvOptions,
};
