import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScore, counter } from '../redux/actions';
import { Question } from '../types';
import decodeHtml from '../utils/decodeHtml';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface AnswerOption {
  text: string;
  isCorrect: boolean;
  dataTesting: string;
}

interface AnswerButtonsProps {
  currentQuestion: Question;
  shuffledAnswers: AnswerOption[];
  answered: boolean;
  onAnswerSelected: (isCorrect: boolean) => void;
  disabled: boolean;
  seconds: number;
}

// Mapeamento de cores vibrantes e temáticas exclusivas para cada categoria
const getCategoryColor = (category: string): string => {
  const cat = category.toLowerCase();

  if (cat.includes('politic')) {
    return 'bg-[#F9BA18]'; // Amarelo (Figma clássico)
  }
  if (cat.includes('entertain') || cat.includes('film') || cat.includes('movie') || cat.includes('music') || cat.includes('television') || cat.includes('theatre') || cat.includes('comic') || cat.includes('anime') || cat.includes('cartoon') || cat.includes('video game') || cat.includes('board game')) {
    return 'bg-[#00D5E2]'; // Azul ciano vibrante
  }
  if (cat.includes('science') || cat.includes('computer') || cat.includes('mathematics') || cat.includes('nature') || cat.includes('gadget')) {
    return 'bg-[#2FC18C]'; // Verde esmeralda
  }
  if (cat.includes('history') || cat.includes('mythology') || cat.includes('celebrity')) {
    return 'bg-[#EA5D5D]'; // Vermelho / Coral
  }
  if (cat.includes('geography')) {
    return 'bg-[#3B82F6]'; // Azul royal
  }
  if (cat.includes('sport')) {
    return 'bg-[#F97316]'; // Laranja dinâmico
  }
  if (cat.includes('art') || cat.includes('book') || cat.includes('animal')) {
    return 'bg-[#8B5CF6]'; // Roxo púrpura
  }
  if (cat.includes('general') || cat.includes('vehicle')) {
    return 'bg-[#EC4899]'; // Rosa chiclete
  }

  return 'bg-[#F9BA18]'; // Fallback amarelo
};

export const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  currentQuestion,
  shuffledAnswers,
  answered,
  onAnswerSelected,
  disabled,
  seconds,
}) => {

  const dispatch = useDispatch();

  const handleSelectOption = (option: AnswerOption) => {
    if (answered || disabled) return;

    onAnswerSelected(option.isCorrect);

    if (option.isCorrect) {
      const difficultyMultiplier: Record<string, number> = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const multiplier = difficultyMultiplier[currentQuestion.difficulty] || 1;
      const pointsEarned = 10 + seconds * multiplier;

      dispatch(changeScore(pointsEarned));
      dispatch(counter(1)); // Incrementa o total de assertions
    } else {
      dispatch(changeScore(0));
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">
      {/* Coluna Esquerda: Card com Categoria flutuante no topo, Pergunta centralizada e Timer inferior (Design exato do Figma) */}
      <div className="flex-1 relative flex flex-col items-center">
        {/* Badge de Tema / Categoria - Cor dinâmica por tema com tipografia padrão Poppins */}
        <div className={`z-20 -mb-6 w-[90%] max-w-[413px] h-[45px] ${getCategoryColor(currentQuestion.category)} shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full flex items-center justify-center px-6 transition-colors duration-300`}>
          <span
            data-testid="question-category"
            className="font-semibold text-lg text-white uppercase text-center tracking-wider truncate"
          >
            {decodeHtml(currentQuestion.category)}
          </span>
        </div>



        {/* Card Branco da Pergunta */}
        <div className="w-full bg-white rounded-2xl pt-12 pb-6 px-8 shadow-xl border border-white/60 flex flex-col justify-between items-center text-center min-h-[320px]">
          {/* Texto da Pergunta Centralizado */}
          <div className="my-auto flex items-center justify-center py-4">
            <h2
              data-testid="question-text"
              className="text-base md:text-lg font-medium text-slate-800 leading-relaxed max-w-md text-center"
            >
              {decodeHtml(currentQuestion.question)}
            </h2>
          </div>

          {/* Timer inferior no Card centralizado com ícone e cor vermelha/estilizada */}
          <div className="w-full pt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-[#EA5D5D] font-bold text-base tracking-wide">
              <Clock className="w-5 h-5" />
              <span>Tempo: {seconds}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Direita: Alternativas Pílula A, B, C, D */}
      <div
        data-testid="answer-options"
        className="flex-1 flex flex-col justify-center space-y-3"
      >
        {shuffledAnswers.map((option, idx) => {
          let btnStyle =
            'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 shadow-sm';
          let borderClass = '';

          if (answered) {
            if (option.isCorrect) {
              btnStyle = 'bg-emerald-50 text-emerald-800 border-2 border-trivia-green shadow-glow-green scale-[1.01]';
              borderClass = 'green-border';
            } else {
              btnStyle = 'bg-rose-50 text-rose-800 border-2 border-trivia-red shadow-glow-red opacity-80';
              borderClass = 'red-border';
            }
          }

          return (
            <button
              key={`${option.text}-${idx}`}
              type="button"
              data-testid={option.dataTesting}
              name={currentQuestion.difficulty}
              disabled={disabled || answered}
              onClick={() => handleSelectOption(option)}
              className={`w-full py-3.5 px-5 rounded-full text-left font-medium text-sm flex items-center justify-between transition-all duration-300 active:scale-[0.99] disabled:cursor-default box-border ${btnStyle} ${borderClass}`}
            >
              <div className="flex items-center space-x-3.5 pr-2 pointer-events-none truncate">
                <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                  {optionLetters[idx] || idx + 1}
                </span>
                <span className="truncate">{decodeHtml(option.text)}</span>
              </div>

              <div className="shrink-0 ml-2 w-5 h-5 flex items-center justify-center">
                {answered && (
                  <div className="animate-pop-in">
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-trivia-green" />
                    ) : (
                      <XCircle className="w-5 h-5 text-trivia-red" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default AnswerButtons;
