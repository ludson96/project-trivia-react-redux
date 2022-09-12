import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, Route } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login';
import Game from '../Pages/Game';
import Feedback from '../Components/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe ('Test Game page', () => {
  const GamePage = '/game';
  const INITIAL_STATE = {
    player: {
      results: {
        results: [{
          category: 'Entertainment: Film',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which of these actors/actresses is NOT a part of the cast for the 2016 movie &quot;Suicide Squad&quot;?',
          correct_answer: 'Scarlett Johansson',
          incorrect_answers: [
            'Jared Leto',
            'Will Smith',
            'Margot Robbie'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'medium',
          question: 'AMD created the first consumer 64-bit processor.',
          correct_answer: 'True',
          incorrect_answers: [
            'False'
          ]
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'hard',
          question: 'In World of Warcraft lore, which of the following is known as the God of Spiders in the troll&#039;s loa beliefs?',
          correct_answer: 'Elortha no Shadra',
          incorrect_answers: [
            'Bwonsamdi',
            'Hakkar',
            'Shirvallah'
          ]
        },
        {
          category: 'Geography',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What&#039;s the first National Park designated in the United States?',
          correct_answer: 'Yellowstone',
          incorrect_answers: [
            'Sequoia ',
            'Yosemite',
            'Rocky Mountain'
          ]
        },
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which of the following is an album by punk rock band Anti-Flag?',
          correct_answer: 'For Blood And Empire',
          incorrect_answers: [
            'Infinity On High',
            '21st Century Breakdown',
            'No Pads, No Helmets...Just Balls'
          ]
        }]
      }
    }
  };

  jest.setTimeout(50000)

  test ('Verifica se btn estão na tela e se estão habilitados ou desabilitados', async () => {
    renderWithRouterAndRedux(<Game />, INITIAL_STATE);
    const btnCorrect = screen.getByText('Scarlett Johansson');
    expect(btnCorrect).toBeInTheDocument();
    expect (btnCorrect).toBeEnabled();
  
  await (waitFor(() => expect(btnCorrect).toBeDisabled(), {timeout:35000}))

  })

  test ('Verifica se btn next está na tela e se ao ser clicado vai para /feedback', async () => {
   const { history } = renderWithRouterAndRedux(
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
    , INITIAL_STATE, '/game');

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

  })
})