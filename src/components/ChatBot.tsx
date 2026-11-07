import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatCircleDots, X } from 'phosphor-react';
import { ChatWindow } from './chatbot/ChatWindow';
import {
  INITIAL_MESSAGES,
  INITIAL_MESSAGE,
  generateBotReply,
  type ChatMessageItem,
} from '@/lib/chatbot';

export interface ChatBotProps {
  ready?: boolean;
}

const ChatBot = ({ ready = true }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // Return focus to launcher button when dialog is closed
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      launcherButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleClearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setIsTyping(false);
  }, []);

  const handleSendMessage = useCallback(
    (textToSend?: string) => {
      const text = (textToSend ?? inputValue).trim();
      if (!text) return;

      const userMessage: ChatMessageItem = {
        id: `u-${Date.now()}`,
        text,
        sender: 'user',
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const delay = prefersReduced ? 0 : 300;

      setTimeout(() => {
        const reply = generateBotReply(text);
        const botMessage: ChatMessageItem = {
          id: `b-${Date.now()}`,
          text: reply.text,
          sender: 'bot',
          actions: reply.actions,
          chips: reply.chips,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, delay);
    },
    [inputValue]
  );

  if (!ready) {
    return null;
  }

  return (
    <aside
      aria-label="Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pointer-events-none"
    >
      <div className="pointer-events-auto flex flex-col items-end">
        {/* Chat Window Dialog */}
        <ChatWindow
          isOpen={isOpen}
          onClose={handleClose}
          onClearChat={handleClearChat}
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
        />

        {/* Solid Compact Launcher Button (48px) */}
        <button
          ref={launcherButtonRef}
          type="button"
          onClick={toggleChat}
          aria-label={isOpen ? 'Close chat assistant' : 'Ask Thea - open chat assistant'}
          aria-expanded={isOpen}
          aria-controls="chat-window"
          className="h-12 w-12 sm:w-auto sm:px-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-black/50 flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
        >
          {isOpen ? <X size={20} weight="bold" /> : <ChatCircleDots size={22} weight="fill" />}
          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            {isOpen ? 'Close' : 'Ask Thea'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default ChatBot;
