
import React, { useState, useMemo } from 'react';
import { VOCABULARY, GAMES, FURNITURE_LIST, POKEMON_ARTWORK } from './constants';
import { GameStatus } from './types';

// Game Components
import EmojiDetective from './games/EmojiDetective';
import WordMatching from './games/WordMatching';
import SpellingBee from './games/SpellingBee';
import SentenceFill from './games/SentenceFill';
import BubblePop from './games/BubblePop';
import WordSearch from './games/WordSearch';
import PokeBattle from './games/PokeBattle';
import RainGame from './games/RainGame';
import MemoryGame from './games/MemoryGame';
import Treehouse from './components/Treehouse';

const Snowfall = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
      fontSize: `${10 + Math.random() * 20}px`,
      char: ['❄️', '❅', '❆'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {snowflakes.map((s) => (
        <span
          key={s.id}
          className="snowflake"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
            fontSize: s.fontSize,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'review' | 'hub' | 'game' | 'treehouse'>('welcome');
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [furniture, setFurniture] = useState<string[]>([]);

  const handleGameComplete = (id: string) => {
    if (!completedGames.includes(id)) {
      setCompletedGames([...completedGames, id]);
      // Reward 2 furniture items
      const newItems = FURNITURE_LIST.filter(item => !furniture.includes(item)).slice(0, 2);
      setFurniture([...furniture, ...newItems]);
    }
    setView('hub');
  };

  const renderGame = () => {
    switch (currentGameId) {
      case 'detective': return <EmojiDetective onComplete={() => handleGameComplete('detective')} />;
      case 'matching': return <WordMatching onComplete={() => handleGameComplete('matching')} />;
      case 'spelling': return <SpellingBee onComplete={() => handleGameComplete('spelling')} />;
      case 'fill': return <SentenceFill onComplete={() => handleGameComplete('fill')} />;
      case 'bubble': return <BubblePop onComplete={() => handleGameComplete('bubble')} />;
      case 'search': return <WordSearch onComplete={() => handleGameComplete('search')} />;
      case 'battle': return <PokeBattle onComplete={() => handleGameComplete('battle')} />;
      case 'rain': return <RainGame onComplete={() => handleGameComplete('rain')} />;
      case 'memory': return <MemoryGame onComplete={() => handleGameComplete('memory')} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-slate-800 p-4 md:p-8 select-none">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 relative z-20">
        <h1 className="text-3xl font-bold text-red-500 drop-shadow-sm flex items-center gap-2">
          🎄 PokéWord Adventure 🎄
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setView('hub')}
            className="px-4 py-2 bg-white border-2 border-red-200 rounded-full shadow hover:bg-red-50 transition-colors"
          >
            🏠 Home
          </button>
          <button 
            onClick={() => setView('treehouse')}
            className="px-4 py-2 bg-yellow-400 text-white rounded-full shadow hover:bg-yellow-500 transition-colors flex items-center gap-2"
          >
            🌳 Treehouse ({furniture.length})
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {view === 'welcome' && (
          <div className="text-center py-12 bg-white rounded-3xl shadow-xl border-4 border-white p-8">
            <img src={POKEMON_ARTWORK(25)} alt="Pikachu" className="w-48 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4 text-green-600">Merry Christmas!</h2>
            <p className="text-xl mb-8">Ready to learn some festive Portuguese words?</p>
            <button 
              onClick={() => setView('review')}
              className="bg-red-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              START ADVENTURE! 🚀
            </button>
          </div>
        )}

        {view === 'review' && (
          <div className="relative overflow-hidden bg-gradient-to-b from-blue-100 to-blue-50 rounded-3xl shadow-2xl p-8 border-4 border-white min-h-[600px]">
            <Snowfall />
            <div className="relative z-20">
              <div className="flex justify-center items-center gap-4 mb-8">
                <span className="text-4xl animate-bounce">⛄</span>
                <h2 className="text-4xl font-black text-blue-800 drop-shadow-sm">
                  Winter Word List
                </h2>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌨️</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {VOCABULARY.map((word, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-blue-200 shadow-sm hover:bg-white/90 transition-colors">
                    <span className="text-5xl drop-shadow-md">{word.emoji}</span>
                    <div>
                      <div className="text-2xl font-black text-red-600">{word.portuguese}</div>
                      <div className="text-xl font-bold text-blue-900">{word.chinese}</div>
                      <div className="text-sm text-blue-500 font-semibold">{word.pinyin}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setView('hub')}
                  className="bg-green-600 text-white text-2xl font-black py-5 px-16 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-4 border-white"
                >
                  LET'S PLAY! 🎮
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'hub' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setCurrentGameId(game.id);
                  setView('game');
                }}
                className={`relative p-6 rounded-3xl border-4 bg-white transition-all transform hover:-translate-y-2 ${
                  completedGames.includes(game.id) ? 'border-green-400' : 'border-slate-200'
                }`}
              >
                {completedGames.includes(game.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full text-xs">✅</div>
                )}
                <img src={POKEMON_ARTWORK(game.pokemonId)} alt={game.title} className="w-24 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm text-slate-500">{game.description}</p>
                <div className="mt-4 text-3xl">{game.emoji}</div>
              </button>
            ))}
          </div>
        )}

        {view === 'game' && (
          <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 min-h-[600px] relative">
            <button 
              onClick={() => setView('hub')}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-50"
            >
              ✕ Exit
            </button>
            {renderGame()}
          </div>
        )}

        {view === 'treehouse' && (
          <Treehouse furniture={furniture} onBack={() => setView('hub')} />
        )}
      </main>
    </div>
  );
};

export default App;
