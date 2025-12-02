import { useState, useRef, useEffect } from 'react';
import { ChatCircleDots, PaperPlaneTilt, X, Robot, User, Sparkle } from 'phosphor-react';
import { gsap } from 'gsap';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// Knowledge Base
const PORTFOLIO_DATA = {
    name: "Janeesha Gamage",
    role: "Undergraduate Computer Science Student",
    university: "SLIIT (Sri Lanka Institute of Information Technology)",
    skills: {
        frontend: ["React", "TypeScript", "Tailwind CSS", "GSAP", "HTML5", "CSS3"],
        backend: ["Node.js", "Java", "C++", "Python"],
        tools: ["Git", "VS Code", "Figma"]
    },
    projects: [
        { name: "DineEase Backend", desc: "A robust backend system for a restaurant management platform using Node.js and MongoDB." },
        { name: "Payment System Zookeeper", desc: "A distributed payment processing system utilizing Apache Zookeeper for fault tolerance." },
        { name: "Portfolio Website", desc: "My personal portfolio featuring a futuristic design, 3D elements, and this AI assistant." },
        { name: "PPcom", desc: "A C++ based communication or processing tool." },
        { name: "Worksheet-07", desc: "Academic coursework demonstrating core Java programming concepts." },
        { name: "Git Evaluate Base", desc: "A template project for evaluating Git workflow proficiency." },
        { name: "GitHub Profile", desc: "My GitHub profile configuration with stats and bio." }
    ],
    contact: {
        email: "janeeshagamage02@gmail.com",
        phone: "+94 77 959 3243",
        linkedin: "https://www.linkedin.com/in/janeesha-gamage-522717298",
        github: "https://github.com/J4N3i"
    },
    bio: "I'm a passionate web developer and undergraduate at SLIIT. I love creating immersive digital experiences that combine beautiful design with powerful functionality. I'm currently serving as the Vice President of the CS Student Committee."
};

// Intent System
type Intent = 'greeting' | 'skills' | 'projects' | 'contact' | 'about' | 'resume' | 'unknown';

const INTENT_KEYWORDS: Record<Intent, string[]> = {
    greeting: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
    skills: ['skill', 'stack', 'tech', 'technology', 'language', 'framework', 'react', 'java', 'typescript'],
    projects: ['project', 'work', 'portfolio', 'build', 'created', 'app', 'website'],
    contact: ['contact', 'email', 'phone', 'reach', 'message', 'talk', 'hire'],
    about: ['who', 'about', 'bio', 'yourself', 'background', 'student', 'sliit', 'study'],
    resume: ['resume', 'cv', 'download', 'pdf'],
    unknown: []
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Janeesha's AI assistant. Ask me anything about his skills, projects, or background!",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && chatWindowRef.current) {
            gsap.fromTo(chatWindowRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI processing delay based on complexity
        const delay = Math.random() * 1000 + 1000;

        setTimeout(() => {
            const botResponse = processInput(newUserMessage.text);
            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, delay);
    };

    const determineIntent = (input: string): Intent => {
        const lowerInput = input.toLowerCase();
        let bestIntent: Intent = 'unknown';
        let maxScore = 0;

        Object.entries(INTENT_KEYWORDS).forEach(([intent, keywords]) => {
            let score = 0;
            keywords.forEach(keyword => {
                if (lowerInput.includes(keyword)) score += 1;
            });
            if (score > maxScore) {
                maxScore = score;
                bestIntent = intent as Intent;
            }
        });

        return maxScore > 0 ? bestIntent : 'unknown';
    };

    const processInput = (input: string): string => {
        const intent = determineIntent(input);

        switch (intent) {
            case 'greeting':
                const greetings = [
                    "Hello! How can I help you today?",
                    "Hi there! Interested in Janeesha's work?",
                    "Greetings! Feel free to ask me anything."
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];

            case 'skills':
                return `Janeesha is a versatile developer. \n\nFrontend: ${PORTFOLIO_DATA.skills.frontend.join(', ')}. \nBackend: ${PORTFOLIO_DATA.skills.backend.join(', ')}.`;

            case 'projects':
                return `He has worked on some cool stuff! For example: \n1. ${PORTFOLIO_DATA.projects[0].name} - ${PORTFOLIO_DATA.projects[0].desc} \n2. ${PORTFOLIO_DATA.projects[1].name} - ${PORTFOLIO_DATA.projects[1].desc}`;

            case 'contact':
                return `You can reach him at ${PORTFOLIO_DATA.contact.email} or call ${PORTFOLIO_DATA.contact.phone}. He's also on LinkedIn!`;

            case 'about':
                return PORTFOLIO_DATA.bio;

            case 'resume':
                return "I can't send files directly yet, but you can request his CV via the contact form below!";

            default:
                return "I'm not quite sure about that. Try asking about 'skills', 'projects', or 'contact info'!";
        }
    };

    const suggestions = [
        "What are your skills?",
        "Tell me about your projects",
        "How can I contact you?",
    ];

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
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
                                <h3 className="font-semibold text-foreground text-sm">AI Assistant</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-surface-elevated' : 'bg-gradient-primary'
                                    }`}>
                                    {msg.sender === 'user' ? (
                                        <User size={16} className="text-muted-foreground" />
                                    ) : (
                                        <Robot size={16} className="text-white" weight="fill" />
                                    )}
                                </div>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                    ? 'bg-primary/20 text-foreground rounded-tr-none'
                                    : 'bg-surface-elevated text-muted-foreground rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-primary flex-shrink-0 flex items-center justify-center">
                                    <Robot size={16} className="text-white" weight="fill" />
                                </div>
                                <div className="bg-surface-elevated p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setInputValue(suggestion);
                                        handleSendMessage();
                                    }}
                                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-elevated hover:bg-primary/20 border border-white/5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full bg-surface-elevated/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                            >
                                <PaperPlaneTilt size={16} weight="fill" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className="group relative w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110"
            >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
                {isOpen ? (
                    <X size={28} className="text-white relative z-10" weight="bold" />
                ) : (
                    <ChatCircleDots size={28} className="text-white relative z-10" weight="fill" />
                )}
            </button>
        </div>
    );
};

export default ChatBot;
