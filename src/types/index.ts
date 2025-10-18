// Core types for the KRSNA app

export interface GitaVerse {
  id?: number;
  chapter: number;
  verse: number;
  sloka_sanskrit?: string;
  translation_en: string;
  transliteration?: string;
  commentary_en?: string; // Detailed explanation and meaning
  translator?: string;
  source_url?: string;
}

export interface GitaChapter {
  chapter: number;
  name_en: string;
  name_sanskrit?: string;
  name_transliteration?: string;
  name_meaning?: string;
  summary?: string;
  verses_count?: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  chapter: number;
  verse: number;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  citations?: VerseRef[];
}

export interface VerseRef {
  chapter: number;
  verse: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  title?: string;
  createdAt: number;
  updatedAt: number;
}

export interface TTSSettings {
  rate: number;
  pitch: number;
  voice?: string;
  language?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  tts: TTSSettings;
}

export interface UserProfile {
  id: string;
  displayName?: string;
  photoUrl?: string;
  premium: boolean;
  role: 'user' | 'admin';
  createdAt: number;
}
