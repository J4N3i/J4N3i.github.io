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
    <div className="space-y-4 pt-2">
      {/* 1. LinkedIn (Primary, filled button style) */}
      <a
        href={profile.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary shadow-lg shadow-primary/20"
      >
        <LinkedinLogo size={20} weight="fill" />
        <span>Connect on LinkedIn</span>
        <ArrowSquareOut size={16} weight="bold" />
      </a>

      {/* 2. Email (Address + Copy button with 2s feedback + aria-live) */}
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-white/5 text-primary flex-shrink-0">
            <EnvelopeSimple size={18} weight="duotone" />
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors truncate focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            {profile.email}
          </a>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/80 hover:text-white border border-white/10 transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
        >
          {copiedEmail ? (
            <Check size={14} weight="bold" className="text-emerald-400" />
          ) : (
            <Copy size={14} weight="bold" />
          )}
          <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copiedEmail ? 'Email address copied to clipboard' : ''}
      </span>

      {/* 3. Download CV */}
      <CvDownload variant="contact" />

      {/* GitHub smaller secondary link below */}
      <div className="pt-1">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded py-1"
        >
          <GithubLogo size={16} weight="fill" />
          <span>
            Or explore my repositories on GitHub (
            {profile.githubUrl.replace('https://github.com/', '@')})
          </span>
        </a>
      </div>

      {/* Availability Status */}
      <div className="pt-3">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-white/80 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Open to internships and graduate roles</span>
        </div>
        {/* TODO: Optionally add typical response time here (e.g. "Usually responds within 24 hours") */}
      </div>
    </div>
  );
};
