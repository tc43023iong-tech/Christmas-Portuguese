
import React, { useState, useEffect, useRef } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface Drop {
  id: number;
  word: string;
  x: number;
  y: number;
  speed: number;
}

const RainGame: React.FC<{onComplete: () => void}> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [score, setScore] = useState(0);
  const dropCounter = useRef(0);

  const targetWord = VOCABULARY[idx];

  useEffect(() => {
    const interval = setInterval(() => {
      const isTarget = Math.random() > 0.6;
      const word = isTarget ? targetWord.portuguese : VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)].portuguese;
      
      const newDrop: Drop = {
        id: dropCounter.current++,
        word,
        x: Math.random() * 80 + 10,
        y: -10,
        speed: Math.random() * 1 + 1,
      };
      setDrops(prev => [...prev, newDrop]);
    }, 1500);

    return () => clearInterval(interval);
  }, [idx]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setDrops(prev => prev.map(d => ({ ...d, y: d.y + d.speed })).filter(d => d.y < 110));
    }, 50);
    return () => clearInterval(moveInterval);
  }, []);

  const handleClick = (drop: Drop) => {
    if (drop.word === targetWord.portuguese) {
      setDrops(prev => prev.filter(d => d.id !== drop.id));
      setScore(s => s + 1);
      if (score + 1 >= 3) { // Need 3 per word to advance
        setScore(0);
        if (idx + 1 < VOCABULARY.length) {
          setIdx(idx + 1);
        } else {
          onComplete();
        }
      }
    }
  };

  return (
    <div className="relative min-h-[600px] bg-blue-100 rounded-3xl overflow-hidden p-8 border-8 border-blue-200">
      {/* Background Rain Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute bg-blue-400 w-1 h-20 animate-pulse" style={{ left: `${i*5}%`, top: `${Math.random()*100}%` }} />
        ))}
      </div>

      <div className="relative z-20 text-center">
        <h3 className="text-3xl font-bold text-blue-800">Rain Catcher 🌧️</h3>
        <div className="mt-4 inline-block bg-white px-8 py-4 rounded-3xl border-4 border-blue-400 shadow-lg">
          <div className="text-sm text-blue-500 uppercase font-bold tracking-widest">Catch the Portuguese for:</div>
          <div className="text-4xl font-black text-blue-700">{targetWord.chinese}</div>
          <div className="text-blue-400 font-bold mt-2">Score: {score}/3</div>
        </div>
      </div>

      <img src={POKEMON_ARTWORK(186)} alt="Politoed" className="absolute bottom-4 left-4 w-32 z-10" />

      {drops.map(drop => (
        <button
          key={drop.id}
          onClick={() => handleClick(drop)}
          style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
          className="absolute transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-xl border-2 border-white text-lg transition-transform hover:scale-125 z-30 flex items-center gap-2"
        >
          <span className="text-blue-200">💧</span> {drop.word}
        </button>
      ))}
    </div>
  );
};

export default RainGame;
