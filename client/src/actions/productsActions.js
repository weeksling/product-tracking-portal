import * as types from './ActionTypes';

import axios from 'axios'

export function fetchProducts (data) {
	return dispatch => {
		dispatch(productsRequest())
		return axios.get('http://localhost:3000/api/products')
			.then(function (response) {

			})
	}
}

function productsRequest() {
	return {
		type: types.FETCH_PRODUCTS_REQUEST
	}
}

function productsSuccess() {
	return {
		type: types.FETCH_PRODUCTS_SUCCESS
	}
}

export function setSelectedProduct (data) {
	return {
		type: types.SET_SELECTED_PRODUCT,
		data: data
	}
}