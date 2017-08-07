import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';


const products = (state=null, action) => {
	switch (action.type) {
		case actionTypes.SET_PRODUCTS:
			return action.data;
		case actionTypes.SET_SELECTED_PRODUCT:
			return action.data;
		default:
			return state;
	}
}


const appReducer = combineReducers({
	products
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}


export default rootReducer