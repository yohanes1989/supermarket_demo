import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './Component/App';
import CatalogEdit from './Component/CatalogEdit';
import reducers from './reducers';

const AppWithProvider = (
  <Provider store={ createStore(reducers, {}, applyMiddleware(reduxThunk)) }>
    <BrowserRouter>
      <Switch>
        <Route path="/catalog-form" component={CatalogEdit} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

const root = document.querySelector('#app');
ReactDOM.render(AppWithProvider, root);
