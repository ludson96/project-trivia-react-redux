import React from 'react';

/**
 * Renderiza o fundo temático oficial do Figma:
 * Gradiente roxo profundo com pontos de interrogação coloridos flutuantes com efeito glow/blur.
 */
export const TriviaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3C1B7A] via-[#230E4E] to-[#160B2E]" />

      {/* Decorative Question Marks with Glow & Blur matching Figma coordinates */}
      {/* 1. Green Question Mark (Top Left) */}
      <div className="absolute top-[10%] left-[8%] animate-float-slow opacity-60 filter blur-[1px]">
        <svg width="120" height="150" viewBox="0 0 100 130" fill="none">
          <path
            d="M48 100 h12 v12 h-12 z M35 48 C35 32 42 22 55 22 C67 22 75 30 75 42 C75 50 70 56 64 61 L58 66 C55 69 54 73 54 78 L54 86 H42 L42 77 C42 71 45 66 50 61 L55 57 C59 54 61 50 61 44 C61 38 57 34 52 34 C46 34 43 38 42 45 Z"
            fill="#2FC18C"
          />
        </svg>
      </div>

      {/* 2. Red / Coral Question Mark (Top Right) */}
      <div className="absolute top-[12%] right-[10%] animate-float-reverse opacity-70 filter blur-[1.5px]">
        <svg width="150" height="180" viewBox="0 0 100 130" fill="none">
          <path
            d="M48 100 h12 v12 h-12 z M35 48 C35 32 42 22 55 22 C67 22 75 30 75 42 C75 50 70 56 64 61 L58 66 C55 69 54 73 54 78 L54 86 H42 L42 77 C42 71 45 66 50 61 L55 57 C59 54 61 50 61 44 C61 38 57 34 52 34 C46 34 43 38 42 45 Z"
            fill="#EA5D5D"
          />
        </svg>
      </div>

      {/* 3. Cyan Question Mark (Bottom Left) */}
      <div className="absolute bottom-[15%] left-[6%] animate-float-reverse opacity-65 filter blur-[1px]">
        <svg width="130" height="160" viewBox="0 0 100 130" fill="none">
          <path
            d="M48 100 h12 v12 h-12 z M35 48 C35 32 42 22 55 22 C67 22 75 30 75 42 C75 50 70 56 64 61 L58 66 C55 69 54 73 54 78 L54 86 H42 L42 77 C42 71 45 66 50 61 L55 57 C59 54 61 50 61 44 C61 38 57 34 52 34 C46 34 43 38 42 45 Z"
            fill="#00D5E2"
          />
        </svg>
      </div>

      {/* 4. Yellow Question Mark (Bottom Right) */}
      <div className="absolute bottom-[18%] right-[8%] animate-float-slow opacity-60 filter blur-[1px]">
        <svg width="90" height="120" viewBox="0 0 100 130" fill="none">
          <path
            d="M48 100 h12 v12 h-12 z M35 48 C35 32 42 22 55 22 C67 22 75 30 75 42 C75 50 70 56 64 61 L58 66 C55 69 54 73 54 78 L54 86 H42 L42 77 C42 71 45 66 50 61 L55 57 C59 54 61 50 61 44 C61 38 57 34 52 34 C46 34 43 38 42 45 Z"
            fill="#F9BA18"
          />
        </svg>
      </div>

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full filter blur-[100px]" />
    </div>
  );
};

export default TriviaBackground;
