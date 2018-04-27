import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './routes';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

const middlewares = [thunk, logger];
const enhancers = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancers);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
