// TODO: Add your cloud & DevOps certifications here (e.g. Azure, Docker, Kubernetes, Linux, AWS).
// Fields for each new entry:
// - name: string (e.g. "Microsoft Certified: Azure Fundamentals (AZ-900)")
// - issuer: string (e.g. "Microsoft")
// - year: string (e.g. "2024")
// - credentialUrl?: string (e.g. "https://learn.microsoft.com/en-us/users/...")
// - credentialId?: string
// - skills: string[] (e.g. ["Azure", "Cloud Architecture", "DevOps"])
// - isDevOrDevOps: boolean (set true to display by default without clicking "Show all")

import type { Certification } from '@/types';
import { Medal } from 'phosphor-react';

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Front-End Web Development',
    issuer: 'University of Moratuwa',
    date: 'May 2025',
    year: '2025',
    credentialId: '2cfUeLWXMJ',
    credentialUrl: 'https://open.uom.lk',
    isDevOrDevOps: true,
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: 'text-accent-cyan',
    border: 'border-accent-cyan/20',
    gradient: 'from-accent-cyan/5',
    icon: Medal,
  },
  {
    id: 2,
    name: 'Web Design for Beginners',
    issuer: 'University of Moratuwa',
    date: 'May 2024',
    year: '2024',
    credentialId: 'uSKz4mM5S8',
    credentialUrl: 'https://open.uom.lk',
    isDevOrDevOps: false,
    skills: ['UI Design', 'Typography', 'Color Theory', 'Figma'],
    color: 'text-primary',
    border: 'border-primary/20',
    gradient: 'from-primary/5',
    icon: Medal,
  },
];
