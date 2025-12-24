
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';
import { Word } from '../types';

interface EmojiDetectiveProps {
  onComplete: () => void;
}

const EmojiDetective: React.FC<EmojiDetectiveProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const targetWord = VOCABULARY[currentIdx];

  useEffect(() => {
    generateOptions();
  }, [currentIdx]);

  const generateOptions = () => {
    const others = VOCABULARY.filter(w => w.portuguese !== targetWord.portuguese)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.portuguese);
    
    setOptions([targetWord.portuguese, ...others].sort(() => Math.random() - 0.5));
  };

  const handleGuess = (guess: string) => {
    if (guess === targetWord.portuguese) {
      setFeedback('correct');
      setTimeout(() => {
        if (currentIdx + 1 < VOCABULARY.length) {
          setCurrentIdx(currentIdx + 1);
          setFeedback(null);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="text-center p-4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-yellow-600">Emoji Detective 🔍</h3>
        <span className="bg-yellow-100 px-4 py-1 rounded-full font-bold">{currentIdx + 1} / {VOCABULARY.length}</span>
      </div>

      <img src={POKEMON_ARTWORK(25)} alt="Pikachu" className="w-24 mx-auto mb-4" />
      
      <div className="text-9xl mb-12 animate-pulse">{targetWord.emoji}</div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleGuess(opt)}
            disabled={feedback !== null}
            className={`py-4 px-6 rounded-2xl text-2xl font-bold border-4 transition-all ${
              feedback === 'correct' && opt === targetWord.portuguese ? 'bg-green-500 border-green-600 text-white' :
              feedback === 'wrong' && opt !== targetWord.portuguese ? 'bg-white border-red-200' :
              'bg-white border-blue-200 hover:border-blue-400 hover:scale-105'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback === 'correct' && <div className="mt-8 text-3xl text-green-500 font-bold">Great Job! ⭐</div>}
      {feedback === 'wrong' && <div className="mt-8 text-3xl text-red-500 font-bold">Try again! ❌</div>}
    </div>
  );
};

export default EmojiDetective;
