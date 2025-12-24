
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

interface WordSearchProps {
  onComplete: () => void;
}

const WordSearch: React.FC<WordSearchProps> = ({ onComplete }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{r: number, c: number}[]>([]);
  const targetWords = ["Natal", "Rena", "Estrela", "Presente"];

  useEffect(() => {
    // Basic 10x10 grid generation
    const size = 10;
    const newGrid = Array(size).fill(0).map(() => 
      Array(size).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );

    // Place words horizontally or vertically (simplified)
    targetWords.forEach((word, wordIdx) => {
      const isHorizontal = Math.random() > 0.5;
      const r = Math.floor(Math.random() * (isHorizontal ? size : size - word.length));
      const c = Math.floor(Math.random() * (isHorizontal ? size - word.length : size));
      
      for (let i = 0; i < word.length; i++) {
        if (isHorizontal) newGrid[r][c + i] = word[i].toUpperCase();
        else newGrid[r + i][c] = word[i].toUpperCase();
      }
    });

    setGrid(newGrid);
  }, []);

  const handleCellClick = (r: number, c: number) => {
    const newSelection = [...selectedCells, {r, c}];
    if (newSelection.length === 2) {
      // Check word
      const s = newSelection[0];
      const e = newSelection[1];
      let found = "";
      
      if (s.r === e.r) { // Horizontal
        const startC = Math.min(s.c, e.c);
        const endC = Math.max(s.c, e.c);
        for(let i=startC; i<=endC; i++) found += grid[s.r][i];
      } else if (s.c === e.c) { // Vertical
        const startR = Math.min(s.r, e.r);
        const endR = Math.max(s.r, e.r);
        for(let i=startR; i<=endR; i++) found += grid[i][s.c];
      }

      const match = targetWords.find(w => w.toUpperCase() === found || w.toUpperCase() === found.split('').reverse().join(''));
      if (match && !foundWords.includes(match)) {
        setFoundWords([...foundWords, match]);
        if (foundWords.length + 1 === targetWords.length) {
          setTimeout(onComplete, 1000);
        }
      }
      setSelectedCells([]);
    } else {
      setSelectedCells(newSelection);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-pink-600 mb-6">Word Search 🧩</h3>
      <div className="flex gap-8 justify-center mb-8">
        <div className="grid grid-cols-10 gap-1 border-4 border-pink-100 p-2 bg-white rounded-xl">
          {grid.map((row, rIdx) => row.map((char, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              onClick={() => handleCellClick(rIdx, cIdx)}
              className={`w-8 h-8 flex items-center justify-center font-bold rounded-md transition-colors ${
                selectedCells.some(cell => cell.r === rIdx && cell.c === cIdx) ? 'bg-pink-500 text-white' : 'hover:bg-pink-50'
              }`}
            >
              {char}
            </button>
          )))}
        </div>
        <div className="text-left space-y-2">
          <img src={POKEMON_ARTWORK(39)} alt="Jigglypuff" className="w-20 mx-auto mb-4" />
          <h4 className="font-bold text-slate-500">Find these:</h4>
          {targetWords.map(w => (
            <div key={w} className={`text-xl font-bold ${foundWords.includes(w) ? 'text-green-500 line-through opacity-50' : 'text-slate-800'}`}>
              {w}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
