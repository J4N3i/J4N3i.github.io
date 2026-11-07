import type { SectionNavItem } from '@/types';

export const sections: SectionNavItem[] = [
  { id: 'home', label: 'Home', href: '#home', showInNav: false, showInFooter: true },
  { id: 'about', label: 'About', href: '#about', showInNav: true, showInFooter: true },
  { id: 'projects', label: 'Projects', href: '#projects', showInNav: true, showInFooter: true },
  { id: 'skills', label: 'Skills', href: '#skills', showInNav: true, showInFooter: false },
  {
    id: 'experience',
    label: 'Experience',
    href: '#experience',
    showInNav: true,
    showInFooter: true,
  },
  {
    id: 'education',
    label: 'Education',
    href: '#education',
    showInNav: false,
    showInFooter: false,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    href: '#certifications',
    showInNav: false,
    showInFooter: false,
  },
  { id: 'contact', label: 'Contact', href: '#contact', showInNav: true, showInFooter: true },
];

export const navItems = sections.filter((s) => s.showInNav);
export const footerNavItems = sections.filter((s) => s.showInFooter);
export const allSectionIds = sections.map((s) => s.id);
