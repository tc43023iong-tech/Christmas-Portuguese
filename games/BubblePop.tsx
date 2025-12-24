
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface BubblePopProps {
  onComplete: () => void;
}

const OCEAN_POKEMON = [131, 134, 158, 183, 194, 222, 226, 258, 320, 363]; // Lapras, Vaporeon, Totodile...

const BubblePop: React.FC<BubblePopProps> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [wonPokemon, setWonPokemon] = useState<number[]>([]);

  useEffect(() => {
    const correct = VOCABULARY[idx].portuguese;
    const others = VOCABULARY.map(v => v.portuguese)
      .filter(p => p !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setOptions([correct, ...others].sort(() => Math.random() - 0.5));
  }, [idx]);

  const handlePop = (opt: string) => {
    if (opt === VOCABULARY[idx].portuguese) {
      setWonPokemon([...wonPokemon, OCEAN_POKEMON[idx]]);
      if (idx + 1 < VOCABULARY.length) {
        setIdx(idx + 1);
      } else {
        setTimeout(onComplete, 1500);
      }
    }
  };

  return (
    <div className="relative min-h-[550px] bg-blue-50 overflow-hidden rounded-3xl p-4">
      {/* Ocean Background Props */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🐢</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse">🐙</div>
      <div className="absolute bottom-1/2 left-4 text-4xl animate-bounce opacity-50">🐠</div>

      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold text-cyan-700">Bubble Pop 🫧</h3>
        <div className="text-4xl font-bold text-cyan-600 mt-4 underline decoration-dotted">
          {VOCABULARY[idx].chinese}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-md mx-auto relative z-10 mt-12">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePop(opt)}
            className="w-24 h-24 rounded-full bg-white/40 border-4 border-white flex items-center justify-center text-center p-2 text-sm font-bold text-cyan-800 shadow-inner hover:bg-cyan-100 hover:scale-110 transition-transform bubble"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-20 border-t-4 border-cyan-200 pt-6">
        <div className="flex justify-center gap-4 flex-wrap">
           {wonPokemon.map((pId, i) => (
             <div key={i} className="relative w-16 h-16 bg-white rounded-full border-2 border-cyan-100 p-1">
               <span className="absolute -top-2 -left-2 text-xl">🐚</span>
               <img src={POKEMON_ARTWORK(pId)} alt="Reward" className="w-full h-full object-contain" />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BubblePop;
