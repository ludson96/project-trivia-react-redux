import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Config from './Pages/Config';
import Feedback from './Components/Feedback';
import Ranking from './Pages/Ranking';
import store from './redux/store';
import './App.css';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/game" component={Game} />
        <Route path="/config" component={Config} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/ranking" component={Ranking} />
      </Switch>
    </Provider>
  );
};

export default App;
