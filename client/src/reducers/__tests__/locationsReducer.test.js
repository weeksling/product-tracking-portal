// import reducers and ActionTypes
import locationsReducer from '../locationsReducer';
import * as types from '../../actions/ActionTypes';

import * as fixtures from '../../fixtures';

const initialState = {
	loading: false,
	locationToEdit: null,
	error: null
};


describe('Products Reducer', () => {
	it ('returns the initial state', () => {

		expect(
			locationsReducer( undefined, {} )
		).toEqual(initialState)
	})

	it ('sets loading to true when FETCH_LOCATIONS_REQUEST is dispatched', () => {
		expect(
			locationsReducer( initialState, {type: types.FETCH_LOCATIONS_REQUEST} )
		).toEqual({...initialState, loading: true})
	})

	describe('Dispatched FETCH_LOCATIONS_SUCCESS', () => {
		it ('sets loading to false', () => {
			expect(
				locationsReducer( { ...initialState, loading: true }, { type: types.FETCH_LOCATIONS_SUCCESS})
			).toEqual({...initialState, loading: false})
		})

		it ('sets locations to equal result', () => {
			expect(
				locationsReducer( { ...initialState }, { type: types.FETCH_LOCATIONS_SUCCESS, payload: fixtures.mockLocations } )
			).toEqual({...initialState, locations: fixtures.mockLocations})
		})
	})

	describe('FETCH_LOCATIONS_ERROR', () => {
		it ('sets loading to false', () => {

			let error = new Error('NETWORK_ERROR');
			expect(
				locationsReducer( {...initialState, loading: true }, { type: types.FETCH_LOCATIONS_ERROR, payload: error } )
			).toEqual( {...initialState, loading: false, error: error} )
		})
	})

	describe('SELECT_LOCATION_TO_EDIT', () => {
		it ('Sets locationToEdit to the payload', () => {
			let location = fixtures.mockOneLocation;

			expect(
				locationsReducer( {...initialState }, { type: types.SELECT_LOCATION_TO_EDIT, payload: location })
			).toEqual( { ...initialState, locationToEdit: location } );

		})
	})

	describe('UPDATE_LOCATION_SUCCESS', () => {
		it ('Sets locationToEdit back to null', () => {
			expect(
				locationsReducer( {...initialState, locationToEdit: fixtures.mockOneLocation }, { type: types.UPDATE_LOCATION_SUCCESS } )
			).toEqual( {...initialState, locationToEdit: null } )
		})
	})
})



