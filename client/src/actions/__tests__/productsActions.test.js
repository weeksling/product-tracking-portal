/**
 * @jest-environment node
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promises from 'redux-promise-middleware';

import nock from 'nock';

//import * as api from '../../api';
import * as products from '../productsActions';
import * as types from '../ActionTypes';

const middleWares = [promises(), thunk];
const mockStore = configureMockStore(middleWares);

describe( 'productsActions', () => {
	beforeEach(() => {
		//nock.clearAll();
		//spyOn(api, 'getProducts')
	})
	describe('.fetchProducts()', () => {
		it ('exists', () => {
			expect(products.fetchProducts).toBeDefined();
		})

		it ('succeeds, dispatches a FETCH_PRODUCTS_REQUEST and FETCH_PRODUCTS_SUCCESS', () => {
			let request = nock('http://localhost:8000')
				.get('/api/products/')
				.reply(200,  
					[
						{"product_id":1,"description":"Cesna 120"},
						{"product_id":2,"description":"DC-6 Twin Otters"}
					], {'Access-Control-Allow-Origin': '*'})

			const expectedActions = [
				{type: types.FETCH_PRODUCTS_REQUEST},
				{type: types.FETCH_PRODUCTS_SUCCESS,
					payload:[
						{"product_id":1,"description":"Cesna 120"},
						{"product_id":2,"description":"DC-6 Twin Otters"}
					]
				}
			]
			const store = mockStore()

			return store.dispatch(products.fetchProducts())
				.then( () => {
					expect(store.getActions()).toEqual(expectedActions)
					request.done()
				})

		})
	})

	describe('.selectProductToEdit()', () => {
		const mockProduct = { product_id: 10, description: 'Nothing' }

		it ('exists', () => {
			expect(products.selectProductToEdit).toBeDefined();
		})
	})

	describe('.createProduct()', () => {

		const mockProduct = { product_id: 10, description: 'Nothing' }

		it ('exists', () => {
			expect (products.createProduct).toBeDefined();
		})

		it ('Executes a POST request, with product data', () => {
			let request = nock('http://localhost:8000')
				.post('/api/products/', mockProduct)
				.reply(200)

			let fetchRequest = nock('http://localhost:8000')
				.get('/api/products/')
				.reply(200,  
					[
						{"product_id":1,"description":"Cesna 120"},
						{"product_id":2,"description":"DC-6 Twin Otters"}
					], {'Access-Control-Allow-Origin': '*'})

			const store = mockStore();

			return store.dispatch(products.createProduct(mockProduct))
				.then ( () => {
					expect(request.isDone()).toBe(true)
				})
		})

		it('succeeds, dispatched a FETCH_PRODUCTS_REQUEST and FETCH_PRODUCTS_SUCCESS, then fetches products again', () => {
			let request = nock('http://localhost:8000')
				.post('/api/products/', mockProduct)
				.reply(200)

			let fetchRequest = nock('http://localhost:8000')
				.get('/api/products/')
				.reply(200,  
					[
						{"product_id":1,"description":"Cesna 120"},
						{"product_id":2,"description":"DC-6 Twin Otters"}
					], {'Access-Control-Allow-Origin': '*'})

			const store = mockStore();

			const expectedActions = [
				{ type: types.CREATE_PRODUCT, payload: mockProduct },
				{ type: types.CREATE_PRODUCT_REQUEST },
				{ type: types.CREATE_PRODUCT_SUCCESS },
				{ type: types.FETCH_PRODUCTS_REQUEST },
				{
					"payload": [{"description": "Cesna 120", "product_id": 1}, {"description": "DC-6 Twin Otters", "product_id": 2}], 
					"type": "FETCH_PRODUCTS_SUCCESS"
				}
			]

			return store.dispatch(products.createProduct(mockProduct))
				.then ( () => {
					expect(store.getActions()).toEqual(expectedActions)
				})
		})
	})

	describe('.updateProduct()', () => {

		const mockProduct = { product_id: 10, description: 'Nothing' }

		it ('Sends a PUT request for the product_id', () => {
			let request = nock('http://localhost:8000')
				.put('/api/products/'+mockProduct.product_id+'/', { ...mockProduct, description: 'something' })
				.reply(200)

			nock('http://localhost:8000')
				.get('/api/products/')
				.reply(200)

			const store = mockStore();

			return store.dispatch(products.updateProduct({ ...mockProduct, description:'something' } ))
				.then ( () => {
					expect(request.isDone()).toBe(true);
				})
		})

		it ('Succeeds, then refreshes the list of products', () => {
			let request = nock('http://localhost:8000')
				.put('/api/products/' + mockProduct.product_id +'/', {...mockProduct, description:'something'})
				.reply(200);

			let fetchRequest = nock('http://localhost:8000')
				.get('/api/products/')
				.reply(200,  
					[
						{"product_id":1,"description":"Cesna 120"},
						{"product_id":2,"description":"DC-6 Twin Otters"}
					], {'Access-Control-Allow-Origin': '*'})

			const store = mockStore();

			const expectedActions = [
				{ type: types.UPDATE_PRODUCT, payload: {...mockProduct, description: 'something'} },
				{ type: types.UPDATE_PRODUCT_REQUEST },
				{ type: types.UPDATE_PRODUCT_SUCCESS },
				{ type: types.FETCH_PRODUCTS_REQUEST },
				{
					"payload": [{"description": "Cesna 120", "product_id": 1}, {"description": "DC-6 Twin Otters", "product_id": 2}], 
					"type": "FETCH_PRODUCTS_SUCCESS"
				}
			]

			return store.dispatch(products.updateProduct({ ...mockProduct, description:'something' } ))
				.then ( () => {
					expect(store.getActions()).toEqual(expectedActions);
				})
		})
	})



})
