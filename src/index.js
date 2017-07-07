import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './Component/App';
import reducers from './reducers';

const AppWithProvider = (
  <Provider store={ createStore(reducers) }>
    <App />
  </Provider>
);

const root = document.querySelector('#app');
ReactDOM.render(AppWithProvider, root);
