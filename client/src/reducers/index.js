import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';


const products = (state=null, action) => {
	switch (action.type) {
		case types.SET_PRODUCTS:
			return action.data;
		case types.SET_SELECTED_PRODUCT:
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