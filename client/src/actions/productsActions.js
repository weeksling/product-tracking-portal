import * as types from './ActionTypes';

import axios from 'axios'

export function fetchProducts (data) {
	console.log('fetchProducts called')
	return dispatch => {
		console.log('Fetching Products')
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
		dispatch( { type: types.CREATE_PRODUCT, payload: product } )
		dispatch( createProductRequest(product) )
		return axios.post('http://localhost:8000/api/products/', product)
			.then( (response) => {
				dispatch( createProductSuccess(response.data) )
				return dispatch( fetchProducts() )
			})
	}
}

export function updateProduct (product) {
	return dispatch => {
		dispatch( { type: types.UPDATE_PRODUCT, payload:product })
		dispatch( { type: types.UPDATE_PRODUCT_REQUEST })
		return axios.put('http://localhost:8000/api/products/' + product.product_id + '/', product)
			.then( () => {
				dispatch( { type: types.UPDATE_PRODUCT_SUCCESS })
				return dispatch( fetchProducts() )
			})

	}
}

export function selectProductToEdit (product) {
	return {
		type: types.SELECT_PRODUCT_TO_EDIT,
		payload: product
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
