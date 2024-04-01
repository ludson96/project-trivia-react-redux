# Repositório do projeto de Trivia 🎲

# 🚧 Estilização em desenvolvimento ! 🚧

## Módulo: Front-end

 Repositório possuí projeto desenvolvido no período que estive na **Trybe**, abordando conceitos de gerenciamento de estado com `Redux`, utilizando a metodologia `Kanban` em um grupo de alunos de 5 pessoas aqui na Trybe.

## Informações de aprendizados

- Este é um projeto desenvolvido para praticar `Redux` e metodologia `Kanban`;
- Segundo projeto utilizando `Redux` e metodologia `Kanban`.

## Linguagens e ferramentas usadas

[![Git][Git-logo]][Git-url]
[![ESLint][ESLint-logo]][ESLint-url]
[![HTML5][HTML5-logo]][HTML5-url]
[![CSS3][CSS3-logo]][CSS3-url]
[![JavaScript][JavaScript-logo]][JavaScript-url]
[![React][React-logo]][React-url]
[![RTL][RTL-logo]][RTL-url]

## O que foi desenvolvido

Neste projeto, desenvolvemos um jogo de perguntas e respostas baseado no jogo Trivia (tipo um show do milhão americano) utilizando React e Redux, desenvolvendo em grupo suas funcionalidades de acordo com as demandas definidas em um quadro Kanban. A partir dessas demandas, teremos uma aplicação onde a pessoa usuária poderá:

- Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil da pessoa usuária;
- Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
- Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
- Visualizar a página de ranking, se quiser, ao final de cada jogo.
Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

Figma do protótipo final do projeto [figma](https://www.figma.com/file/59PXrUUfqaRT9P3oDsKVDS/%5BProjeto%5D%5BFrontend%5D-Trivia)

## Habilidades

Neste projeto, desenvolvi as seguintes habilidades:

- Criar um store Redux em aplicações React;
- Criar reducers no Redux em aplicações React;
- Criar actions no Redux em aplicações React;
- Criar dispatchers no Redux em aplicações React;
- Conectar Redux aos componentes React;
- Criar actions assíncronas na sua aplicação React que faz uso de Redux;
- Escrever testes para garantir que sua aplicação possua uma boa cobertura de testes.

## Alguns dos requisitos que fiquei responsável e tive participação

- [Req. 06] - Crie a página de jogo que deve conter as informações relacionadas à pergunta
- [Req. 10] - Crie um botão de "Next" (Próxima) que apareça após a resposta ser dada
- Outros requisitos foram feitos em `pair programming`

## Instruções para instalar e rodar

1. Clone o repo:

    ```bash
    git clone git@github.com:Ludson96/project-trivia-react-redux.git
    ```

1. Entre na pasta do repositório que você acabou de clonar:

    ```bash
    cd project-trivia-react-redux
    ```

1. Instale as dependências:

    ```bash
    npm install
    ```

1. Execute a aplicação `React`:

    ```bash
    npm start
    ```

1. Toda a logica se na pasta `src`, para executar os testes basta usar o comando `npm test` para executar todos os testes ou `npm test <nome do teste>` para executar um teste especifico.

[Git-logo]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[HTML5-logo]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/pt-BR/docs/Web/HTML
[CSS3-logo]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/pt-BR/docs/Web/CSS
[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[React-logo]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org
[RTL-logo]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[RTL-url]: https://testing-library.com/
