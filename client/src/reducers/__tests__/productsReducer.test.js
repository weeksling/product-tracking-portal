import reducer from '../productsReducer';
import * as types from '../../actions/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	productToEdit: null,
	products: []
};


describe('productsReducer', () => {

	test('it returns the initial state', () => {
		expect( reducer(undefined, {}) )
			.toEqual(initialState)
	} )

	it ('on FETCH_PRODUCTS_REQUEST, sets loading true', () => {
		
		expect( reducer(initialState, { type:types.FETCH_PRODUCTS_REQUEST }) )
			.toEqual({
				...initialState,
				loading: true
			})
	})

	it ('on FETCH_PRODUCTS_SUCCESS, sets loading to false, and products to result', () => {
		expect( 
			reducer(
				{...initialState, loading: true}, 
				{ 
					type: types.FETCH_PRODUCTS_SUCCESS,
					payload: [{id: 1, description:'hello'}]
				} 
			))
			.toEqual({
				...initialState,
				loading: false,
				products: [{id: 1, description:'hello'}]

			})	
	})

})


