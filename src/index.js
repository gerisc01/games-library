// Regular React imports
import React from 'react';
import { render } from 'react-dom';
// Redux imports
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools';
import thunk from 'redux-thunk'
// Application imports
import gamesLibraryApp from './reducers'
import App from './components/App';
import { actions } from './actions'
// Import bootstrap and font awesome css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

let store = createStore(gamesLibraryApp, devToolsEnhancer(), applyMiddleware(thunk));

store.dispatch(actions.fetchCollections())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
