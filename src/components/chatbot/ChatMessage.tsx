import { useState } from 'react';
import { Sparkle, Copy, Check, DownloadSimple, ArrowUpRight } from 'phosphor-react';
import type { ChatMessageItem } from '@/lib/chatbot';

interface ChatMessageProps {
  message: ChatMessageItem;
  onChipClick?: (chip: string) => void;
}

export const ChatMessage = ({ message, onChipClick }: ChatMessageProps) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const isUser = message.sender === 'user';

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-tr-none bg-primary text-white text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 bg-[#1e2230] border border-white/10 text-primary flex items-center justify-center mt-0.5"
        aria-hidden="true"
      >
        <Sparkle size={14} weight="fill" />
      </div>

      <div className="flex-1 space-y-2 max-w-[calc(100%-2.25rem)]">
        <div className="p-3 rounded-2xl rounded-tl-none bg-[#1a1d28] border border-white/10 text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm">
          {message.text}
        </div>

        {/* Action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {message.actions.map((action, idx) => {
              const isExternal = action.href?.startsWith('http');
              const isCopy = Boolean(action.copy);
              const actionKey = `${action.label}-${idx}`;
              const isCopied = copiedKey === actionKey;

              if (isCopy && action.copy) {
                return (
                  <button
                    key={actionKey}
                    type="button"
                    onClick={() => handleCopy(action.copy!, actionKey)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-[#222636] hover:bg-[#2c3247] text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                    <span>{isCopied ? 'Copied' : action.label}</span>
                  </button>
                );
              }

              if (action.href) {
                const ariaLabel = action.download ? `Download CV (${action.label})` : action.label;
                return (
                  <a
                    key={actionKey}
                    href={action.href}
                    download={action.download}
                    aria-label={ariaLabel}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-[#222636] hover:bg-[#2c3247] text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                  >
                    {action.download && <DownloadSimple size={14} />}
                    {isExternal && <ArrowUpRight size={14} />}
                    <span>{action.label}</span>
                  </a>
                );
              }

              return null;
            })}
          </div>
        )}

        {/* Follow-up chips */}
        {message.chips && message.chips.length > 0 && onChipClick && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onChipClick(chip)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1e2230] hover:bg-primary/20 text-muted-foreground hover:text-white border border-white/10 hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[32px]"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
