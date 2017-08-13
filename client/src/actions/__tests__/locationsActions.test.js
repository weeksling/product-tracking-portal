
/**
 * @jest-environment node
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promises from 'redux-promise-middleware';

import * as fixtures from '../../fixtures';

import nock from 'nock';

import * as locations from '../locationsActions';
import * as types from '../ActionTypes';

const middleWares = [promises(), thunk];
const mockStore = configureMockStore(middleWares);


describe('Locations Actions', () => {
	describe('.fetchLocations', () => {
		it ('exists', () => {
			expect(locations.fetchLocations).toBeDefined();
		})

		describe('Called without a product to filter', () => {
			it ('Dispatches FETCH_LOCATIONS_REQUEST, FETCH_LOCATIONS_SUCCESS', () => {
				let {
					mockLocations
				} = fixtures;

				let request = nock('http://localhost:8000')
					.get('/api/locations/')
					.reply(200,  
						mockLocations, {'Access-Control-Allow-Origin': '*'})

				const expectedActions = [
					{type: types.FETCH_LOCATIONS_REQUEST, payload: undefined},
					{type: types.FETCH_LOCATIONS_SUCCESS, payload: mockLocations}
				]

				const store = mockStore()

				return store.dispatch(locations.fetchLocations())
					.then( () => {
						expect(store.getActions()).toEqual(expectedActions)
						request.done()
					})
			})
		})


		describe('Called with a product filter', () => {
			it ('Dispatches FETCH_LOCATIONS_REQUEST, FETCH_LOCATIONS_SUCCESS', () => {

				let { 
					mockOneProduct: product,
					mockLocations 
				} = fixtures;

				let request = nock('http://localhost:8000')
					.get('/api/locations/')
					.query({
						product: product.product_id
					})
					.reply(200,  
						mockLocations, {'Access-Control-Allow-Origin': '*'})

				const expectedActions = [
					{
						type: types.FETCH_LOCATIONS_REQUEST,
						payload: product
					},
					{
						type: types.FETCH_LOCATIONS_SUCCESS,
						payload: mockLocations
					}
				]

				const store = mockStore()

				return store.dispatch(locations.fetchLocations(product))
					.then( () => {
						expect(store.getActions()).toEqual(expectedActions)
						request.done()
					})
			})

		})
	})


	describe('.selectLocationToEdit', () => {
		it ('exists', () => {
			expect(locations.selectLocationToEdit).toBeDefined();
		})

		it ('Dispatches SELECT_LOCATION_TO_EDIT', () => {
			let {
				mockOneLocation: location
			} = fixtures;

			const store = mockStore();

			const expectedActions = [
				{
					type: types.SELECT_LOCATION_TO_EDIT,
					payload: location
				}
			]

			store.dispatch(locations.selectLocationToEdit(location))
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})


