import * as types from './ActionTypes';

import axios from 'axios'

export function fetchProducts (data) {
	return dispatch => {
		dispatch(productsRequest())
		return axios.get('http://localhost:8000/api/products/')
			.then(function (response) {
				console.log(response.data)
				dispatch(productsSuccess(response.data))
			})
	}
}

export function createProduct (product) {
	return dispatch => {
		dispatch( { type: types.CREATE_PRODUCT } )
		dispatch( createProductRequest() )
		return axios.post('http://localhost:8000/api/products/', product)
			.then( (response) => {
				dispatch( createProductSuccess(response.data) )
				return dispatch(fetchProducts())
			})
	}
}

function createProductRequest() {
	return {
		type: types.CREATE_PRODUCT_REQUEST
	}
}

function createProductSuccess() {
	return {
		type: types.CREATE_PRODUCT_SUCCESS
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
