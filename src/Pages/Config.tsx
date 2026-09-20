import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TriviaBackground from '../Components/TriviaBackground';
import TriviaLogo from '../Components/TriviaLogo';
import { getCategories } from '../services/api';
import { Category, GameSettings } from '../types';
import { Settings, Save, ArrowLeft, Loader2 } from 'lucide-react';

export const Config: React.FC = () => {
  const history = useHistory();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lê configurações prévias do LocalStorage
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const stored = localStorage.getItem('trivia_settings');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      category: 'all',
      difficulty: 'all',
      type: 'all',
    };
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Falha ao carregar categorias', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('trivia_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleBack = () => {
    history.push('/');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between pb-8 overflow-hidden">
      <TriviaBackground />

      <main className="relative z-10 w-full max-w-md px-4 my-auto flex flex-col items-center">
        {/* Floating Logo intersecting card top */}
        <div className="z-20 -mb-16">
          <TriviaLogo size="sm" />
        </div>

        {/* White Card matching Figma */}
        <div className="w-full bg-white rounded-2xl pt-20 pb-8 px-8 shadow-2xl border border-white/60 flex flex-col items-center">
          <div data-testid="settings-title" className="text-center mb-6">
            <h1 className="text-2xl font-black text-trivia-purple uppercase tracking-wider flex items-center justify-center space-x-2">
              <Settings className="w-6 h-6 text-trivia-purple" />
              <span>CONFIGURAÇÕES</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Personalize os temas e a dificuldade do jogo
            </p>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center space-y-2 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-trivia-purple" />
              <span className="text-xs">Carregando opções da API...</span>
            </div>
          ) : (
            <form onSubmit={handleSave} className="w-full flex flex-col space-y-4">
              {/* Select Categoria */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="category" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={settings.category}
                  onChange={handleChange}
                  className="w-full bg-[#EBEBEB] text-slate-800 text-sm font-medium rounded-xl py-3 px-4 outline-none border border-transparent focus:border-trivia-purple focus:bg-white transition-all cursor-pointer"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Dificuldade */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="difficulty" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Dificuldade
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={settings.difficulty}
                  onChange={handleChange}
                  className="w-full bg-[#EBEBEB] text-slate-800 text-sm font-medium rounded-xl py-3 px-4 outline-none border border-transparent focus:border-trivia-purple focus:bg-white transition-all cursor-pointer"
                >
                  <option value="all">Todas as Dificuldades</option>
                  <option value="easy">Fácil</option>
                  <option value="medium">Média</option>
                  <option value="hard">Difícil</option>
                </select>
              </div>

              {/* Select Tipo */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="type" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Tipo de Pergunta
                </label>
                <select
                  id="type"
                  name="type"
                  value={settings.type}
                  onChange={handleChange}
                  className="w-full bg-[#EBEBEB] text-slate-800 text-sm font-medium rounded-xl py-3 px-4 outline-none border border-transparent focus:border-trivia-purple focus:bg-white transition-all cursor-pointer"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="multiple">Múltipla Escolha</option>
                  <option value="boolean">Verdadeiro / Falso</option>
                </select>
              </div>

              {/* Botão de Salvar */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full font-bold text-white text-sm uppercase tracking-wider bg-trivia-green hover:bg-[#28b07e] shadow-md hover:shadow-glow-green active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 mt-4"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'SALVO COM SUCESSO!' : 'SALVAR PREFERÊNCIAS'}</span>
              </button>

              {/* Botão de Voltar */}
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-3 px-6 rounded-full font-semibold text-slate-600 hover:text-trivia-purple text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-200 hover:border-trivia-purple/30 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>VOLTAR</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <div className="h-6" />
    </div>
  );
};

export default Config;
