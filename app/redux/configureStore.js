import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './modules';
import promiseMiddleware from './middlewares/promiseMiddleware';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];
  // console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
  // try {
  //   store = createStore(rootReducer, initialState, compose(
  //     applyMiddleware(...middleware),
  //     typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  //   ));
  // } catch (err) {
  //   store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
  // }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
