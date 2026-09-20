import axios from 'axios';
import { TriviaApiResponse, Category, GameSettings } from '../types';

const triviaApi = axios.create({
  baseURL: 'https://opentdb.com',
  timeout: 10000,
});

export const getSessionToken = async (): Promise<string> => {
  const { data } = await triviaApi.get<{ response_code: number; response_message: string; token: string }>(
    '/api_token.php?command=request'
  );
  return data.token;
};

export const getQuestions = async (
  token: string,
  settings?: Partial<GameSettings>,
  amount: number = 5
): Promise<TriviaApiResponse> => {
  const params: Record<string, string | number> = {
    amount,
    token,
  };

  if (settings?.category && settings.category !== 'all') {
    params.category = settings.category;
  }
  if (settings?.difficulty && settings.difficulty !== 'all') {
    params.difficulty = settings.difficulty;
  }
  if (settings?.type && settings.type !== 'all') {
    params.type = settings.type;
  }

  const { data } = await triviaApi.get<TriviaApiResponse>('/api.php', { params });
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await triviaApi.get<{ trivia_categories: Category[] }>('/api_category.php');
  return data.trivia_categories;
};

export default triviaApi;
