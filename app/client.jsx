import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './redux/configureStore';
import routes from './routes';

// injectTapEventPlugin();

const store = configureStore();
const childRoutes = routes(store);
render(
  <Provider store={store}>
    <Router history={browserHistory} >
      {childRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
