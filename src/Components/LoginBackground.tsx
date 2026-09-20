import React from 'react';
import loginBgSvg from '../assets/login-bg.svg';


/**
 * Background exclusivo para a tela de Login conforme especificação do Figma.
 * Usa o SVG oficial de 1280x746 com gradiente, padrão de textura e interrogações desfocadas.
 */
export const LoginBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#3C1B7A]">
      <img
        src={loginBgSvg}
        alt="Trivia Background"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default LoginBackground;
