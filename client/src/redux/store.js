import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import usersReducer from './usersRedux';
import adsReducer from './adsRedux';
import userData from './userData';

const subreducers = {
  user: usersReducer,
  ads: adsReducer,
  userData: userData,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;