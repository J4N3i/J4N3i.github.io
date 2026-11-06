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

export const positionsOfResponsibility: Experience[] = [
  {
    id: 1,
    role: 'Vice President',
    organization: 'Computer Science Student Community, SLIIT',
    period: '2025 – Present',
    description:
      'Provide strategic oversight for academic, professional, and student-led initiatives within the department. Liaise with faculty representatives and student leadership to support departmental objectives.',
    icon: Crown,
    color: 'text-primary',
    borderColor: 'hover:border-primary/30',
    bgGradient: 'from-primary/10',
  },
  {
    id: 2,
    role: 'Value Delivery Team Leader',
    organization: 'AIESEC in SLIIT',
    period: '2024 – Present',
    description:
      'Lead a functional team responsible for the effective delivery of organisational programmes. Facilitate cross-functional collaboration to ensure timely execution of initiatives.',
    icon: UsersThree,
    color: 'text-accent-cyan',
    borderColor: 'hover:border-accent-cyan/30',
    bgGradient: 'from-accent-cyan/10',
  },
  {
    id: 3,
    role: 'Batch Representative',
    organization: '2nd Batch, BSc Computer Science – SLIIT',
    period: '2023 – Present',
    description:
      'Serve as the primary point of contact between students and academic staff. Support coordination of academic schedules, events, and student communications.',
    icon: GraduationCap,
    color: 'text-accent-violet',
    borderColor: 'hover:border-accent-violet/30',
    bgGradient: 'from-accent-violet/10',
  },
  {
    id: 4,
    role: 'Committee Member',
    organization: 'Faculty of Computing Student Community (FCSC), SLIIT',
    period: '2026 – Present',
    description:
      'Contribute to faculty-level student initiatives and community engagement activities.',
    icon: House,
    color: 'text-accent-electric',
    borderColor: 'hover:border-accent-electric/30',
    bgGradient: 'from-accent-electric/10',
  },
  {
    id: 5,
    role: 'Member',
    organization: 'Microsoft Club of SLIIT',
    period: '2024 – Present',
    description:
      'Engage in technology-focused workshops, seminars, and community initiatives hosted by the Microsoft Student Club.',
    icon: Desktop,
    color: 'text-primary',
    borderColor: 'hover:border-primary/30',
    bgGradient: 'from-primary/10',
  },
  {
    id: 6,
    role: 'Prefect',
    organization: "President's College, Embilipitiya",
    period: '2017 – 2020',
    description:
      'Contributed to student leadership, discipline enforcement, and coordination of school activities.',
    icon: Person,
    color: 'text-accent-cyan',
    borderColor: 'hover:border-accent-cyan/30',
    bgGradient: 'from-accent-cyan/10',
  },
];

export const otherExperiences: Experience[] = [
  {
    id: 1,
    role: 'Trainee',
    organization: 'Bank of Ceylon (BOC)',
    period: '2022 – 2023',
    description:
      'Supported daily banking operations, customer service functions, and administrative processes. Developed professional competencies including confidentiality, organisational discipline, and time management.',
    icon: Handshake,
    color: 'text-accent-violet',
    borderColor: 'hover:border-accent-violet/30',
    bgGradient: 'from-accent-violet/10',
  },
];
