/**
 * Decodifica com segurança entidades de texto HTML retornadas pela OpenTDB
 * ex: &quot; -> " , &#039; -> ' , &amp; -> &
 */
export const decodeHtml = (html: string): string => {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export default decodeHtml;
