import * as types from './ActionTypes';

import axios from 'axios'

export function fetchProducts (data) {
	return dispatch => {
		dispatch(productsRequest())
		return axios.get('/api/products')
			.then(function (response) {
				console.log(response.data)
				dispatch(productsSuccess(response.data))
			})
	}
}

function productsRequest() {
	return {
		type: types.FETCH_PRODUCTS_REQUEST
	}
}

function productsSuccess(data) {
	return {
		type: types.FETCH_PRODUCTS_SUCCESS,
		payload: data
	}
}
