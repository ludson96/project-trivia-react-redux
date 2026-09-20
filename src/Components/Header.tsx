import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { getGravatarUrl } from '../utils/gravatar';
import { getImg } from '../redux/actions';
import { Star } from 'lucide-react';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { name, score, email, imagem } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const avatarUrl = getGravatarUrl(email);
    if (!imagem || imagem !== avatarUrl) {
      dispatch(getImg(avatarUrl));
    }
  }, [email, imagem, dispatch]);

  const currentAvatar = imagem || getGravatarUrl(email);

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between text-white z-10 relative">
      {/* Player info pill */}
      <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
        <img
          data-testid="header-profile-picture"
          src={currentAvatar}
          alt={`Avatar de ${name || 'Player'}`}
          className="w-9 h-9 rounded-full border-2 border-trivia-green object-cover shadow-sm"
        />
        <div className="flex flex-col">
          <span
            data-testid="header-player-name"
            className="text-sm font-semibold tracking-wide text-white"
          >
            {name || 'Jogador'}
          </span>
          <span
            data-testid="input-gravatar-email"
            className="text-[11px] text-slate-300 font-normal truncate max-w-[150px]"
          >
            {email}
          </span>
        </div>
      </div>

      {/* Score and trophy counter */}
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-md">
        <Star className="w-4 h-4 text-trivia-yellow fill-trivia-yellow" />
        <span className="text-xs uppercase tracking-wider text-slate-200 font-medium">Pontos:</span>
        <span
          data-testid="header-score"
          className="text-sm font-bold text-trivia-yellow tracking-wider"
        >
          {score !== undefined && !Number.isNaN(score) ? score : 0}
        </span>
      </div>
    </header>
  );
};

export default Header;
