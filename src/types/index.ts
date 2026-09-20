export interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: Question[];
}

export interface Category {
  id: number;
  name: string;
}

export interface PlayerState {
  name: string;
  assertions: number;
  score: number;
  email: string;
  imagem: string;
  token: string;
  results?: TriviaApiResponse;
  error?: string;
  loading: boolean;
}

export interface GameSettings {
  category: string;
  difficulty: string;
  type: string;
}

export interface RankingEntry {
  name: string;
  score: number;
  picture: string;
  date?: string;
}

export interface RootState {
  player: PlayerState;
}
