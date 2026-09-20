import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import Header from './Header';
import { resettingScore } from '../redux/actions';
import TriviaBackground from './TriviaBackground';
import { RankingEntry } from '../types';
import { RotateCcw, Award } from 'lucide-react';

export const Feedback: React.FC<{ assertions?: number }> = ({ assertions: propAssertions }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { score, imagem, name, assertions: stateAssertions } = useSelector(
    (state: RootState) => state.player
  );

  const finalAssertions = propAssertions !== undefined ? propAssertions : stateAssertions;

  // Atualiza e persiste o ranking no LocalStorage ao finalizar o jogo
  useEffect(() => {
    if (!name) return;

    let rankingDB: RankingEntry[] = [];
    try {
      const stored = localStorage.getItem('ranking');
      if (stored) {
        rankingDB = JSON.parse(stored);
      }
    } catch {
      rankingDB = [];
    }

    const newEntry: RankingEntry = {
      name,
      score,
      picture: imagem,
      date: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [...rankingDB, newEntry];
    updated.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(updated));
  }, [score, imagem, name]);

  const isWellDone = finalAssertions >= 3;
  const feedbackMessage = isWellDone ? 'Well Done!' : 'Could be better...';
  const localizedTitle = isWellDone ? 'MANDOU BEM!' : 'PODIA SER MELHOR...';

  const handleClickHome = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(resettingScore());
    history.push('/');
  };

  const handleClickRanking = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push('/ranking');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between pb-8 overflow-hidden">
      <TriviaBackground />

      <Header />

      <main className="relative z-10 w-full max-w-md px-4 my-auto flex flex-col items-center">
        {/* Card de Feedback com o Avatar destacado no topo como no Figma */}
        <div className="relative w-full bg-white rounded-2xl pt-16 pb-8 px-8 shadow-2xl border border-white/60 flex flex-col items-center text-center mt-12">
          {/* Avatar com Borda Colorida Flutuando no topo do Card */}
          <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-trivia-green shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <img
              src={imagem || 'https://www.gravatar.com/avatar/?d=identicon'}
              alt={`Avatar de ${name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Título de Desempenho do Figma */}
          <h1 className="text-2xl font-black text-trivia-purple uppercase tracking-wider mt-2 mb-1">
            {localizedTitle}
          </h1>

          {/* Test ID compatível: data-testid="feedback-text" */}
          <p
            data-testid="feedback-text"
            className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6"
          >
            {feedbackMessage}
          </p>

          {/* Painel de Pontuação e Acertos */}
          <div className="w-full grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Pontos Totais</span>
              <span
                data-testid="feedback-total-score"
                className="text-2xl font-black text-trivia-purple mt-0.5"
              >
                {score !== undefined && !Number.isNaN(score) ? score : 0}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Acertos</span>
              <span
                data-testid="feedback-total-question"
                className="text-2xl font-black text-trivia-green mt-0.5"
              >
                {finalAssertions !== undefined && !Number.isNaN(finalAssertions) ? finalAssertions : 0}
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="w-full flex flex-col space-y-3">
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={handleClickHome}
              className="w-full py-3.5 px-6 rounded-full font-bold text-white text-sm uppercase tracking-wider bg-trivia-green hover:bg-[#28b07e] shadow-md hover:shadow-glow-green active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>JOGAR NOVAMENTE</span>
            </button>

            <button
              data-testid="btn-ranking"
              type="button"
              onClick={handleClickRanking}
              className="w-full py-3 px-6 rounded-full font-semibold text-slate-700 hover:text-trivia-purple text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-200 hover:border-trivia-purple/30 hover:bg-slate-50"
            >
              <Award className="w-4 h-4 text-trivia-yellow" />
              <span>VER RANKING</span>
            </button>
          </div>
        </div>
      </main>

      <div className="h-6" />
    </div>
  );
};

export default Feedback;
