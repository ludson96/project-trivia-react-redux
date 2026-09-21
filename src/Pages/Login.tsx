import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getName, getEmail, fetchApi, fetchApiResult } from '../redux/actions';
import TriviaLogo from '../Components/TriviaLogo';
import TriviaBackground from '../Components/TriviaBackground';
import { User, Mail, Settings, Play, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);
  const isValidName = (val: string) => val.trim().length >= 4;

  const isBtnDisabled = !(isValidName(name) && isValidEmail(email));

  const handleClickSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isBtnDisabled) return;

    setIsLoading(true);
    dispatch(getName(name.trim()));
    dispatch(getEmail(email.trim()));

    try {
      await (dispatch as any)(fetchApi());
      const token = localStorage.getItem('token') || '';
      await (dispatch as any)(fetchApiResult(token));
      history.push('/game');
    } catch (err) {
      console.error(err);
      history.push('/game');
    }
  };

  const handleClickConfig = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push('/config');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <TriviaBackground />

      {/* Main Login Card - Exactly matches Figma layout */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Floating Logo intersecting card top */}
        <div className="z-20 -mb-16">
          <TriviaLogo size="md" />
        </div>

        {/* White Card */}
        <div className="w-full bg-white rounded-2xl pt-20 pb-8 px-8 shadow-2xl border border-white/50 backdrop-blur-sm">
          <form onSubmit={handleClickSubmit} className="flex flex-col space-y-4">
            {/* Input Name */}
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                data-testid="input-player-name"
                name="name"
                id="name"
                value={name}
                placeholder="Qual é o seu nome?"
                onChange={({ target }) => setName(target.value)}
                required
                className="w-full bg-[#EBEBEB] text-slate-800 placeholder-gray-400 text-sm font-medium rounded-full py-3.5 pl-12 pr-4 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-trivia-purple/40 border border-transparent focus:border-trivia-purple"
              />
            </div>

            {/* Input Email */}
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                data-testid="input-gravatar-email"
                name="email"
                id="email"
                value={email}
                placeholder="Qual é o seu e-mail do Gravatar?"
                onChange={({ target }) => setEmail(target.value)}
                required
                className="w-full bg-[#EBEBEB] text-slate-800 placeholder-gray-400 text-sm font-medium rounded-full py-3.5 pl-12 pr-4 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-trivia-purple/40 border border-transparent focus:border-trivia-purple"
              />
            </div>

            {/* Play Button - Neon Green Pill */}
            <button
              type="submit"
              data-testid="btn-play"
              disabled={isBtnDisabled}
              className={`w-full py-3.5 px-6 rounded-full font-bold text-white text-base tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 mt-2 ${
                isBtnDisabled
                  ? 'bg-slate-300 cursor-not-allowed opacity-60 shadow-none'
                  : 'bg-trivia-green hover:bg-[#28b07e] hover:shadow-glow-green active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>CARREGANDO...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>JOGAR</span>
                </>
              )}
            </button>

            {/* Settings Button */}
            <button
              type="button"
              data-testid="btn-settings"
              onClick={handleClickConfig}
              className="w-full py-3 px-6 rounded-full font-semibold text-slate-600 hover:text-trivia-purple text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-200 hover:border-trivia-purple/30 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4" />
              <span>CONFIGURAÇÕES</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
