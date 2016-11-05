import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Main from './containers/Main';


export default (store) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(store);
  }
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
    </Route>
    );
};
