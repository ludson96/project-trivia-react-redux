import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resettingScore } from '../redux/actions';
import TriviaBackground from '../Components/TriviaBackground';
import TriviaLogo from '../Components/TriviaLogo';
import { RankingEntry } from '../types';
import { Home, Trophy, Star, Trash2 } from 'lucide-react';

export const Ranking: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let rankingDB: RankingEntry[] = [];
  try {
    const stored = localStorage.getItem('ranking');
    if (stored) {
      rankingDB = JSON.parse(stored);
    }
  } catch {
    rankingDB = [];
  }

  const handleClickHome = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(resettingScore());
    history.push('/');
  };

  const handleClearRanking = () => {
    if (window.confirm('Deseja realmente limpar o histórico de ranking?')) {
      localStorage.removeItem('ranking');
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between pb-8 overflow-hidden">
      <TriviaBackground />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-md px-4 my-auto flex flex-col items-center">
        {/* Floating Logo intersecting card top */}
        <div className="z-20 -mb-16">
          <TriviaLogo size="sm" />
        </div>

        {/* White Card matching Figma */}
        <div className="w-full bg-white rounded-2xl pt-20 pb-8 px-6 shadow-2xl border border-white/60 flex flex-col items-center">
          <div data-testid="ranking-title" className="text-center mb-6">
            <h1 className="text-2xl font-black text-trivia-purple uppercase tracking-wider flex items-center justify-center space-x-2">
              <Trophy className="w-6 h-6 text-trivia-yellow" />
              <span>RANKING</span>
            </h1>
          </div>

          {/* Leaderboard List */}
          <div className="w-full max-h-[320px] overflow-y-auto pr-1 space-y-2.5 mb-6">
            {rankingDB.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm font-medium">
                Ranking vazio ...
              </div>
            ) : (
              rankingDB.map((entry, index) => {
                const isTop3 = index < 3;
                const medalColors = ['#F9BA18', '#94A3B8', '#CD7F32'];

                return (
                  <div
                    key={`${entry.name}-${index}`}
                    className="w-full bg-[#EBEBEB] rounded-full p-2 pr-5 flex items-center justify-between transition-all duration-200 hover:bg-slate-200"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={entry.picture || 'https://www.gravatar.com/avatar/?d=identicon'}
                        alt={`Avatar de ${entry.name}`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span
                          data-testid={`player-name-${index}`}
                          className="text-sm font-bold text-slate-800 leading-tight truncate max-w-[140px]"
                        >
                          {entry.name}
                        </span>
                        {entry.date && (
                          <span className="text-[10px] text-slate-500 font-medium">
                            {entry.date}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                      <Star
                        className="w-3.5 h-3.5 fill-current"
                        style={{ color: isTop3 ? medalColors[index] : '#94A3B8' }}
                      />
                      <span
                        data-testid={`player-score-${index}`}
                        className="text-xs font-black text-slate-800 tracking-wider"
                      >
                        {entry.score} pts
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col space-y-2.5">
            <button
              data-testid="btn-go-home"
              type="button"
              onClick={handleClickHome}
              className="w-full py-3.5 px-6 rounded-full font-bold text-white text-sm uppercase tracking-wider bg-trivia-green hover:bg-[#28b07e] shadow-md hover:shadow-glow-green active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>INÍCIO</span>
            </button>

            {rankingDB.length > 0 && (
              <button
                type="button"
                onClick={handleClearRanking}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors flex items-center justify-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Ranking</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <div className="h-6" />
    </div>
  );
};

export default Ranking;
