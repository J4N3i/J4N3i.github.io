import { User, Robot } from 'phosphor-react';
import type { ChatMessageItem } from '@/lib/chatbot';

interface ChatMessageProps {
  message: ChatMessageItem;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser ? 'bg-surface-elevated' : 'bg-gradient-primary'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-muted-foreground" />
        ) : (
          <Robot size={16} className="text-white" weight="fill" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primary/20 text-foreground rounded-tr-none'
            : 'bg-surface-elevated text-muted-foreground rounded-tl-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};
