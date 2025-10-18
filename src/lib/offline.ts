import { Asset } from 'expo-asset';
import { GitaVerse } from '../types';

// Load verses from bundled JSON
export const loadOfflineVerses = async (): Promise<GitaVerse[]> => {
  try {
    // In production, this would load from assets/gita/en.json
    // For now, return empty array - you'll populate this with parsed data
    const asset = Asset.fromModule(require('../../assets/gita/en.json'));
    await asset.downloadAsync();
    
    // Fetch the local file
    const response = await fetch(asset.localUri || asset.uri);
    const data = await response.json();
    
    return data.verses || [];
  } catch (error) {
    console.error('Error loading offline verses:', error);
    return [];
  }
};

export const getVerseByReference = (
  verses: GitaVerse[],
  chapter: number,
  verse: number
): GitaVerse | undefined => {
  return verses.find((v) => v.chapter === chapter && v.verse === verse);
};

export const getVersesByChapter = (
  verses: GitaVerse[],
  chapter: number
): GitaVerse[] => {
  return verses.filter((v) => v.chapter === chapter);
};

export const searchVerses = (
  verses: GitaVerse[],
  query: string
): GitaVerse[] => {
  const lowerQuery = query.toLowerCase();
  return verses.filter((v) =>
    v.translation_en.toLowerCase().includes(lowerQuery) ||
    (v.sloka_sanskrit && v.sloka_sanskrit.toLowerCase().includes(lowerQuery)) ||
    (v.transliteration && v.transliteration.toLowerCase().includes(lowerQuery))
  );
};

