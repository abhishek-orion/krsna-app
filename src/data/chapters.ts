import { GitaChapter } from '../types';

export const GITA_CHAPTERS: GitaChapter[] = [
  {
    number: 1,
    title_en: 'Arjuna's Dilemma',
    title_sanskrit: 'अर्जुनविषादयोग',
    verse_count: 47,
    summary: 'Arjuna is filled with grief and confusion about fighting in the battle.',
  },
  {
    number: 2,
    title_en: 'The Eternal Reality of the Soul',
    title_sanskrit: 'सांख्ययोग',
    verse_count: 72,
    summary: 'Krishna explains the immortality of the soul and the principles of karma yoga.',
  },
  {
    number: 3,
    title_en: 'Karma Yoga',
    title_sanskrit: 'कर्मयोग',
    verse_count: 43,
    summary: 'The path of selfless action and duty without attachment to results.',
  },
  {
    number: 4,
    title_en: 'The Way of Knowledge',
    title_sanskrit: 'ज्ञानकर्मसंन्यासयोग',
    verse_count: 42,
    summary: 'Krishna reveals the divine nature of His birth and the importance of knowledge.',
  },
  {
    number: 5,
    title_en: 'Karma and Renunciation',
    title_sanskrit: 'कर्मसंन्यासयोग',
    verse_count: 29,
    summary: 'The relationship between action and renunciation, and how both lead to liberation.',
  },
  {
    number: 6,
    title_en: 'The Practice of Meditation',
    title_sanskrit: 'ध्यानयोग',
    verse_count: 47,
    summary: 'The practice of meditation and the path to self-realization.',
  },
  {
    number: 7,
    title_en: 'Knowledge and Realization',
    title_sanskrit: 'ज्ञानविज्ञानयोग',
    verse_count: 30,
    summary: 'Krishna describes His divine nature and how devotees can know Him.',
  },
  {
    number: 8,
    title_en: 'The Imperishable Brahman',
    title_sanskrit: 'अक्षरब्रह्मयोग',
    verse_count: 28,
    summary: 'The nature of the Supreme, the material and spiritual worlds, and the moment of death.',
  },
  {
    number: 9,
    title_en: 'The Royal Secret',
    title_sanskrit: 'राजविद्याराजगुह्ययोग',
    verse_count: 34,
    summary: 'The most confidential knowledge about devotion to Krishna.',
  },
  {
    number: 10,
    title_en: 'The Divine Glories',
    title_sanskrit: 'विभूतियोग',
    verse_count: 42,
    summary: 'Krishna describes His divine manifestations and opulences.',
  },
  {
    number: 11,
    title_en: 'The Universal Form',
    title_sanskrit: 'विश्वरूपदर्शनयोग',
    verse_count: 55,
    summary: 'Arjuna witnesses Krishna\'s awe-inspiring universal form.',
  },
  {
    number: 12,
    title_en: 'The Path of Devotion',
    title_sanskrit: 'भक्तियोग',
    verse_count: 20,
    summary: 'The superiority of devotional service and qualities of a devotee.',
  },
  {
    number: 13,
    title_en: 'The Field and the Knower',
    title_sanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोग',
    verse_count: 35,
    summary: 'The body as the field, the soul as the knower, and the nature of knowledge.',
  },
  {
    number: 14,
    title_en: 'The Three Modes of Nature',
    title_sanskrit: 'गुणत्रयविभागयोग',
    verse_count: 27,
    summary: 'The three modes of material nature: goodness, passion, and ignorance.',
  },
  {
    number: 15,
    title_en: 'The Supreme Person',
    title_sanskrit: 'पुरुषोत्तमयोग',
    verse_count: 20,
    summary: 'The nature of the Supreme Being and the imperishable banyan tree.',
  },
  {
    number: 16,
    title_en: 'Divine and Demoniac Natures',
    title_sanskrit: 'दैवासुरसम्पद्विभागयोग',
    verse_count: 24,
    summary: 'The distinction between divine and demoniac qualities.',
  },
  {
    number: 17,
    title_en: 'The Three Divisions of Faith',
    title_sanskrit: 'श्रद्धात्रयविभागयोग',
    verse_count: 28,
    summary: 'The three types of faith, sacrifice, austerity, and charity.',
  },
  {
    number: 18,
    title_en: 'Liberation through Renunciation',
    title_sanskrit: 'मोक्षसंन्यासयोग',
    verse_count: 78,
    summary: 'The conclusion: the perfection of renunciation and complete surrender to Krishna.',
  },
];

export const getChapterInfo = (chapterNumber: number): GitaChapter | undefined => {
  return GITA_CHAPTERS.find((ch) => ch.number === chapterNumber);
};

export const getTotalVerses = (): number => {
  return GITA_CHAPTERS.reduce((sum, ch) => sum + ch.verse_count, 0);
};

