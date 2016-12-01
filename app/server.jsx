import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import buildRouting from './routes';
import configureStore from './redux/configureStore';
// import preRenderMiddleware from './redux/middlewares/preRenderMiddleware';


export default (url) => {
  const history = createMemoryHistory();
  const initialState = {
    app: {
      title: 'ap.react',
    },
  };
  const store = configureStore(initialState, history);
  const routes = buildRouting(store);
  let cb = true;
  let response;
  match({ routes, location: url }, (err, redirect, props) => {
    if (err) {
      cb = false;
      throw err;
    }
    if (props) {
      // preRenderMiddleware(
      //   store.dispatch,
      //   props.components,
      //   props.params
      // )
      // .then(() => {
      // const serverState = store.getState();
      const react = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
      // const result = template(react, store.getState());
      response = `<!doctype html>
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
        </html>
        `;
      cb = false;
      // console.log(response);
      // console.log('server.jsx');
      // callback(response);
      // return response;
      // });
    }
    cb = false;
    return 'error';
  });
  while (cb) {

  }
  return response;
};
