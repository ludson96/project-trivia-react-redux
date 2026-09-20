import md5 from 'crypto-js/md5';

/**
 * Gera a URL oficial do Gravatar a partir do e-mail do jogador.
 * Caso o e-mail não tenha cadastro ou seja nulo, retorna o fallback com estilo retro/identicon.
 */
export const getGravatarUrl = (email: string): string => {
  if (!email || !email.trim()) {
    return 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc?d=identicon';
  }
  const cleanEmail = email.trim().toLowerCase();
  const hash = md5(cleanEmail).toString();
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

export default getGravatarUrl;
