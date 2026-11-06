import { describe, it, expect } from 'vitest';
import { determineIntent, generateBotResponse, INITIAL_MESSAGES } from '../chatbot';

describe('Chatbot Logic', () => {
  it('identifies skills and tech stack intent accurately', () => {
    expect(determineIntent('tell me about your skills and tech stack')).toBe('skills');
    expect(determineIntent('what devops and docker tools do you use?')).toBe('skills');
    expect(determineIntent('do you know react and typescript?')).toBe('skills');
  });

  it('identifies projects intent accurately', () => {
    expect(determineIntent('show me your portfolio projects')).toBe('projects');
    expect(determineIntent('what work have you created?')).toBe('projects');
  });

  it('identifies contact and hire intent accurately', () => {
    expect(determineIntent('how can I contact or hire you?')).toBe('contact');
    expect(determineIntent('can I send an email or reach out?')).toBe('contact');
  });

  it('identifies resume / cv intent', () => {
    expect(determineIntent('can I download your cv or resume?')).toBe('resume');
  });

  it('identifies about intent', () => {
    expect(determineIntent('who are you and what is your bio?')).toBe('about');
    expect(determineIntent('tell me about yourself and your background at sliit')).toBe('about');
  });

  it('identifies greetings', () => {
    expect(determineIntent('hello there!')).toBe('greeting');
    expect(determineIntent('hey')).toBe('greeting');
  });

  it('returns unknown for unrecognized input', () => {
    expect(determineIntent('1234567890qwerty')).toBe('unknown');
  });

  it('generates appropriate response text for intents', () => {
    const skillsRes = generateBotResponse('what skills do you have?');
    expect(skillsRes).toContain('Docker');
    expect(skillsRes).toContain('Azure');

    const contactRes = generateBotResponse('how to contact you?');
    expect(contactRes).toContain('reach');

    const unknownRes = generateBotResponse('asdfghjkl12345');
    expect(unknownRes.length).toBeGreaterThan(10);
  });

  it('contains initial welcome messages', () => {
    expect(INITIAL_MESSAGES.length).toBeGreaterThan(0);
    expect(INITIAL_MESSAGES[0].sender).toBe('bot');
  });
});
