import type { ComponentType } from 'react';
import type { IconProps } from 'phosphor-react';

export type PhosphorIcon = ComponentType<IconProps>;

export interface CVOption {
  label: string;
  desc: string;
  href: string;
  color: string;
  dot: string;
}

export interface QuickStat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  tagline: string;
  university: string;
  departmentRole: string;
  email: string;
  phone: string;
  location: string;
  siteUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  bio: string;
  aboutParagraphs: string[];
  quickStats: QuickStat[];
  cvs: {
    general: CVOption;
    devops: CVOption;
    ai: CVOption;
  };
  cvOptions: CVOption[];
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  role: string;
  result: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  featured?: boolean;
  desc?: string;
  link?: string;
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  period: string;
  description: string;
  icon: PhosphorIcon;
  color: string;
  borderColor: string;
  bgGradient: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  icon: PhosphorIcon;
  color: string;
  borderColor: string;
  bgGradient: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  color: string;
  border: string;
  gradient: string;
  icon: PhosphorIcon;
}

export interface Skill {
  name: string;
  icon: PhosphorIcon;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}
