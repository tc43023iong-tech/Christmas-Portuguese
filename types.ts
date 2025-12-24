
export interface Word {
  portuguese: string;
  chinese: string;
  pinyin: string;
  emoji: string;
}

export enum GameStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  COMPLETED = 'COMPLETED'
}

export interface GameInfo {
  id: string;
  title: string;
  emoji: string;
  pokemonId: number;
  description: string;
}

export interface Furniture {
  id: string;
  emoji: string;
}
