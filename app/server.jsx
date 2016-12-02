import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import buildRouting from './routes';
import configureStore from './redux/configureStore';
import preRenderMiddleware from './redux/middlewares/preRenderMiddleware';


export default (req, res) => {
  const history = createMemoryHistory();
  const initialState = {
    app: {
      title: 'ap.react',
    },
  };
  const store = configureStore(initialState, history);
  const routes = buildRouting(store);
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send({ error: err });
    }
    if (props) {
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        const react = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );
        console.log(req.user);
        const response = `<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>React App</title>
            </head>
            <body>
              <div id="app">${react}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
              <script type="text/javascript" src="/static/js/bundle.js"></script>
            </body>
          </html>`;
        res.send(response);
      });
    } else {
      res.status(500).send({ error: 'Error' });
    }
  });
};
