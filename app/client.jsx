import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'event-source-polyfill';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './redux/configureStore';
import buildRoutes from './routes';
import preRenderMiddleware from './redux/middlewares/preRenderMiddleware';


// injectTapEventPlugin();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const childRoutes = buildRoutes(store);

/**
 * Callback function handling frontend route changes.
 */
/* eslint-disable */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;

  preRenderMiddleware(store.dispatch, components, params);
}
/* eslint-enable */
render(
  <Provider store={store}>
    <Router history={history} >
      {childRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
