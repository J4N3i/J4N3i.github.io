import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { ChatCircleDots, X } from 'phosphor-react';

const ChatPanel = lazy(() => import('./chatbot/ChatPanel'));

export interface ChatBotProps {
  ready?: boolean;
}

const ChatBot = ({ ready = true }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isContactInputFocused, setIsContactInputFocused] = useState(false);
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

  // Hide launcher on mobile when contact form inputs are focused or keyboard is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('#contact')) {
        setIsContactInputFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('#contact')) {
        setIsContactInputFocused(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const vv = window.visualViewport;
    const handleResize = () => {
      const isKeyboard = window.innerHeight - vv.height > 150;
      const activeEl = document.activeElement;
      if (isKeyboard && activeEl && activeEl.closest('#contact')) {
        setIsContactInputFocused(true);
      }
    };

    vv.addEventListener('resize', handleResize);
    return () => vv.removeEventListener('resize', handleResize);
  }, []);

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
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none transition-all duration-300 ${
        isContactInputFocused
          ? 'max-md:opacity-0 max-md:pointer-events-none max-md:translate-y-4'
          : ''
      }`}
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
