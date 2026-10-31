export type Mastery = 'new' | 'learning' | 'mastered';

export type Deck = {
  id: string;
  title: string;
  course: string;
  createdAt: string; // '2026-10-12'
  cardCount: number;
  mastery: Mastery;
  coverUrl: string;
  description?: string;
};