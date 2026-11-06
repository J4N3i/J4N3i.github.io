import { forwardRef } from 'react';
import type { PhosphorIcon } from '@/types';

export interface SectionHeaderProps {
  badgeIcon: PhosphorIcon;
  badgeText: string;
  badgeVariant?: 'default' | 'primary';
  titleNormal: React.ReactNode;
  titleAccent: React.ReactNode;
  accentColorClass?: string;
  subtitle?: React.ReactNode;
  dividerGradient?: string;
  hasDivider?: boolean;
  align?: 'center' | 'left';
  className?: string;
  headingClassName?: string;
  dividerClassName?: string;
}

export const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
  (
    {
      badgeIcon: BadgeIcon,
      badgeText,
      badgeVariant = 'default',
      titleNormal,
      titleAccent,
      accentColorClass = 'text-primary',
      subtitle,
      dividerGradient = 'from-primary to-accent-violet',
      hasDivider = true,
      align = 'center',
      className = '',
      headingClassName = '',
      dividerClassName = '',
    },
    ref
  ) => {
    const isCenter = align === 'center';

    const badgeStyle =
      badgeVariant === 'primary'
        ? 'bg-primary/10 border border-primary/20 text-primary'
        : 'bg-white/5 border border-white/10 text-white/60';

    const defaultHeadingStyle =
      'text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70';

    return (
      <div className={`${isCenter ? 'text-center mb-12 md:mb-16' : ''} ${className}`}>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4 ${badgeStyle}`}
        >
          <BadgeIcon size={14} weight="bold" />
          {badgeText}
        </div>

        <h2 ref={ref} className={headingClassName || defaultHeadingStyle}>
          {titleNormal} <span className={accentColorClass}>{titleAccent}</span>
        </h2>

        {hasDivider && (
          <div
            className={`h-1 w-24 bg-gradient-to-r ${dividerGradient} rounded-full opacity-50 ${
              isCenter ? 'mx-auto' : ''
            } ${subtitle ? 'mb-6' : ''} ${dividerClassName}`}
          />
        )}

        {subtitle && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
