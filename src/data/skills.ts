import type { Skill } from '@/types';
import {
  Globe,
  Palette,
  Rocket,
  Database,
  Sparkle,
  Coffee,
  Users,
  ChatCircle,
  Lightbulb,
  Handshake,
  Brain,
  Lightning,
  ShareNetwork,
  Monitor,
  Gear,
} from 'phosphor-react';

export const technicalSkills: Skill[] = [
  { name: 'React / TypeScript', icon: Globe, color: 'text-accent-violet' },
  { name: 'Java / Spring Boot', icon: Coffee, color: 'text-primary' },
  { name: 'C# / ASP.NET Core', icon: Monitor, color: 'text-accent-electric' },
  { name: 'Python / FastAPI', icon: Lightning, color: 'text-accent-cyan' },
  { name: 'C / C++', icon: Gear, color: 'text-accent-electric' },
  { name: 'Docker / DevOps', icon: Database, color: 'text-accent-violet' },
  { name: 'Azure / Cloud', icon: Globe, color: 'text-primary' },
  { name: 'Distributed Systems', icon: ShareNetwork, color: 'text-accent-cyan' },
  { name: 'GSAP / Animation', icon: Sparkle, color: 'text-primary' },
  { name: 'Clean Architecture', icon: Rocket, color: 'text-accent-electric' },
  { name: 'OOP / Design Patterns', icon: Brain, color: 'text-accent-violet' },
  { name: 'Zero-Trust / Security', icon: Palette, color: 'text-accent-cyan' },
];

export const softSkills: Skill[] = [
  { name: 'Leadership & Coordination', icon: Users, color: 'text-accent-electric' },
  { name: 'Written Communication', icon: ChatCircle, color: 'text-accent-violet' },
  { name: 'Analytical Thinking', icon: Lightbulb, color: 'text-primary' },
  { name: 'Time Management', icon: Handshake, color: 'text-accent-cyan' },
];
