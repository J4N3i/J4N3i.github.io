import { forwardRef } from 'react';
import type { FormEvent } from 'react';
import { PaperPlaneTilt } from 'phosphor-react';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e?: FormEvent) => void;
  disabled?: boolean;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ value, onChange, onSubmit, disabled }, ref) => {
    return (
      <form onSubmit={onSubmit} className="p-3 border-t border-white/10 bg-[#12141c]">
        <label htmlFor="chat-message-input" className="sr-only">
          Message Thea
        </label>
        <div className="relative flex items-center">
          <input
            id="chat-message-input"
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask Thea a question..."
            disabled={disabled}
            className="w-full bg-[#1a1d28] border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            aria-label="Send message"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PaperPlaneTilt size={16} weight="fill" />
          </button>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';
