
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface SpellingBeeProps {
  onComplete: () => void;
}

const SpellingBee: React.FC<SpellingBeeProps> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);

  const target = VOCABULARY[idx].portuguese.toLowerCase();
  const targetArray = target.split('');

  useEffect(() => {
    const letters = target.replace(/\s/g, '').split('').sort(() => Math.random() - 0.5);
    setShuffledLetters(letters);
    setUserInput([]);
  }, [idx]);

  const addLetter = (letter: string, sIdx: number) => {
    // If the next required char is a space, add it automatically
    let nextIdx = userInput.length;
    let newInputs = [...userInput];

    // Check if we need to auto-insert a space before this letter
    if (targetArray[nextIdx] === ' ') {
      newInputs.push(' ');
      nextIdx++;
    }

    newInputs.push(letter);
    setUserInput(newInputs);

    // Remove letter from shuffled
    const nextShuffled = [...shuffledLetters];
    nextShuffled.splice(sIdx, 1);
    setShuffledLetters(nextShuffled);
  };

  const removeLast = () => {
    if (userInput.length === 0) return;
    const last = userInput[userInput.length - 1];
    let nextInputs = [...userInput];
    nextInputs.pop();
    
    // If we removed a letter but there's a space before it, remove the space too
    if (nextInputs.length > 0 && nextInputs[nextInputs.length - 1] === ' ') {
      nextInputs.pop();
    }

    if (last !== ' ') {
      setShuffledLetters([...shuffledLetters, last].sort(() => Math.random() - 0.5));
    }
    setUserInput(nextInputs);
  };

  useEffect(() => {
    if (userInput.join('') === target) {
      setTimeout(() => {
        if (idx + 1 < VOCABULARY.length) {
          setIdx(idx + 1);
        } else {
          onComplete();
        }
      }, 800);
    }
  }, [userInput]);

  return (
    <div className="text-center p-4">
      <h3 className="text-2xl font-bold text-orange-600 mb-6">Spelling Bee 🐝</h3>
      <img src={POKEMON_ARTWORK(4)} alt="Charmander" className="w-24 mx-auto mb-6" />
      
      <div className="text-4xl mb-4 font-bold text-slate-400">{VOCABULARY[idx].chinese} {VOCABULARY[idx].emoji}</div>

      <div className="flex justify-center gap-2 mb-12 min-h-[60px] flex-wrap">
        {targetArray.map((char, i) => (
          <div 
            key={i} 
            className={`w-12 h-16 border-b-4 text-4xl flex items-center justify-center font-bold ${
              char === ' ' ? 'border-transparent w-8' : 'border-slate-300'
            }`}
          >
            {userInput[i] || ''}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {shuffledLetters.map((letter, i) => (
          <button
            key={i}
            onClick={() => addLetter(letter, i)}
            className="w-14 h-14 bg-yellow-400 text-white rounded-xl text-2xl font-bold shadow hover:bg-yellow-500 hover:-translate-y-1 transition-all"
          >
            {letter}
          </button>
        ))}
      </div>

      <button 
        onClick={removeLast}
        className="px-8 py-3 bg-red-100 text-red-500 rounded-full font-bold hover:bg-red-200 transition-colors"
      >
        Undo ⌫
      </button>
    </div>
  );
};

export default SpellingBee;
