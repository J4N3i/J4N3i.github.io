import { useState } from 'react';
import {
  LinkedinLogo,
  EnvelopeSimple,
  GithubLogo,
  Copy,
  Check,
  ArrowSquareOut,
} from 'phosphor-react';
import { profile } from '@/data';
import { CvDownload } from '../CvDownload';

export const ContactDirectActions = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="space-y-3 pt-2 min-w-0">
      {/* 1. LinkedIn (Primary, filled button style - 48px height) */}
      <a
        href={profile.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-primary shadow-lg shadow-primary/20 min-w-0"
      >
        <LinkedinLogo size={20} weight="fill" className="flex-shrink-0" />
        <span className="break-words min-w-0">Connect on LinkedIn</span>
        <ArrowSquareOut size={16} weight="bold" className="flex-shrink-0" />
      </a>

      {/* 2. Email (Address + Copy button at least 44x44px - 48px row height) */}
      <div className="min-h-[48px] flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-[#12141c] md:bg-white/[0.03] border border-white/10 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 rounded-lg bg-white/5 text-primary flex-shrink-0">
            <EnvelopeSimple size={18} weight="duotone" className="flex-shrink-0" />
          </div>
          <div className="min-w-0 flex-1">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-medium text-foreground hover:text-primary hover:underline active:text-primary-light transition-colors break-all focus-visible:ring-2 focus-visible:ring-primary rounded block"
            >
              {profile.email}
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-[0.96] text-xs font-medium text-white/80 hover:text-white border border-white/10 transition-all flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
        >
          {copiedEmail ? (
            <Check size={16} weight="bold" className="text-emerald-400 flex-shrink-0" />
          ) : (
            <Copy size={16} weight="bold" className="flex-shrink-0" />
          )}
          <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copiedEmail ? 'Email address copied to clipboard' : ''}
      </span>

      {/* 3. Download CV (48px action row) */}
      <CvDownload variant="contact" />

      {/* 4. GitHub secondary action row (48px height) */}
      <div className="min-w-0">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] w-full inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#12141c] md:bg-white/[0.03] border border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all text-xs font-medium text-white/80 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-primary min-w-0 break-words"
        >
          <GithubLogo size={18} weight="fill" className="flex-shrink-0 text-white/70" />
          <span className="min-w-0 break-words">
            Or explore my repositories on GitHub (
            {profile.githubUrl.replace('https://github.com/', '@')})
          </span>
        </a>
      </div>

      {/* Availability Status */}
      <div className="pt-2 min-w-0">
        <div className="min-h-[38px] inline-flex items-center gap-2 text-xs font-medium text-white/80 bg-[#12141c] md:bg-white/[0.03] border border-white/10 px-3.5 py-2 rounded-full max-w-full">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="truncate sm:whitespace-normal">
            Open to internships and graduate roles
          </span>
        </div>
      </div>
    </div>
  );
};
