import { Dispatch } from 'redux';
import { TriviaApiResponse, GameSettings } from '../../types';
import { getSessionToken, getQuestions } from '../../services/api';

export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const RESULT_API = 'RESULT_API';
export const GET_ERROR = 'GET_ERROR';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_IMG = 'GET_IMG';
export const GET_RANKING = 'GET_RANKING';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const RESETTING_SCORE = 'RESETTING_SCORE';
export const COUNTER = 'COUNTER';

export const requestApi = () => ({ type: REQUEST_API } as const);
export const responseApi = (payload: string) => ({ type: RESPONSE_API, payload } as const);
export const resultApi = (payload: TriviaApiResponse) => ({ type: RESULT_API, payload } as const);
export const getError = (payload: string) => ({ type: GET_ERROR, payload } as const);
export const getName = (name: string) => ({ type: GET_NAME, name } as const);
export const getEmail = (email: string) => ({ type: GET_EMAIL, email } as const);
export const getImg = (img: string) => ({ type: GET_IMG, img } as const);
export const getRanking = (ranking: any) => ({ type: GET_RANKING, ranking } as const);
export const changeScore = (score: number) => ({ type: CHANGE_SCORE, score } as const);
export const resettingScore = () => ({ type: RESETTING_SCORE } as const);
export const counter = (assertions: number) => ({ type: COUNTER, assertions } as const);

export type PlayerActionTypes =
  | ReturnType<typeof requestApi>
  | ReturnType<typeof responseApi>
  | ReturnType<typeof resultApi>
  | ReturnType<typeof getError>
  | ReturnType<typeof getName>
  | ReturnType<typeof getEmail>
  | ReturnType<typeof getImg>
  | ReturnType<typeof getRanking>
  | ReturnType<typeof changeScore>
  | ReturnType<typeof resettingScore>
  | ReturnType<typeof counter>;

export function fetchApi() {
  return async (dispatch: Dispatch) => {
    dispatch(requestApi());
    try {
      const token = await getSessionToken();
      localStorage.setItem('token', token);
      return dispatch(responseApi(token));
    } catch (error: any) {
      return dispatch(getError(error.message || 'Erro ao conectar à API Trivia'));
    }
  };
}

export function fetchApiResult(token: string, settings?: Partial<GameSettings>) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await getQuestions(token, settings);
      return dispatch(resultApi(data));
    } catch (error: any) {
      return dispatch(getError(error.message || 'Erro ao buscar perguntas'));
    }
  };
}
