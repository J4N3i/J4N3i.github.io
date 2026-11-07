import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    category: 'Backend',
    skills: ['Java / Spring Boot', 'C# / ASP.NET Core', 'Python / FastAPI', 'C / C++'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['Docker', 'Microsoft Azure', 'Proxmox', 'TrueNAS'],
  },
  {
    category: 'Practices',
    skills: [
      'Clean Architecture',
      'OOP & Design Patterns',
      'Distributed Systems',
      'Zero-Trust Security',
    ],
  },
];
