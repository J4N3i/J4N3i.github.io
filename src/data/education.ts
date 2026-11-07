import type { Education } from '@/types';
import { GraduationCap, Bank } from 'phosphor-react';

export const educationList: Education[] = [
  {
    id: 1,
    degree: 'BSc (Hons) in Computer Science',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    // TODO: Confirm your real start year for this degree (currently listed as "2024 – Present", but 4th year suggests an earlier start).
    period: '2024 – Present',
    currentYearLabel: 'Year 4',
    description:
      'Focus areas include Distributed Systems, Compiler Design, Software Engineering, and Database Management.',
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
      'Completed secondary education with a strong foundation in analytical and academic skills.',
    icon: Bank,
    color: 'text-accent-violet',
    borderColor: 'hover:border-accent-violet/30',
    bgGradient: 'from-accent-violet/10',
  },
];
