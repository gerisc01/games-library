// Regular React imports
import React from 'react';
import { render } from 'react-dom';
// Redux imports
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools';
import thunk from 'redux-thunk'
// Application imports
import mediaLibraryApp from './reducers'
import App from './components/App';
import { actions } from './actions'
// Import bootstrap and font awesome css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

let store = createStore(mediaLibraryApp, devToolsEnhancer(), applyMiddleware(thunk));

store.dispatch(actions.fetchListData())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
