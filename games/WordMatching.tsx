
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface WordMatchingProps {
  onComplete: () => void;
}

const WordMatching: React.FC<WordMatchingProps> = ({ onComplete }) => {
  const [items, setItems] = useState<{port: string[], chin: string[]}>({ port: [], chin: [] });
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [selectedChin, setSelectedChin] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [setIndex, setSetIndex] = useState(0);

  useEffect(() => {
    loadSet(0);
  }, []);

  const loadSet = (idx: number) => {
    const subset = VOCABULARY.slice(idx * 5, (idx + 1) * 5);
    setItems({
      port: subset.map(w => w.portuguese).sort(() => Math.random() - 0.5),
      chin: subset.map(w => w.chinese).sort(() => Math.random() - 0.5)
    });
    setMatches([]);
    setSelectedPort(null);
    setSelectedChin(null);
  };

  const handleMatch = (p: string, c: string) => {
    const word = VOCABULARY.find(w => w.portuguese === p && w.chinese === c);
    if (word) {
      setMatches([...matches, p]);
      setSelectedPort(null);
      setSelectedChin(null);
      if (matches.length + 1 === 5) {
        if (setIndex === 0) {
          setTimeout(() => {
            setSetIndex(1);
            loadSet(1);
          }, 1000);
        } else {
          setTimeout(onComplete, 1000);
        }
      }
    } else {
      setSelectedPort(null);
      setSelectedChin(null);
    }
  };

  useEffect(() => {
    if (selectedPort && selectedChin) {
      handleMatch(selectedPort, selectedChin);
    }
  }, [selectedPort, selectedChin]);

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-green-600 mb-6">Word Matcher 🔗</h3>
      <img src={POKEMON_ARTWORK(1)} alt="Bulbasaur" className="w-24 mx-auto mb-8" />
      
      <div className="grid grid-cols-2 gap-12 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          {items.port.map(p => (
            <button
              key={p}
              disabled={matches.includes(p)}
              onClick={() => setSelectedPort(p)}
              className={`w-full py-4 px-4 rounded-xl text-xl font-bold border-4 transition-all ${
                matches.includes(p) ? 'bg-green-100 border-green-500 text-green-800' :
                selectedPort === p ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {items.chin.map(c => (
            <button
              key={c}
              disabled={matches.some(p => VOCABULARY.find(w => w.portuguese === p)?.chinese === c)}
              onClick={() => setSelectedChin(c)}
              className={`w-full py-4 px-4 rounded-xl text-xl font-bold border-4 transition-all ${
                matches.some(p => VOCABULARY.find(w => w.portuguese === p)?.chinese === c) ? 'bg-green-100 border-green-500 text-green-800' :
                selectedChin === c ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordMatching;
