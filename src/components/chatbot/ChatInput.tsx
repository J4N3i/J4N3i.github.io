import type { FormEvent } from 'react';
import { PaperPlaneTilt } from 'phosphor-react';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e?: FormEvent) => void;
  disabled?: boolean;
}

export const ChatInput = ({ value, onChange, onSubmit, disabled }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-white/10 bg-white/5">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full bg-surface-elevated/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          aria-label="Send chat message"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          <PaperPlaneTilt size={16} weight="fill" />
        </button>
      </div>
    </form>
  );
};
