import * as actionTypes from './types';

export setProducts = (data) => {
	return {
		type: actionTypes.SET_PRODUCTS,
		data: data
	}
}

export setSelectedProduct = (data) => {
	return {
		type: actionTypes.SET_SELECTED_PRODUCT,
		data: data
	}
}