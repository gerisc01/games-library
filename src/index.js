import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools';

import gamesLibraryApp from './reducers'
import App from './components/App';

import { actions } from './actions'

let store = createStore(gamesLibraryApp, applyMiddleware(thunk), devToolsEnhancer());

store.dispatch(actions.fetchCollections())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
