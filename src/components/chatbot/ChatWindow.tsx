import { useRef, useEffect } from 'react';
import { X, Sparkle, Robot } from 'phosphor-react';
import { gsap } from 'gsap';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SUGGESTIONS, type ChatMessageItem } from '@/lib/chatbot';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageItem[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSendMessage,
  onSuggestionClick,
}: ChatWindowProps) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(
        chatWindowRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={chatWindowRef}
      className="mb-4 w-[90vw] md:w-96 h-[500px] max-h-[80vh] glass-card border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkle size={20} className="text-white animate-pulse" weight="fill" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Thea</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat window"
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex-shrink-0 flex items-center justify-center">
              <Robot size={16} className="text-white" weight="fill" />
            </div>
            <div className="bg-surface-elevated p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-elevated hover:bg-primary/20 border border-white/5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <ChatInput
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
