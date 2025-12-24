
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface MemoryGameProps {
  onComplete: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'memorize' | 'guess'>('memorize');
  const [timer, setTimer] = useState(10);
  const [subset, setSubset] = useState<string[]>([]);
  const [missingWord, setMissingWord] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const fullSubset = VOCABULARY.map(v => v.portuguese).sort(() => Math.random() - 0.5).slice(0, 8);
    setSubset(fullSubset);
    setGameState('memorize');
    setTimer(10);
    setFeedback(null);

    const countdown = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(countdown);
          const removed = fullSubset[Math.floor(Math.random() * fullSubset.length)];
          setMissingWord(removed);
          setGameState('guess');
          
          const others = VOCABULARY.map(v => v.portuguese).filter(v => !fullSubset.includes(v)).slice(0, 4);
          setOptions([removed, ...others].sort(() => Math.random() - 0.5));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleGuess = (guess: string) => {
    if (guess === missingWord) {
      setFeedback(true);
      setTimeout(onComplete, 1500);
    } else {
      setFeedback(false);
      setTimeout(() => {
        setFeedback(null);
        startNewRound();
      }, 1000);
    }
  };

  return (
    <div className="text-center p-4">
      <h3 className="text-2xl font-bold text-indigo-600 mb-6">Memory Master 🧠</h3>
      <img src={POKEMON_ARTWORK(143)} alt="Snorlax" className="w-24 mx-auto mb-6" />

      {gameState === 'memorize' ? (
        <>
          <div className="text-4xl font-bold text-red-500 mb-8 animate-pulse">Memorize! Time: {timer}s</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {subset.map((word, idx) => (
              <div key={idx} className="bg-white border-4 border-indigo-100 p-4 rounded-2xl font-bold text-xl shadow-sm">
                {word}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-3xl font-bold text-indigo-800 mb-8">One word is missing! Which one?</div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleGuess(opt)}
                className={`py-6 px-4 rounded-2xl text-xl font-bold border-4 transition-all ${
                  feedback === true && opt === missingWord ? 'bg-green-500 border-green-600 text-white' :
                  feedback === false ? 'bg-white border-red-200' : 'bg-white border-indigo-200 hover:border-indigo-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback === false && <div className="mt-4 text-red-500 font-bold">Wrong! Restarting...</div>}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
