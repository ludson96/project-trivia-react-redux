# Trivia Game 🎲

Um jogo moderno e interativo de perguntas e respostas desenvolvido em **React 17**, **TypeScript**, **Redux**, **Tailwind CSS**, **Axios** e **Vitest**, consumindo a API pública do [Open Trivia Database (OpenTDB)](https://opentdb.com/).

O projeto foi projetado com foco em **UI/UX de alto nível**, seguindo protótipo vetorial com estética moderna, animações fluidas, responsividade total e integração em tempo real com o serviço **Gravatar**.

---

## 🚀 Demonstração Visual & Design

- **Design System Fiel**: Paleta de cores com tema escuro imersivo (`#3C1B7A`, `#2FC18C`, `#EA5D5D`, `#F9BA18`, `#00D5E2`), background com pontos de interrogação flutuantes e efeitos de iluminação/glow.
- **Lobby Interativo**: Validação dinâmica de entrada, detecção de e-mail e integração imediata com foto do Gravatar.
- **Gameplay em Duas Colunas**:
  - Painel de pergunta com badge de categoria, nível de dificuldade e cronômetro regressivo com contagem de 30 segundos.
  - Alternativas estilo pílula com letras identificadoras (A, B, C, D) e feedback tátil/visual imediato (verde para acertos, vermelho para erros).
- **Tela de Resultados (Feedback)**: Painel de assertividade e pontuação com avatar estilizado e mensagem adaptativa de desempenho (*"MANDOU BEM!"* vs *"PODIA SER MELHOR..."*).
- **Leaderboard (Ranking)**: Histórico dos melhores desempenhos salvo no `LocalStorage` com medalhas de pódio, data da partida e suporte à limpeza de dados.
- **Configurações Avançadas**: Escolha de categorias dinâmicas da OpenTDB, níveis de dificuldade e formatos de questão (Múltipla Escolha ou Verdadeiro/Falso).

---

## 🛠️ Tecnologias e Ferramentas

- **Frontend**: [React](https://reactjs.org/) (Hooks funcionais)
- **Tipagem**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Gerenciamento de Estado**: [Redux](https://redux.js.org/) & [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Consumo de API**: [Axios](https://axios-http.com/)
- **Testes Automatizados**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/) & `@testing-library/jest-dom`
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Criptografia & Avatares**: [Crypto-JS (MD5)](https://cryptojs.gitbook.io/docs/) integrado ao [Gravatar API](https://gravatar.com/)
- **Padronização**: [ESLint](https://eslint.org/)

---

## 📁 Arquitetura do Projeto

```text
src/
├── Components/
│   ├── AnswerButtons.tsx    # Alternativas com feedback visual e pontuação
│   ├── Feedback.tsx         # Resumo de assertividade e pontos
│   ├── Header.tsx           # Avatar do Gravatar, nome e placar
│   ├── TriviaBackground.tsx # Fundo temático com interrogações em SVG
│   └── TriviaLogo.tsx       # Logotipo vetorial oficial em SVG
├── Pages/
│   ├── Config.tsx           # Filtros de categoria, dificuldade e tipo
│   ├── Game.tsx             # Motor da rodada de perguntas e timer
│   ├── Login.tsx            # Lobby inicial com validação e setup de jogador
│   └── Ranking.tsx          # Leaderboard persistido no LocalStorage
├── redux/
│   ├── actions/             # Actions tipadas e thunks com Axios
│   ├── reducers/            # Reducers imutáveis
│   └── store/               # Store configurada
├── services/
│   └── api.ts               # Cliente Axios com chamadas tipadas para a OpenTDB
├── tests/
│   ├── helpers/             # Helper renderWithRouterAndRedux para Vitest
│   ├── Feedback.test.tsx    # Testes da página de Feedback
│   ├── Game.test.tsx        # Testes de gameplay, timer e alternativas
│   ├── Login.test.tsx       # Testes de autenticação e validações
│   └── Ranking.test.tsx     # Testes do ranking e leaderboard
├── types/
│   └── index.ts             # Interfaces TypeScript de todo o domínio
└── utils/
    ├── decodeHtml.ts        # Sanitização de entidades HTML da API
    └── gravatar.ts          # Geração dinâmica de hash MD5 para avatar
```

---

## ⚙️ Como Instalar e Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [NPM](https://www.npmjs.com/)

### Passo a passo

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:Ludson96/project-trivia-react-redux.git
   cd project-trivia-react-redux
   ```

2. **Instale as dependências**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Inicie a aplicação**:
   ```bash
   npm start
   ```
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para jogar!

---

## 🧪 Como Executar os Testes Automatizados

O projeto utiliza **Vitest** com o ecossistema React Testing Library:

```bash
# Executar todos os testes em modo run
npm test

# Executar testes em modo watch interativo
npm run test:watch

# Checagem de qualidade do código com ESLint
npm run lint
```

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](file:///d:/Code/para%20o%20portfolio/project-trivia-react-redux/LICENSE) para mais detalhes.
