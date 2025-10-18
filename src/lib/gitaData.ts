import gitaDataJson from '../../assets/gita/en.json';
import { GitaVerse, GitaChapter } from '../types';

interface GitaData {
  metadata: {
    title: string;
    translator?: string;
    translation?: string;
    source_url?: string;
    license?: string;
    year?: number;
    language: string;
    total_chapters: number;
    total_verses: number;
  };
  chapters: GitaChapter[];
  verses: GitaVerse[];
}

const gitaData: GitaData = gitaDataJson as GitaData;

export const getChapters = (): GitaChapter[] => {
  return gitaData.chapters;
};

export const getChapter = (chapterNumber: number): GitaChapter | undefined => {
  return gitaData.chapters.find((c) => c.chapter === chapterNumber);
};

export const getVerse = (chapterNumber: number, verseNumber: number): GitaVerse | undefined => {
  return gitaData.verses.find(
    (v) => v.chapter === chapterNumber && v.verse === verseNumber
  );
};

export const getVersesByChapter = (chapterNumber: number): GitaVerse[] => {
  return gitaData.verses.filter((v) => v.chapter === chapterNumber);
};

export const searchVerses = (query: string): GitaVerse[] => {
  const lowerCaseQuery = query.toLowerCase();
  
  return gitaData.verses.filter(verse => 
    verse.sloka_sanskrit?.toLowerCase().includes(lowerCaseQuery) ||
    verse.transliteration?.toLowerCase().includes(lowerCaseQuery) ||
    verse.translation_en.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getAllVerses = (): GitaVerse[] => {
  return gitaData.verses;
};

export const getMetadata = () => {
  return gitaData.metadata;
};

