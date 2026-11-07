import { describe, it, expect } from 'vitest';
import {
  determineIntent,
  generateBotReply,
  generateBotResponse,
  INITIAL_MESSAGE,
  INITIAL_MESSAGES,
  INTENT_PRIORITY,
  type Intent,
} from '../chatbot';

describe('Chatbot Logic & Intent Matching', () => {
  it('"Can I hire you?" resolves to availability (not greeting)', () => {
    const intent = determineIntent('Can I hire you?');
    expect(intent).toBe('availability');
    expect(intent).not.toBe('greeting');
  });

  it('"hi" resolves to greeting', () => {
    expect(determineIntent('hi')).toBe('greeting');
  });

  it('"this is great" does not match greeting', () => {
    const intent = determineIntent('this is great');
    expect(intent).not.toBe('greeting');
    expect(intent).toBe('thanks');
  });

  it('"send me your CV" resolves to cv', () => {
    expect(determineIntent('send me your CV')).toBe('cv');
  });

  it('"what stack do you use" resolves to skills', () => {
    expect(determineIntent('what stack do you use')).toBe('skills');
  });

  it('"what projects have you built" resolves to projects', () => {
    expect(determineIntent('what projects have you built')).toBe('projects');
  });

  it('gibberish input resolves to unknown', () => {
    expect(determineIntent('1234567890qwerty')).toBe('unknown');
    expect(determineIntent('   ')).toBe('unknown');
    expect(determineIntent('')).toBe('unknown');
  });

  it('resolves experience, education, contact and about intents correctly', () => {
    expect(determineIntent('tell me about your leadership experience')).toBe('experience');
    expect(determineIntent('where did you study education')).toBe('education');
    expect(determineIntent('how do I contact reach email')).toBe('contact');
    expect(determineIntent('who are you tell me about yourself')).toBe('about');
  });

  it('ensures ties respect specificity priority', () => {
    // Both 'hire' (availability) and 'talk' (contact) present => availability wins
    expect(determineIntent('can we talk about hire')).toBe('availability');
    // Both 'resume' (cv) and 'project' (projects) present => cv wins
    expect(determineIntent('resume project')).toBe('cv');
  });

  it('returns structured replies with valid text, actions and chips', () => {
    const reply = generateBotReply('Can I hire you?');
    expect(reply.text).toContain('internships');
    expect(reply.actions?.length).toBeGreaterThan(0);
    expect(reply.chips?.length).toBeGreaterThan(0);

    const cvReply = generateBotReply('download your cv');
    expect(cvReply.actions?.every((a) => a.download === true)).toBe(true);

    const contactReply = generateBotReply('contact');
    expect(contactReply.actions?.some((a) => a.copy)).toBe(true);
    expect(contactReply.actions?.some((a) => a.href === '#contact')).toBe(true);

    const skillsReply = generateBotReply('what skills do you have');
    expect(skillsReply.actions?.some((a) => a.href === '#skills')).toBe(true);

    const projectsReply = generateBotReply('show me projects');
    expect(projectsReply.actions?.some((a) => a.href === '#projects')).toBe(true);

    const unknownReply = generateBotReply('asdfghjkl12345');
    expect(unknownReply.text).toBe(
      "I don't have an answer for that yet. Pick a topic below, or send Janeesha a message."
    );
  });

  it('initial message matches expected prompt structure', () => {
    expect(INITIAL_MESSAGE.text).toBe(
      "Hi, I'm Thea. I can answer quick questions about Janeesha's work. What would you like to know?"
    );
    expect(INITIAL_MESSAGE.chips).toEqual([
      'About',
      'Projects',
      'Skills',
      'Experience',
      'CV',
      'Contact',
    ]);
    expect(INITIAL_MESSAGES.length).toBe(1);
  });

  it('no reply ever contains a phone number pattern or gendered pronouns ("he", "his", "him")', () => {
    // Phone numbers like +94 77 959 3243, 077-959-3243, +1 (555) 123-4567
    const phonePattern = /(?:\+\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}\b/;
    const genderedPattern = /\b(he|his|him)\b/i;

    const testInputs = [
      'Can I hire you?',
      'send me your CV',
      'what stack do you use',
      'what projects have you built',
      'hi',
      'this is great',
      '1234567890qwerty',
      'tell me about your leadership experience',
      'where did you study',
      'how can I contact you',
      'who are you and tell me about yourself',
      ...INTENT_PRIORITY,
    ];

    for (const input of testInputs) {
      const reply = generateBotReply(input);
      const plainText = generateBotResponse(input);

      // Verify no gendered pronouns
      expect(reply.text).not.toMatch(genderedPattern);
      expect(plainText).not.toMatch(genderedPattern);

      // Verify no phone number in reply text
      expect(reply.text).not.toMatch(phonePattern);
      expect(plainText).not.toMatch(phonePattern);
      expect(reply.text).not.toContain('77 959 3243');

      // Verify actions do not have phone numbers or tel: protocols
      if (reply.actions) {
        for (const action of reply.actions) {
          if (action.href) {
            expect(action.href).not.toContain('tel:');
          }
          if (action.copy) {
            expect(action.copy).not.toMatch(phonePattern);
          }
        }
      }
    }
  });
});
