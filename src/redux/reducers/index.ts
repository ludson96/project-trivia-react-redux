import { combineReducers } from 'redux';
import player from './player';

const rootReducer = combineReducers({
  player,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
