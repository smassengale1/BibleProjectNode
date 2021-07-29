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
}

export interface VerseType {
  verseId: string;
  anxiety: boolean;
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
}


