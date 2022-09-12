import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Ranking from '../Pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Test ranking page', () => {
  test("Verifica se botão home está na tela e redireciona para home", async() => {
    const{ history } =  renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const emailValid = 'testeemail@gmail.com';
    const nameValid = 'Alice';
    userEvent.type(email, emailValid);
    userEvent.type(name, nameValid);

    const buttonPlay = screen.getByTestId("btn-play");
    userEvent.click(buttonPlay);
    await (waitFor(() => expect(buttonPlay).not.toBeInTheDocument(), {timeout:3000}));
    expect(history.location.pathname).toBe('/game');


    const btnCorrect = screen.getByTestId('correct-answer');
    expect(btnCorrect).toBeInTheDocument();
    expect (btnCorrect).toBeEnabled();
    userEvent.click(btnCorrect)

    const btnNext1 = screen.getByTestId('btn-next');
    userEvent.click(btnNext1)

    const btnCorrect2 = screen.getByTestId('correct-answer');
    userEvent.click(btnCorrect2)
    const btnNext2 = screen.getByTestId('btn-next');
    userEvent.click(btnNext2)
    
    const btnCorrect3 = screen.getByTestId('correct-answer');
    userEvent.click(btnCorrect3)
    const btnNext3 = screen.getByTestId('btn-next');
    userEvent.click(btnNext3)
   
    const btnCorrect4 = screen.getByTestId('correct-answer');
    userEvent.click(btnCorrect4)
    const btnNext4 = screen.getByTestId('btn-next');
    userEvent.click(btnNext4)

    const btnCorrect5 = screen.getByTestId('correct-answer');
    userEvent.click(btnCorrect5)
    const btnNext5 = screen.getByTestId('btn-next');
    userEvent.click(btnNext5)

    await (waitFor(() => expect(history.location.pathname).toBe('/feedback'), {timeout:1000}))

    const btnRanking = screen.getByTestId("btn-ranking");
    userEvent.click(btnRanking)
    expect(history.location.pathname).toBe('/ranking')

    const btnHome = screen.getByTestId("btn-go-home");
    expect(btnHome).toBeInTheDocument();
    userEvent.click(btnHome)
    expect(history.location.pathname).toBe('/')
  })

  test("Verifica ranking vazio...", () => {
    localStorage.clear();
    renderWithRouterAndRedux(<Ranking />);
  
    const messageVoid = screen.getByText(/ranking vazio/i);
    expect(messageVoid).toBeInTheDocument()
  })
});
