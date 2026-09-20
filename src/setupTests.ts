import '@testing-library/jest-dom';

const defaultQuestions = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which of these actors/actresses is NOT a part of the cast for the 2016 movie &quot;Suicide Squad&quot;?',
      correct_answer: 'Scarlett Johansson',
      incorrect_answers: ['Jared Leto', 'Will Smith', 'Margot Robbie']
    },
    {
      category: 'Science: Computers',
      type: 'boolean',
      difficulty: 'medium',
      question: 'AMD created the first consumer 64-bit processor.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'hard',
      question: 'In World of Warcraft lore, which of the following is known as the God of Spiders in the troll&#039;s loa beliefs?',
      correct_answer: 'Elortha no Shadra',
      incorrect_answers: ['Bwonsamdi', 'Hakkar', 'Shirvallah']
    },
    {
      category: 'Geography',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What&#039;s the first National Park designated in the United States?',
      correct_answer: 'Yellowstone',
      incorrect_answers: ['Sequoia ', 'Yosemite', 'Rocky Mountain']
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which of the following is an album by punk rock band Anti-Flag?',
      correct_answer: 'For Blood And Empire',
      incorrect_answers: ['Infinity On High', '21st Century Breakdown', 'No Pads, No Helmets...Just Balls']
    }
  ]
};

import axios from 'axios';

vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn().mockImplementation((url: string) => {
      if (url.includes('api_token.php')) {
        return Promise.resolve({
          data: { response_code: 0, response_message: '1', token: 'mock-token-12345' },
        });
      }
      return Promise.resolve({
        data: defaultQuestions,
      });
    }),
  };

  return {
    default: {
      ...axios,
      create: vi.fn(() => mockAxiosInstance),
      get: mockAxiosInstance.get,
    },
  };
});

// Mock global fetch para testes que simulam fluxo sem interceptação Axios direta
global.fetch = vi.fn().mockImplementation((url: string) => {
  if (url.includes('api_token.php')) {
    return Promise.resolve({
      json: () => Promise.resolve({ response_code: 0, token: 'mock-token-12345' }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve(defaultQuestions),
  });
}) as any;

