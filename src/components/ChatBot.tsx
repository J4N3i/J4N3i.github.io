import { useState } from 'react';
import { ChatCircleDots, X } from 'phosphor-react';
import { ChatWindow } from './chatbot/ChatWindow';
import { INITIAL_MESSAGES, generateBotResponse, type ChatMessageItem } from '@/lib/chatbot';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessageItem = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const delay = Math.random() * 800 + 600;

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: ChatMessageItem = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={() => handleSendMessage()}
        onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
      />

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 focus:outline-none"
      >
        <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-[12px] border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden group-hover:bg-white/10 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent-violet/50 to-accent-cyan/50 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent rounded-b-full opacity-30" />
        </div>

        <div className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:rotate-90">
          {isOpen ? <X size={32} weight="bold" /> : <ChatCircleDots size={32} weight="fill" />}
        </div>

        {!isOpen && (
          <div className="absolute -inset-4 rounded-full bg-primary/20 animate-pulse blur-xl -z-10 opacity-50" />
        )}
      </button>
    </div>
  );
};

export default ChatBot;
