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
      {/* Coluna Esquerda: Card com Categoria, Pergunta e Timer (Design do Figma) */}
      <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl border border-white/60 flex flex-col justify-between min-h-[320px]">
        <div>
          {/* Badge de Categoria */}
          <div className="inline-block bg-[#00D5E2]/15 text-[#00929B] font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <span data-testid="question-category">{decodeHtml(currentQuestion.category)}</span>
          </div>

          {/* Texto da Pergunta */}
          <h2
            data-testid="question-text"
            className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed"
          >
            {decodeHtml(currentQuestion.question)}
          </h2>
        </div>

        {/* Dificuldade & Timer inferior no Card */}
        <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="capitalize">
            Dificuldade: <strong className="text-slate-700">{currentQuestion.difficulty}</strong>
          </span>
          <div className="flex items-center space-x-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold">
            <Clock className="w-3.5 h-3.5 text-trivia-purple" />
            <span>Tempo: {seconds}s</span>
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
            'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm';
          let borderClass = '';

          if (answered) {
            if (option.isCorrect) {
              btnStyle = 'bg-emerald-50 text-emerald-800 border-2 border-trivia-green shadow-glow-green';
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
              className={`w-full py-3.5 px-5 rounded-full text-left font-medium text-sm flex items-center justify-between transition-all duration-200 active:scale-[0.99] disabled:cursor-default ${btnStyle} ${borderClass}`}
            >
              <div className="flex items-center space-x-3.5 pr-2 pointer-events-none">
                <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                  {optionLetters[idx] || idx + 1}
                </span>
                {decodeHtml(option.text)}
              </div>

              {answered && (
                <div className="shrink-0 ml-2">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-trivia-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-trivia-red" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerButtons;
