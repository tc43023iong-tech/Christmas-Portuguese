
import { Word, GameInfo } from './types';

export const VOCABULARY: Word[] = [
  { portuguese: 'Natal', chinese: '聖誕節', pinyin: 'Shèngdànjié', emoji: '🎅' },
  { portuguese: 'Pai Natal', chinese: '聖誕老人', pinyin: 'Shèngdàn lǎorén', emoji: '🎅' },
  { portuguese: 'Rena', chinese: '馴鹿', pinyin: 'Xùnlù', emoji: '🦌' },
  { portuguese: 'Trenó', chinese: '雪橇', pinyin: 'Xuěqiāo', emoji: '🛷' },
  { portuguese: 'Estrela', chinese: '星星', pinyin: 'Xīngxīng', emoji: '⭐' },
  { portuguese: 'Árvore de Natal', chinese: '聖誕樹', pinyin: 'Shèngdànshù', emoji: '🌲' },
  { portuguese: 'Luzes de Natal', chinese: '聖誕燈飾', pinyin: 'Shèngdàn dēngshì', emoji: '✨' },
  { portuguese: 'Enfeites de Natal', chinese: '聖誕裝飾', pinyin: 'Shèngdàn zhuāngshì', emoji: '🔔' },
  { portuguese: 'Bolo Rei', chinese: '國王蛋糕', pinyin: 'Guówáng dàngāo', emoji: '🥮' },
  { portuguese: 'Presente', chinese: '禮物', pinyin: 'Lǐwù', emoji: '🎁' },
];

export const GAMES: GameInfo[] = [
  { id: 'detective', title: 'Emoji Detective', emoji: '🔍', pokemonId: 25, description: 'Match emoji to Portuguese words!' },
  { id: 'matching', title: 'Word Matcher', emoji: '🔗', pokemonId: 1, description: 'Link Chinese and Portuguese!' },
  { id: 'spelling', title: 'Spelling Bee', emoji: '🐝', pokemonId: 4, description: 'Spell the Portuguese words!' },
  { id: 'fill', title: 'Sentence Fill', emoji: '✍️', pokemonId: 7, description: 'Complete the sentences!' },
  { id: 'bubble', title: 'Bubble Pop', emoji: '🫧', pokemonId: 131, description: 'Find the word in bubbles!' },
  { id: 'search', title: 'Word Search', emoji: '🧩', pokemonId: 39, description: 'Find hidden words!' },
  { id: 'battle', title: 'Poké Battle', emoji: '⚔️', pokemonId: 6, description: 'Defeat the enemy Pokémon!' },
  { id: 'rain', title: 'Rain Catcher', emoji: '🌧️', pokemonId: 186, description: 'Catch falling word drops!' },
  { id: 'memory', title: 'Memory Master', emoji: '🧠', pokemonId: 143, description: 'Find the missing word!' },
];

export const FURNITURE_LIST = [
  '🛋️', '🪑', '🛏️', '🖼️', '🪴', '📺', '🧸', '🪁', '📚', 
  '🍵', '💡', '🪟', '🕰️', '🧶', '📦', '🧺', '🪞', '🚪'
];

export const POKEMON_ARTWORK = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
