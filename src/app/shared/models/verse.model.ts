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
  verseTypes: string[] // should be enum of types
}

// Need to update to be enum
export enum VerseType {
  anxiety = "anxiety",
  depressed = "depressed",
  forgotten = "forgotten",
  guilty = "guilty",
  unworthy = "unworthy",
  encouragement = "encouragement",
  faith = "faith",
  thankful = "thankful",
  love = "love",
  strength = "strength",
  prayer = "prayer",
  jesus = "jesus",
  god = "god",
  sin = "sin",
  lust = "lust",
  anger = "anger",
  jealous = "jealous",
  standalone = "standalone",
  needsNext = "needsNext",
  none = "none",
  completed = "completed",
}

export interface VerseFilter {
  limit: number;
  verseTypes: string[];
  testament: "new" | "old";
  completed: boolean;
}




