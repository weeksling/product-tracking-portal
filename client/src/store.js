import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      //createLogger(),
      thunk,
      promiseMiddleware()
    )
  )
);
export default store;