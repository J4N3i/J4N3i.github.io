import type { NavItem } from '@/types';

interface FooterNavProps {
  navItems: NavItem[];
  onNavigate: (href: string) => void;
}

export const FooterNav = ({ navItems, onNavigate }: FooterNavProps) => {
  return (
    <div className="md:col-span-3 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) =>
          item.download ? (
            <a
              key={item.label}
              href={item.href}
              download
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
            >
              {item.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          ) : (
            <button
              key={item.label}
              onClick={() => onNavigate(item.href)}
              className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </div>
  );
};
