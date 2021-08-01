export interface Verse {
  id: string;
  chapterId: string;
  bookId: string;
  bibleId: string;
  reference: string;
  next: string;
  previous: string;
  text: string;
  biblePosition: number;
  verseTypes: String[] // should be enum of types
}

export interface VerseType {
  anxiety: string;
  depressed: boolean;
  forgotten: boolean;
  guilty: boolean;
  unworthy: boolean;
  encouragement: boolean;
  faith: boolean;
  thankful: boolean;
  love: boolean;
  prayer: boolean;
  Jesus: boolean;
  God: boolean;
  Angels: boolean;
  satan: boolean;
  sin: boolean;
  lust: boolean;
  anger: boolean;
  jealous: boolean;
  standalone: boolean;
  none: boolean;
  completed: boolean;
}

export const VerseTypeKeys = [
  'anxiety',
  'depressed',
  'forgotten',
  'guilty',
  'unworthy',
  'encouragement',
  'faith',
  'thankful',
  'love',
  'prayer',
  'Jesus',
  'God',
  'Angels',
  'satan',
  'sin',
  'lust',
  'anger',
  'jealous',
  'standalone',
  'none',
  'completed',
]



