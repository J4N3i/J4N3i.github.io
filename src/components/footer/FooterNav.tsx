import { footerNavItems } from '@/data';
import { CvDownload } from '../CvDownload';

interface FooterNavProps {
  onNavigate: (href: string) => void;
}

export const FooterNav = ({ onNavigate }: FooterNavProps) => {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
      aria-label="Footer navigation"
    >
      {footerNavItems.map((link) => (
        <button
          key={link.label}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="text-xs font-medium text-white/70 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded py-1 px-1.5 transition-colors"
        >
          {link.label}
        </button>
      ))}
      <CvDownload variant="footer" />
    </nav>
  );
};
