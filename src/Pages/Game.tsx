import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Header from '../Components/Header';
import AnswerButtons from '../Components/AnswerButtons';
import TriviaBackground from '../Components/TriviaBackground';
import TriviaLogo from '../Components/TriviaLogo';
import { ArrowRight, Loader2 } from 'lucide-react';

interface AnswerOption {
  text: string;
  isCorrect: boolean;
  dataTesting: string;
}

export const Game: React.FC = () => {
  const history = useHistory();

  const { results } = useSelector((state: RootState) => state.player);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Redireciona para home caso o token esteja inválido (response_code 3 da API OpenTDB)
  useEffect(() => {
    if (results && results.response_code === 3) {
      history.push('/');
    }
  }, [results, history]);

  // Cronômetro regressivo de 30 segundos
  useEffect(() => {
    if (answered) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDisabled(true);
          setAnswered(true); // Exibe alternativas corretas ao esgotar o tempo
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, questionIndex]);

  const currentQuestion = results?.results?.[questionIndex];

  // Gera e embaralha as alternativas de forma estável para cada pergunta
  const shuffledAnswers = useMemo<AnswerOption[]>(() => {
    if (!currentQuestion) return [];

    const options: AnswerOption[] = [
      {
        text: currentQuestion.correct_answer,
        isCorrect: true,
        dataTesting: 'correct-answer',
      },
      ...currentQuestion.incorrect_answers.map((ans, idx) => ({
        text: ans,
        isCorrect: false,
        dataTesting: `wrong-answer-${idx}`,
      })),
    ];

    // Algoritmo Fisher-Yates
    for (let i = options.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
  }, [currentQuestion]);

  const handleAnswerSelected = (isCorrect: boolean) => {
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    const totalQuestions = results?.results?.length || 5;
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((prev) => prev + 1);
      setSeconds(30);
      setAnswered(false);
      setDisabled(false);
    } else {
      history.push('/feedback');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <TriviaBackground />
        <div className="z-10 flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-trivia-green" />
          <p className="text-sm font-medium">Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = results?.results?.length || 5;
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between pb-8 overflow-hidden">
      <TriviaBackground />

      {/* Header com Dados do Jogador */}
      <Header />

      {/* Game Content Area */}
      <main className="relative z-10 w-full max-w-5xl px-4 my-auto flex flex-col items-center">
        {/* Logo Superior Central */}
        <div className="mb-6 scale-90 md:scale-100">
          <TriviaLogo size="sm" />
        </div>

        {/* Barra de Progresso das Perguntas */}
        <div className="w-full max-w-xl bg-white/20 h-2 rounded-full overflow-hidden mb-6">
          <div
            className="bg-trivia-green h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Pergunta e Alternativas */}
        <div className="w-full">
          <AnswerButtons
            currentQuestion={currentQuestion}
            shuffledAnswers={shuffledAnswers}
            answered={answered}
            onAnswerSelected={handleAnswerSelected}
            disabled={disabled}
            seconds={seconds}
          />
        </div>

        {/* Botão de Próxima Pergunta - Espaço reservado com altura fixa para não deslocar os cards e com animação fluida */}
        <div className="w-full flex justify-end mt-4 h-14 items-center">
          {answered ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={handleNextQuestion}
              className="w-full md:w-auto min-w-[200px] py-3.5 px-8 rounded-full font-bold text-white text-sm uppercase tracking-wider bg-trivia-green hover:bg-[#28b07e] shadow-lg hover:shadow-glow-green active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 animate-pop-in"
            >
              <span>{questionIndex + 1 === totalQuestions ? 'FINALIZAR' : 'PRÓXIMA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden md:block h-14" aria-hidden="true" />
          )}
        </div>
      </main>



      {/* Indicador de Pergunta atual */}
      <footer className="relative z-10 text-xs text-white/50 font-medium">
        Pergunta {questionIndex + 1} de {totalQuestions}
      </footer>
    </div>
  );
};

export default Game;
