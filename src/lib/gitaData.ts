import gitaDataJson from '../../assets/gita/en.json';
import chapter1Detailed from '../../assets/gita/chapter_1_detailed.json';
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

// Detailed verse data with commentary
const detailedChapterData: Record<number, any> = {
  1: chapter1Detailed,
};

export const getChapters = (): GitaChapter[] => {
  return gitaData.chapters;
};

export const getChapter = (chapterNumber: number): GitaChapter | undefined => {
  return gitaData.chapters.find((c) => c.chapter === chapterNumber);
};

export const getVerse = (chapterNumber: number, verseNumber: number): GitaVerse | undefined => {
  // First try to get detailed verse data if available
  const detailedChapter = detailedChapterData[chapterNumber];
  if (detailedChapter && detailedChapter.verses) {
    const detailedVerse = detailedChapter.verses.find(
      (v: any) => v.verse_number === verseNumber
    );
    if (detailedVerse) {
      return {
        chapter: chapterNumber,
        verse: verseNumber,
        sloka_sanskrit: detailedVerse.sloka_sanskrit,
        transliteration: detailedVerse.transliteration,
        translation_en: detailedVerse.translation_en,
        commentary_en: detailedVerse.commentary_en,
      };
    }
  }
  
  // Fallback to basic data
  return gitaData.verses.find(
    (v) => v.chapter === chapterNumber && v.verse === verseNumber
  );
};

// Get chapter overview
export const getChapterOverview = (chapterNumber: number) => {
  const detailedChapter = detailedChapterData[chapterNumber];
  if (detailedChapter && detailedChapter.metadata) {
    return {
      title_en: detailedChapter.metadata.title_en,
      title_sanskrit: detailedChapter.metadata.title_sanskrit,
      title_transliteration: detailedChapter.metadata.title_transliteration,
      title_meaning: detailedChapter.metadata.title_meaning,
      overview: detailedChapter.metadata.overview,
      spiritual_significance: detailedChapter.metadata.spiritual_significance,
      total_verses: detailedChapter.metadata.total_verses,
    };
  }
  return null;
};

export const getVersesByChapter = (chapterNumber: number): GitaVerse[] => {
  // First try to get detailed verse data if available
  const detailedChapter = detailedChapterData[chapterNumber];
  if (detailedChapter && detailedChapter.verses) {
    return detailedChapter.verses.map((v: any) => ({
      chapter: chapterNumber,
      verse: v.verse_number,
      sloka_sanskrit: v.sloka_sanskrit,
      transliteration: v.transliteration,
      translation_en: v.translation_en,
      commentary_en: v.commentary_en,
    }));
  }
  
  // Fallback to basic data
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

