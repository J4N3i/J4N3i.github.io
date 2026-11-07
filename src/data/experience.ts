import type { Experience } from '@/types';
import {
  Crown,
  UsersThree,
  GraduationCap,
  House,
  Desktop,
  Person,
  Handshake,
} from 'phosphor-react';

export const leadershipExperience: Experience[] = [
  {
    id: 1,
    role: 'Team Leader',
    organization: 'AIESEC in SLIIT',
    period: '2024 – Present',
    description:
      'I manage a cross-functional team delivering organizational programs to ensure student initiatives run efficiently and on schedule.',
    icon: UsersThree,
    color: 'text-primary',
    borderColor: 'border-primary/20',
    bgGradient: 'from-primary/10',
  },
  {
    id: 2,
    role: 'Member',
    organization: 'Faculty of Computing Student Community, SLIIT',
    period: '2024 – Present',
    description:
      'I contribute to faculty-wide computing initiatives to build peer engagement and professional community across batches.',
    icon: House,
    color: 'text-accent-cyan',
    borderColor: 'border-accent-cyan/20',
    bgGradient: 'from-accent-cyan/10',
  },
  {
    id: 3,
    role: 'Member',
    organization: 'Student Interactive Society, SLIIT',
    period: '2024 – Present',
    description:
      'I actively collaborate on university-wide student events, workshops, and community engagement initiatives.',
    icon: Handshake,
    color: 'text-accent-violet',
    borderColor: 'border-accent-violet/20',
    bgGradient: 'from-accent-violet/10',
  },
  {
    id: 4,
    role: 'Batch Representative',
    organization: '2nd Batch, BSc Computer Science – SLIIT',
    period: '2023 – Present',
    description:
      'I serve as the direct liaison between my peer batch and academic staff to coordinate course schedules and resolve student concerns.',
    icon: GraduationCap,
    color: 'text-accent-electric',
    borderColor: 'border-accent-electric/20',
    bgGradient: 'from-accent-electric/10',
  },
  {
    id: 5,
    role: 'Member',
    organization: 'Microsoft Club of SLIIT',
    period: '2024 – Present',
    description:
      'I participate in technical workshops and seminars to expand hands-on expertise in cloud technologies and software development.',
    icon: Desktop,
    color: 'text-primary',
    borderColor: 'border-primary/20',
    bgGradient: 'from-primary/10',
  },
  {
    id: 6,
    role: 'Vice President',
    organization: 'Computer Science Student Community, SLIIT',
    // TODO: Set your real end date for this past role (e.g. "2024 – 2025" or "Jan 2025 – Jun 2025")
    period: '2024 – 2025',
    description:
      'Led departmental student initiatives and liaised with faculty leadership to support students’ academic and career growth.',
    icon: Crown,
    color: 'text-white/60',
    borderColor: 'border-white/10',
    bgGradient: 'from-white/5',
  },
];

export const earlierExperience: Experience[] = [
  {
    id: 6,
    role: 'Prefect',
    organization: "President's College, Embilipitiya",
    period: '2017 – 2020',
    description:
      'I coordinated school activities and student discipline to maintain a structured, collaborative school environment.',
    icon: Person,
    color: 'text-accent-cyan',
    borderColor: 'border-accent-cyan/20',
    bgGradient: 'from-accent-cyan/10',
  },
];

export const workExperience: Experience[] = [
  {
    id: 7,
    role: 'Trainee',
    organization: 'Bank of Ceylon (BOC)',
    period: '2022 – 2023',
    description:
      'I supported daily branch operations, administrative processes, and customer service to maintain high standards of confidentiality and operational rigor.',
    icon: Handshake,
    color: 'text-accent-violet',
    borderColor: 'border-accent-violet/20',
    bgGradient: 'from-accent-violet/10',
  },
];

// Compatibility aliases
export const positionsOfResponsibility = leadershipExperience;
export const otherExperiences = workExperience;
