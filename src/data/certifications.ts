import type { Certification } from '@/types';
import { Medal } from 'phosphor-react';

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Front-End Web Development',
    issuer: 'University of Moratuwa',
    date: 'May 2025',
    credentialId: '2cfUeLWXMJ',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: 'text-accent-cyan',
    border: 'hover:border-accent-cyan/30',
    gradient: 'from-accent-cyan/5',
    icon: Medal,
  },
  {
    id: 2,
    name: 'Web Design for Beginners',
    issuer: 'University of Moratuwa',
    date: 'May 2024',
    credentialId: 'uSKz4mM5S8',
    skills: ['UI Design', 'Typography', 'Color Theory', 'Figma'],
    color: 'text-primary',
    border: 'hover:border-primary/30',
    gradient: 'from-primary/5',
    icon: Medal,
  },
];
