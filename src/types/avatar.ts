export interface Avatar {
  id: string;
  userId?: string;
  name: string;
  appearance: {
    gender: 'male' | 'female' | 'non-binary';
    age: string;
    hair: string;
    clothing: string;
    description?: string;
  };
  personalityTraits: string[];
  createdAt: Date;
  lastChatAt?: Date;
}

export interface Message {
  id: string;
  avatarId: string;
  sender: 'user' | 'avatar';
  text: string;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  avatarId: string;
  messages: Message[];
  lastMessageAt: Date;
}

export const PERSONALITY_TRAITS = [
  'friendly',
  'sarcastic',
  'shy',
  'adventurous',
  'mysterious',
  'cheerful',
  'protective',
  'intellectual',
  'playful',
  'caring',
  'confident',
  'rebellious',
] as const;

export const APPEARANCE_OPTIONS = {
  gender: ['male', 'female', 'non-binary'],
  age: ['teenager', 'young adult', 'adult', 'mature'],
  hair: ['black', 'brown', 'blonde', 'red', 'white', 'colorful'],
  clothing: ['casual', 'formal', 'fantasy', 'modern', 'vintage', 'futuristic'],
} as const;