import { CheckCircle, WarningCircle } from 'phosphor-react';
import { profile } from '@/data';

interface FormStatusBannerProps {
  status: 'idle' | 'success' | 'error';
}

export const FormStatusBanner = ({ status }: FormStatusBannerProps) => {
  if (status === 'idle') return null;

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mb-3 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
      >
        <CheckCircle size={20} weight="fill" />
        <span className="text-sm font-medium">Message sent! I'll get back to you soon.</span>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="mb-3 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
    >
      <WarningCircle size={20} weight="fill" />
      <span className="text-sm font-medium">
        Failed to send. Please email me directly at {profile.email}
      </span>
    </div>
  );
};
