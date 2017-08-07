import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      createLogger(),
    )
  )
);
export default store;