
/**
 * @jest-environment node
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promises from 'redux-promise-middleware';

import * as fixtures from '../../fixtures';

import nock from 'nock';

import * as locations from '../locationsActions';
import * as ActionTypes from '../ActionTypes';

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
					{type: ActionTypes.FETCH_LOCATIONS_REQUEST, payload: undefined},
					{type: ActionTypes.FETCH_LOCATIONS_SUCCESS, payload: mockLocations}
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
						type: ActionTypes.FETCH_LOCATIONS_REQUEST,
						payload: product
					},
					{
						type: ActionTypes.FETCH_LOCATIONS_SUCCESS,
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
					type: ActionTypes.SELECT_LOCATION_TO_EDIT,
					payload: location
				}
			]

			store.dispatch(locations.selectLocationToEdit(location))
			expect(store.getActions()).toEqual(expectedActions)
		})
	})

	describe('.updateLocation', () => {
		it ('exists', () => {
			expect(locations.updateLocation).toBeDefined();
		})

		it ('Dispatches an UPDATE_LOCATION, UPDATE_LOCATION_SUCCESS, then FETCH_LOCATIONS', () => {
			const {
				mockOneLocation: mockLocation
			} = fixtures

			let expectedRequests = nock('http://localhost:8000')
				.put('/api/locations/'+mockLocation.id+'/', {...mockLocation, elevation: 10})
				.reply(200);

			let expectedActions = [
				{type: ActionTypes.UPDATE_LOCATION, payload:{...mockLocation, elevation: 10}},
				{type: ActionTypes.UPDATE_LOCATION_SUCCESS}
			]


			const store = mockStore();

			return store.dispatch(locations.updateLocation({...mockLocation, elevation: 10}))
				.then( () => {
					expect(store.getActions()).toEqual(expectedActions)
					expectedRequests.done()
				})
		})

		it ('Fails, and dispatches an UPDATE_LOCATION_ERROR', () => {
			const {
				mockOneLocation: mockLocation
			} = fixtures

			let expectedError = new Error("Request failed with status code 400");

			let expectedRequests = nock('http://localhost:8000')
				.put('/api/locations/'+mockLocation.id+'/', {...mockLocation, elevation: 10})
				.reply(400, expectedError);

			let expectedActions = [
				{type: ActionTypes.UPDATE_LOCATION, payload:{...mockLocation, elevation: 10}},
				{type: ActionTypes.UPDATE_LOCATION_ERROR, payload: expectedError}
			]

			const store = mockStore();

			return store.dispatch(locations.updateLocation({...mockLocation, elevation:10}))
				.then(() => {
					throw Error('Should have failed')
				})
				.catch( () => {
					expect(store.getActions()).toEqual(expectedActions)
				})

		})

	})

	describe('.createLocation', () => {
		it('exists', () => {
			expect(locations.createLocation).toBeDefined();
		})

		it ('Dispatches actions: CREATE_LOCATION, CREATE_LOCATION_SUCCESS', () => {
			const {
				mockOneLocation:location
			} = fixtures;

			const expectedRequests = nock('http://localhost:8000')
				.post('/api/locations/', location)
				.reply(200);
				
			let expectedActions = [
				{type: ActionTypes.CREATE_LOCATION, payload: location},
				{type: ActionTypes.CREATE_LOCATION_SUCCESS, payload: location}
			]

			const store = mockStore();

			return store.dispatch(locations.createLocation(location))
				.then ( () => {
					expect(store.getActions()).toEqual(expectedActions)
				});
		})

		it ("sends a POST request to API Locations endpoint", () => {
			const {
				mockOneLocation: location
			} = fixtures;

			const expectedRequests = nock('http://localhost:8000')
				.post('/api/locations/', location)
				.reply(200);

			const store = mockStore()

			return store.dispatch(locations.createLocation(location))
				.then ( () => {
					expectedRequests.done()
				})
		})
	})
})




