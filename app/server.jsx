import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import buildRouting from './routes';
import configureStore from './redux/configureStore';
import template from './template';

export default (url) => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  const routes = buildRouting(store);
  match({ routes, location: url }, (err, redirect, props) => {
    if (err) {
      throw err;
    }
    if (props) {
      const react = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
      return template(react());
    }
    return 'error';
  });
};
