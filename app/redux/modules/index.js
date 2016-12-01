import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  app,
  routing,
});

export default rootReducer;
