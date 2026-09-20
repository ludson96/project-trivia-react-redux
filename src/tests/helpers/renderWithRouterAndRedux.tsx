import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer, { RootState } from '../../redux/reducers';

interface RenderOptions {
  initialEntries?: string[];
  initialState?: any;
}

export const renderWithRouterAndRedux = (
  component: React.ReactElement,
  optionsOrState: RenderOptions | any = {},
  route = '/'
) => {
  let initialState: any = undefined;
  let initialEntries = [route];

  if ('initialEntries' in optionsOrState || 'initialState' in optionsOrState) {
    const opts = optionsOrState as RenderOptions;
    if (opts.initialEntries) initialEntries = opts.initialEntries;
    if (opts.initialState) initialState = opts.initialState;
  } else {
    initialState = optionsOrState;
  }

  const store: Store = createStore(reducer, initialState, applyMiddleware(thunk));
  const history: MemoryHistory = createMemoryHistory({ initialEntries });

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
