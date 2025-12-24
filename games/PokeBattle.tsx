
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface PokeBattleProps {
  onComplete: () => void;
}

const PokeBattle: React.FC<PokeBattleProps> = ({ onComplete }) => {
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const [idx, setIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);

  const target = VOCABULARY[idx].portuguese;

  const handleAttack = () => {
    if (userInput.toLowerCase().trim() === target.toLowerCase()) {
      setIsAttacking(true);
      setEnemyHP(prev => Math.max(0, prev - 25));
      setTimeout(() => {
        setIsAttacking(false);
        setUserInput("");
        if (idx + 1 < VOCABULARY.length) {
          setIdx(idx + 1);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setPlayerHP(prev => Math.max(0, prev - 10));
      setUserInput("");
    }
  };

  return (
    <div className="text-center bg-slate-100 rounded-3xl p-8 border-4 border-slate-300">
      <div className="flex justify-between items-center mb-12">
        <div className="w-1/3 text-left">
          <div className="font-bold">Charizard (You)</div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mt-1 border border-slate-400">
            <div 
              className={`h-full transition-all duration-500 ${playerHP > 50 ? 'bg-green-500' : playerHP > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${playerHP}%` }}
            />
          </div>
          <img src={POKEMON_ARTWORK(6)} alt="Me" className={`w-32 mt-4 transform -scale-x-100 ${isAttacking ? 'translate-x-10' : ''} transition-transform`} />
        </div>

        <div className="text-4xl font-black text-red-500 animate-pulse">VS</div>

        <div className="w-1/3 text-right">
          <div className="font-bold">Mewtwo (Enemy)</div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mt-1 border border-slate-400">
            <div 
              className={`h-full transition-all duration-500 ${enemyHP > 50 ? 'bg-green-500' : enemyHP > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${enemyHP}%` }}
            />
          </div>
          <img src={POKEMON_ARTWORK(150)} alt="Enemy" className={`w-32 mt-4 ${isAttacking ? 'opacity-50' : ''} transition-opacity`} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-inner mb-8">
        <h4 className="text-2xl font-bold text-slate-600 mb-4">Spell the Portuguese word for: <span className="text-blue-500 font-black">{VOCABULARY[idx].chinese} {VOCABULARY[idx].emoji}</span></h4>
        <input 
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAttack()}
          placeholder="Type here..."
          className="text-center text-2xl font-bold py-4 px-6 border-4 border-red-400 rounded-2xl focus:outline-none focus:ring-4 ring-red-100 uppercase"
        />
        <div className="mt-4">
          <button 
            onClick={handleAttack}
            className="bg-red-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-red-600 transition-colors"
          >
            ATTACK! 💥
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokeBattle;
