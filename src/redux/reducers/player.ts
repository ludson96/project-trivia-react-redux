import { PlayerState } from '../../types';
import {
  REQUEST_API,
  RESPONSE_API,
  GET_NAME,
  GET_EMAIL,
  RESULT_API,
  CHANGE_SCORE,
  COUNTER,
  GET_IMG,
  RESETTING_SCORE,
  GET_ERROR,
  PlayerActionTypes,
} from '../actions';

const INITIAL_STATE: PlayerState = {
  imagem: '',
  name: '',
  email: '',
  token: '',
  score: 0,
  assertions: 0,
  results: undefined,
  loading: false,
  error: undefined,
};

function player(state = INITIAL_STATE, action: PlayerActionTypes): PlayerState {
  switch (action.type) {
    case REQUEST_API:
      return {
        ...state,
        loading: true,
      };
    case RESPONSE_API:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case GET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case RESETTING_SCORE:
      return {
        ...state,
        score: 0,
        assertions: 0,
      };
    case GET_IMG:
      return {
        ...state,
        imagem: action.img,
      };
    case GET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case COUNTER:
      return {
        ...state,
        assertions: action.assertions,
      };
    case RESULT_API:
      return {
        ...state,
        results: action.payload,
        loading: false,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: state.score + action.score,
      };
    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default player;
