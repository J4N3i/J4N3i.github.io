import { profile, projects, skillGroups, educationList, certifications } from '@/data';

export type Intent =
  | 'availability'
  | 'cv'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'about'
  | 'thanks'
  | 'greeting'
  | 'unknown';

export interface BotAction {
  label: string;
  href?: string;
  copy?: string;
  download?: boolean;
}

export interface BotReply {
  text: string;
  actions?: BotAction[];
  chips?: string[];
}

export interface ChatMessageItem {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  actions?: BotAction[];
  chips?: string[];
  timestamp?: Date;
}

// Specificity priority order: ties go to the earliest (most specific) intent
export const INTENT_PRIORITY: Intent[] = [
  'availability',
  'cv',
  'projects',
  'skills',
  'experience',
  'education',
  'contact',
  'about',
  'thanks',
  'greeting',
];

export const INTENT_KEYWORDS: Record<Exclude<Intent, 'unknown'>, string[]> = {
  availability: [
    'intern',
    'internship',
    'internships',
    'job',
    'jobs',
    'role',
    'roles',
    'hire',
    'hiring',
    'available',
    'availability',
    'opportunity',
    'opportunities',
    'full-time',
    'graduate',
    'graduates',
  ],
  cv: ['cv', 'cvs', 'resume', 'resumes', 'download'],
  projects: [
    'project',
    'projects',
    'portfolio',
    'built',
    'build',
    'created',
    'app',
    'apps',
    'showcase',
  ],
  skills: [
    'skill',
    'skills',
    'stack',
    'tech',
    'technology',
    'technologies',
    'tool',
    'tools',
    'language',
    'languages',
    'framework',
    'frameworks',
    'frontend',
    'backend',
    'devops',
    'cloud',
    'docker',
    'react',
    'azure',
    'proxmox',
    'truenas',
    'spring',
    'fastapi',
    'typescript',
    'python',
    'java',
    'c#',
    'asp.net',
    'tailwind',
    'gsap',
    'vite',
    'certification',
    'certifications',
    'certificate',
    'certified',
  ],
  experience: [
    'experience',
    'career',
    'history',
    'leadership',
    'community',
    'bank',
    'trainee',
    'aiesec',
  ],
  education: [
    'education',
    'degree',
    'university',
    'school',
    'academic',
    'academics',
    'study',
    'studying',
    'college',
    'undergrad',
    'undergraduate',
    'sliit',
  ],
  contact: ['contact', 'email', 'reach', 'message', 'talk', 'connect', 'touch', 'linkedin'],
  about: ['about', 'who', 'bio', 'yourself', 'profile', 'background', 'intro', 'introduction'],
  thanks: ['thank', 'thanks', 'thx', 'appreciate', 'helpful', 'great', 'awesome', 'perfect'],
  greeting: ['hello', 'hi', 'hey', 'greetings', 'howdy'],
};

export const INITIAL_MESSAGE: ChatMessageItem = {
  id: 'init-1',
  text: "Hi, I'm Thea. I can answer quick questions about Janeesha's work. What would you like to know?",
  sender: 'bot',
  chips: ['About', 'Projects', 'Skills', 'Experience', 'CV', 'Contact'],
};

export const INITIAL_MESSAGES: ChatMessageItem[] = [INITIAL_MESSAGE];

export const TOPIC_CHIPS = ['About', 'Projects', 'Skills', 'Experience', 'CV', 'Contact'];

export const SUGGESTIONS = TOPIC_CHIPS;

export function determineIntent(input: string): Intent {
  if (!input || !input.trim()) return 'unknown';

  const normalized = input.toLowerCase().replace(/[^\w\s-]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);

  if (tokens.length === 0) return 'unknown';

  let highestScore = 0;
  let chosenIntent: Intent = 'unknown';

  for (const intent of INTENT_PRIORITY) {
    const keywords = INTENT_KEYWORDS[intent];
    let score = 0;

    for (const kw of keywords) {
      if (kw.includes(' ')) {
        const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        if (regex.test(normalized)) {
          score += 2;
        }
      } else if (tokenSet.has(kw)) {
        score += 1;
      }
    }

    if (intent === 'skills') {
      for (const cert of certifications) {
        const certTokens = cert.name.toLowerCase().split(/\s+/);
        for (const t of certTokens) {
          if (t.length > 3 && tokenSet.has(t)) {
            score += 1;
          }
        }
      }
    }

    if (intent === 'projects') {
      for (const proj of projects) {
        const titleTokens = proj.title.toLowerCase().split(/\s+/);
        for (const t of titleTokens) {
          if (t.length > 3 && tokenSet.has(t)) {
            score += 1;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      chosenIntent = intent;
    }
  }

  return highestScore > 0 ? chosenIntent : 'unknown';
}

export function generateBotReply(input: string): BotReply {
  const intent = determineIntent(input);

  switch (intent) {
    case 'availability':
      return {
        text: 'Janeesha is open to DevOps and full-stack internships and graduate roles.',
        actions: [
          { label: 'Connect on LinkedIn', href: profile.linkedinUrl },
          { label: 'Download CV', href: profile.cvs[0].href, download: true },
          { label: 'Contact', href: '#contact' },
        ],
        chips: ['Projects', 'Skills', 'About'],
      };

    case 'cv':
      return {
        text: "You can download Janeesha's CV directly (tailored for DevOps, Full-Stack, or AI/ML):",
        actions: profile.cvs.map((cv) => ({
          label: cv.label,
          href: cv.href,
          download: true,
        })),
        chips: ['Projects', 'Skills', 'Contact'],
      };

    case 'projects': {
      const topProjects = projects.slice(0, 3);
      const list = topProjects.map((p) => `• ${p.title} — ${p.oneLiner}`).join('\n');
      return {
        text: `Here are three of Janeesha's featured projects:\n\n${list}`,
        actions: [
          { label: 'View projects', href: '#projects' },
          { label: 'GitHub', href: profile.githubUrl },
        ],
        chips: ['Skills', 'Download CV', 'Contact'],
      };
    }

    case 'skills': {
      const list = skillGroups.map((g) => `• ${g.category}: ${g.skills.join(', ')}`).join('\n');
      return {
        text: `Janeesha's core technical skills across code and cloud:\n\n${list}`,
        actions: [
          { label: 'View projects', href: '#projects' },
          { label: 'Download CV', href: profile.cvs[0].href, download: true },
        ],
        chips: ['Projects', 'Availability', 'Experience', 'Contact'],
      };
    }

    case 'experience':
      return {
        text: "Janeesha's experience combines community leadership and operational discipline:\n\n• Leadership & Community: Team Leader at AIESEC in SLIIT, and student community member at SLIIT (Faculty of Computing Student Community and Student Interactive Society).\n• Work Experience: Commercial banking operational trainee.",
        actions: [
          { label: 'View experience', href: '#experience' },
          { label: 'LinkedIn', href: profile.linkedinUrl },
        ],
        chips: ['Education', 'Projects', 'Skills', 'Contact'],
      };

    case 'education': {
      const primaryEdu = educationList[0];
      return {
        text: `Janeesha is a final-year Computer Science undergraduate at ${primaryEdu.institution}, studying ${primaryEdu.degree}. Focus areas include software architecture, distributed systems, and DevOps engineering.`,
        actions: [
          { label: 'View education', href: '#education' },
          { label: 'Download CV', href: profile.cvs[0].href, download: true },
        ],
        chips: ['Experience', 'Skills', 'Contact'],
      };
    }

    case 'contact':
      return {
        text: 'The quickest way to reach Janeesha is via LinkedIn or email, and Janeesha is always happy to share CV copies.',
        actions: [
          { label: 'LinkedIn', href: profile.linkedinUrl },
          { label: 'Copy email', copy: profile.email },
          { label: 'Send a message', href: '#contact' },
        ],
        chips: ['Availability', 'Download CV', 'Projects'],
      };

    case 'about':
      return {
        text: 'Janeesha is a final-year Computer Science undergraduate at SLIIT and Team Leader at AIESEC in SLIIT. As a Full-Stack & DevOps Engineer, Janeesha builds and ships reliable web systems, from immersive React frontends to private cloud labs on Proxmox, Docker, and Microsoft Azure.',
        actions: [
          { label: 'View projects', href: '#projects' },
          { label: 'Download CV', href: profile.cvs[0].href, download: true },
        ],
        chips: ['Projects', 'Skills', 'Availability'],
      };

    case 'greeting':
      return {
        text: "Hi! I'm Thea. How can I help you explore Janeesha's work today?",
        chips: ['About', 'Projects', 'Skills', 'Availability', 'CV', 'Contact'],
      };

    case 'thanks':
      return {
        text: "You're welcome! Let me know if you would like to know anything else about Janeesha's work.",
        chips: ['Projects', 'Download CV', 'Contact'],
      };

    case 'unknown':
    default:
      return {
        text: "I don't have an answer for that yet. Pick a topic below, or send Janeesha a message.",
        actions: [
          { label: 'Send a message', href: '#contact' },
          { label: 'LinkedIn', href: profile.linkedinUrl },
        ],
        chips: ['About', 'Projects', 'Skills', 'Availability', 'CV', 'Contact'],
      };
  }
}

export function generateBotResponse(input: string): string {
  return generateBotReply(input).text;
}
