
import React from 'react';

interface TreehouseProps {
  furniture: string[];
  onBack: () => void;
}

const Treehouse: React.FC<TreehouseProps> = ({ furniture, onBack }) => {
  return (
    <div className="bg-emerald-100 rounded-3xl p-8 min-h-[500px] shadow-inner relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="grid grid-cols-4 gap-8 p-12">
            {[...Array(16)].map((_, i) => <div key={i} className="text-8xl">🌳</div>)}
         </div>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold text-emerald-800 mb-8 flex items-center justify-center gap-4">
          🌳 My Pokémon Treehouse 🌳
        </h2>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-8 border-emerald-500 p-8 min-h-[300px]">
          {furniture.length === 0 ? (
            <div className="py-20 text-emerald-600 text-xl font-bold italic">
              Play games to win furniture for your house! 🧸
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
              {furniture.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl shadow-lg p-6 text-6xl flex items-center justify-center border-4 border-yellow-200 animate-bounce"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={onBack}
          className="mt-8 bg-emerald-600 text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-colors"
        >
          Back to Adventure
        </button>
      </div>
    </div>
  );
};

export default Treehouse;
