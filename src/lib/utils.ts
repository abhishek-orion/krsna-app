/**
 * Utility functions
 */

export function formatVerseReference(chapter: number, verse: number): string {
  return `${chapter}.${verse}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(timestamp: number): string {
  return `${formatDate(timestamp)} at ${formatTime(timestamp)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getChapterName(chapterNumber: number): string {
  const chapters = [
    "Arjuna's Dilemma",
    'The Eternal Reality of the Soul',
    'Karma Yoga',
    'The Way of Knowledge',
    'Karma and Renunciation',
    'The Practice of Meditation',
    'Knowledge and Realization',
    'The Imperishable Brahman',
    'The Royal Secret',
    'The Divine Glories',
    'The Universal Form',
    'The Path of Devotion',
    'The Field and the Knower',
    'The Three Modes of Nature',
    'The Supreme Person',
    'Divine and Demoniac Natures',
    'The Three Divisions of Faith',
    'Liberation through Renunciation',
  ];
  
  return chapters[chapterNumber - 1] || `Chapter ${chapterNumber}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

