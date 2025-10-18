import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { loadOfflineVerses, getVersesByChapter, getVerseByReference } from '../lib/offline';
import { GitaVerse } from '../types';

export function useVerses() {
  const [offlineVerses, setOfflineVerses] = useState<GitaVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfflineVerses()
      .then((verses) => {
        setOfflineVerses(verses);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading verses:', error);
        setLoading(false);
      });
  }, []);

  return {
    verses: offlineVerses,
    loading,
  };
}

export function useChapterVerses(chapter: number) {
  const { verses, loading } = useVerses();
  
  const chapterVerses = verses.filter((v) => v.chapter === chapter);
  
  return {
    verses: chapterVerses,
    loading,
  };
}

export function useVerse(chapter: number, verse: number) {
  const { verses, loading } = useVerses();
  
  const verseData = verses.find(
    (v) => v.chapter === chapter && v.verse === verse
  );
  
  return {
    verse: verseData,
    loading,
  };
}

