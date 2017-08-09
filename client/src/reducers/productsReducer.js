import * as types from '../actions/ActionTypes'
//import _ from 'lodash';

const initialState = {
	loading: false,
	error: null,
	productToEdit: null,
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

		case types.SELECT_PRODUCT_TO_EDIT:
			return {
				...state,
				productToEdit: action.payload
			}

		case types.UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				productToEdit: null
			}
		default:
			return state;
	}
}
