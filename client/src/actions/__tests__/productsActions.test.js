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
			let request = nock('http://localhost')
				.get('/api/products')
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
})
