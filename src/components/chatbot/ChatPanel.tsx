import { useState, useCallback } from 'react';
import { ChatWindow } from './ChatWindow';
import {
  INITIAL_MESSAGES,
  INITIAL_MESSAGE,
  generateBotReply,
  type ChatMessageItem,
} from '@/lib/chatbot';

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPanel = ({ isOpen, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessageItem[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  return (
    <ChatWindow
      isOpen={isOpen}
      onClose={onClose}
      onClearChat={handleClearChat}
      messages={messages}
      isTyping={isTyping}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSendMessage={handleSendMessage}
    />
  );
};

export default ChatPanel;
