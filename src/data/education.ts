import type { Education } from '@/types';
import { GraduationCap, Bank } from 'phosphor-react';

export const educationList: Education[] = [
  {
    id: 1,
    degree: 'BSc (Hons) in Computer Science',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2024 – Present',
    description:
      'Currently following the undergraduate degree program. Focus areas include Distributed Systems, Compiler Design, Software Engineering, and Database Management.',
    icon: GraduationCap,
    color: 'text-primary',
    borderColor: 'hover:border-primary/30',
    bgGradient: 'from-primary/10',
  },
  {
    id: 2,
    degree: 'G.C.E. Advanced Level (A/L)',
    institution: "President's College, Embilipitiya",
    period: '2017 – 2020',
    description:
      'Completed secondary education with a strong foundation in analytical and academic skills, preparing for higher education in technology.',
    icon: Bank,
    color: 'text-accent-violet',
    borderColor: 'hover:border-accent-violet/30',
    bgGradient: 'from-accent-violet/10',
  },
];
