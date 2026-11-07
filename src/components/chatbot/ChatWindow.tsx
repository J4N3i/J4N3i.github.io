import { useRef, useEffect } from 'react';
import { X, Trash, Sparkle } from 'phosphor-react';
import { gsap } from 'gsap';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessageItem } from '@/lib/chatbot';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onClearChat: () => void;
  messages: ChatMessageItem[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (text?: string) => void;
}

export const ChatWindow = ({
  isOpen,
  onClose,
  onClearChat,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSendMessage,
}: ChatWindowProps) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages or typing state change
  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      messagesEndRef.current.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Entrance animation and input focus
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        gsap.fromTo(
          chatWindowRef.current,
          { opacity: 0, y: 16, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
        );
      }

      // Move focus to input
      const timer = setTimeout(
        () => {
          inputRef.current?.focus();
        },
        prefersReduced ? 0 : 60
      );

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key to close dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={chatWindowRef}
      id="chat-window"
      role="dialog"
      aria-label="Chat with Thea"
      aria-modal="false"
      className="mb-3 w-[calc(100vw-2rem)] max-w-sm h-[min(560px,80dvh)] bg-[#12141c] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/80"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-[#151824] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full bg-[#1e2230] border border-white/10 text-primary flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <Sparkle size={16} weight="fill" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-tight">Thea</h3>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Quick answers about Janeesha
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onClearChat}
            aria-label="Clear chat"
            title="Clear chat"
            className="w-11 h-11 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-w-[44px] min-h-[44px]"
          >
            <Trash size={18} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat window"
            className="w-11 h-11 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-w-[44px] min-h-[44px]"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Log */}
      <div
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onChipClick={(chip) => onSendMessage(chip)} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs py-1">
            <div
              className="w-7 h-7 rounded-full bg-[#1e2230] border border-white/10 flex items-center justify-center text-primary flex-shrink-0"
              aria-hidden="true"
            >
              <Sparkle size={14} weight="fill" />
            </div>
            <div
              className="bg-[#1a1d28] border border-white/10 px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm"
              aria-label="Thea is typing"
            >
              <span
                className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <ChatInput
        ref={inputRef}
        value={inputValue}
        onChange={onInputChange}
        onSubmit={(e) => {
          e?.preventDefault();
          onSendMessage();
        }}
        disabled={isTyping}
      />
    </div>
  );
};
