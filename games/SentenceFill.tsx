
import React, { useState, useEffect } from 'react';
import { VOCABULARY, POKEMON_ARTWORK } from '../constants';

const SENTENCES = [
  { text: "No __________, comemos muitos doces.", answer: "Natal" },
  { text: "O __________ traz presentes para as crianças.", answer: "Pai Natal" },
  { text: "A __________ puxa o trenó do Pai Natal.", answer: "Rena" },
  { text: "O Pai Natal viaja num __________ voador.", answer: "Trenó" },
  { text: "Há uma __________ brilhante no topo da árvore.", answer: "Estrela" },
  { text: "Nós decoramos a __________ com luzes.", answer: "Árvore de Natal" },
  { text: "As __________ brilham durante a noite.", answer: "Luzes de Natal" },
  { text: "Penduramos muitos __________ na árvore.", answer: "Enfeites de Natal" },
  { text: "O __________ é um bolo tradicional de Natal.", answer: "Bolo Rei" },
  { text: "Eu recebi um __________ muito bonito.", answer: "Presente" },
];

interface SentenceFillProps {
  onComplete: () => void;
}

const SentenceFill: React.FC<SentenceFillProps> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  useEffect(() => {
    const correct = SENTENCES[idx].answer;
    const others = VOCABULARY.map(v => v.portuguese)
      .filter(p => p !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions([correct, ...others].sort(() => Math.random() - 0.5));
  }, [idx]);

  const handleSelect = (opt: string) => {
    if (opt === SENTENCES[idx].answer) {
      setFeedback(true);
      setTimeout(() => {
        setFeedback(null);
        if (idx + 1 < SENTENCES.length) setIdx(idx + 1);
        else onComplete();
      }, 1000);
    } else {
      setFeedback(false);
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-blue-600 mb-6">Sentence Fill ✍️</h3>
      <img src={POKEMON_ARTWORK(7)} alt="Squirtle" className="w-24 mx-auto mb-8" />
      
      <div className="bg-slate-50 p-8 rounded-3xl border-4 border-slate-100 mb-12 text-3xl leading-relaxed">
        {SENTENCES[idx].text.split('__________').map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="inline-block min-w-[150px] border-b-4 border-blue-400 px-4 text-blue-600 font-bold">
                {feedback === true ? SENTENCES[idx].answer : "____"}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            disabled={feedback !== null}
            className={`py-4 px-6 rounded-2xl text-xl font-bold border-4 transition-all ${
              feedback === true && opt === SENTENCES[idx].answer ? 'bg-green-500 border-green-600 text-white' :
              feedback === false && opt !== SENTENCES[idx].answer ? 'bg-white border-red-200' :
              'bg-white border-slate-200 hover:border-blue-400'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentenceFill;
