import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { ChatCircleDots, X } from 'phosphor-react';

const ChatPanel = lazy(() => import('./chatbot/ChatPanel'));

export interface ChatBotProps {
  ready?: boolean;
}

const ChatBot = ({ ready = true }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // Return focus to launcher button when dialog is closed
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      launcherButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Lock body scroll on mobile while chat dialog is open
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const toggleChat = () => {
    setHasBeenOpened(true);
    setIsOpen((prev) => !prev);
  };

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handlePrefetch = () => {
    // Speculatively load chunk on hover or focus
    import('./chatbot/ChatPanel');
  };

  if (!ready) {
    return null;
  }

  return (
    <aside
      aria-label="Assistant"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none"
    >
      <div className="pointer-events-auto flex flex-col items-end">
        {/* Lazy loaded Chat Window Dialog */}
        {hasBeenOpened && (
          <Suspense fallback={null}>
            <ChatPanel isOpen={isOpen} onClose={handleClose} />
          </Suspense>
        )}

        {/* Solid Compact Launcher Button (48px) */}
        <button
          ref={launcherButtonRef}
          type="button"
          onClick={toggleChat}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
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
