import { profile, projects } from '@/data';

export type Intent = 'greeting' | 'skills' | 'projects' | 'contact' | 'about' | 'resume' | 'unknown';

export interface ChatMessageItem {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const INTENT_KEYWORDS: Record<Intent, string[]> = {
  greeting: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
  skills: ['skill', 'stack', 'tech', 'technology', 'language', 'framework', 'react', 'java', 'typescript'],
  projects: ['project', 'work', 'portfolio', 'build', 'created', 'app', 'website'],
  contact: ['contact', 'email', 'phone', 'reach', 'message', 'talk', 'hire'],
  about: ['who', 'about', 'bio', 'yourself', 'background', 'student', 'sliit', 'study'],
  resume: ['resume', 'cv', 'download', 'pdf'],
  unknown: [],
};

export const INITIAL_MESSAGES: ChatMessageItem[] = [
  {
    id: '1',
    text: "Hi! I'm Thea, Janeesha's AI assistant. Ask me anything about his skills, projects, experience, or background!",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const SUGGESTIONS = [
  'What are your skills?',
  'Tell me about your projects',
  'How can I contact you?',
];

export function determineIntent(input: string): Intent {
  const lowerInput = input.toLowerCase();
  let bestIntent: Intent = 'unknown';
  let maxScore = 0;

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerInput.includes(keyword)) score += 1;
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent as Intent;
    }
  }

  return maxScore > 0 ? bestIntent : 'unknown';
}

export function generateBotResponse(input: string): string {
  const intent = determineIntent(input);

  switch (intent) {
    case 'greeting': {
      const greetings = [
        'Hello! How can I help you today?',
        "Hi there! Interested in Janeesha's work?",
        'Greetings! Feel free to ask me anything.',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    case 'skills':
      return (
        'Janeesha is a versatile full-stack developer & DevOps engineer!\n\n' +
        'Languages: Java, Python, C#, JavaScript, TypeScript, C, C++.\n' +
        'Frontend: React, TypeScript, Tailwind CSS, GSAP, HTML5, CSS3, Vite.\n' +
        'Backend: ASP.NET Core, Spring Boot, FastAPI, Node.js, RESTful APIs.\n' +
        'Cloud & Tools: Microsoft Azure, Docker, Proxmox VE, TrueNAS, Tailscale, Apache ZooKeeper, GitHub Actions.'
      );

    case 'projects':
      return `He has worked on some cool stuff! For example:\n1. ${projects[0].title} - ${projects[0].desc}\n2. ${projects[1].title} - ${projects[1].desc}`;

    case 'contact':
      return `You can reach him at ${profile.email} or call ${profile.phone}. He's also on LinkedIn!`;

    case 'about':
      return profile.bio;

    case 'resume':
      return "I can't send files directly yet, but you can download his CV via the Resume button in the navigation or contact form below!";

    default:
      return "I'm not quite sure about that. Try asking about 'skills', 'projects', or 'contact info'!";
  }
}
