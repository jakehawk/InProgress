import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import { AUTH_USER } from './actions/types';

import App from './components/app';
import Welcome from './components/welcome';

import DeckIndex from './containers/decks_index';

import Signup from './containers/signup';
import Signin from './containers/signin';
import Signout from './containers/signout';

import reducers from './reducers/reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider user to be signed in
if (token)
  store.dispatch({ type: AUTH_USER });

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={DeckIndex} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

