import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import locationsReducer from './locationsReducer';

const appReducer = combineReducers({
	products: productsReducer,
	locations: locationsReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}


export default rootReducer