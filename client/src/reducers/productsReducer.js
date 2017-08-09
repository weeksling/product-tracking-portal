import * as types from '../actions/ActionTypes'
//import _ from 'lodash';

const initialState = {
	loading: false,
	error: null,
	products: []
}

export default (state = initialState, action ) =>{
	switch (action.type){
		case types.FETCH_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true
			};
		case types.FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				loading:false,
				products: action.payload
			};
		default:
			return state;
	}
}
