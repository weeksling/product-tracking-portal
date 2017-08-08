import { combineReducers } from 'redux';

import productsReducer from './productsReducer';


const appReducer = combineReducers({
	products: productsReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}


export default rootReducer