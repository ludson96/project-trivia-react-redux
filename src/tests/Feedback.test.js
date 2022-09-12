import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Feedback from '../Components/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe ('Test Feedback page', () => {
  const feedbackPage = '/feedback';
  test ('Verifica se imagem do Gravatar está na página', () => {
    renderWithRouterAndRedux(<Feedback />, { initialEntries: [feedbackPage] });
    const gravatarImage = screen.getByTestId('header-profile-picture');
    expect(gravatarImage).toBeInTheDocument();
  })

  test ('Verifica se nome do player está na página', () => {
    renderWithRouterAndRedux(<Feedback />, { initialEntries: [feedbackPage] });
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
  })

  test ('Verifica score na página', () => {
    renderWithRouterAndRedux(<Feedback />, { initialEntries: [feedbackPage] });
    const actualScore = screen.getByTestId('header-score');
    expect(actualScore).toBeInTheDocument();
  })

  test ('Verifica Could be Better feedback text', () => {
    const INITIAL_STATE = {
      player: {
        assertions: 2
      }
    };
    const badHits = 2;
    renderWithRouterAndRedux(<Feedback assertions={badHits} />, INITIAL_STATE );
    
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();

    const couldBeBetter = screen.getByText ('Could be better...')
    expect(couldBeBetter).toBeInTheDocument()
  })

  test ('Verifica Well Done feedback text', () => {
    const INITIAL_STATE = {
      player: {
        assertions: 4
      }
    };
    const goodHits = 4;
    renderWithRouterAndRedux(<Feedback assertions={goodHits} />, INITIAL_STATE);
    
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();

    const wellDone = screen.getByText ('Well Done!')
    expect(wellDone).toBeInTheDocument()
  })

  test ('Verifica button play again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain)
    expect(history.location.pathname).toBe('/');
  })

  test ('Verifica button ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking)
    expect(history.location.pathname).toBe('/ranking');
  })


  
})