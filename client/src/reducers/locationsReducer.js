import * as Actions from '../actions/ActionTypes';


const initialState = {
	loading: false,
	locationToEdit: null,
	error: null
}

export default (state=initialState, action) => {

	console.log(state)
	switch (action.type) {
		case Actions.FETCH_LOCATIONS_REQUEST:
			return {
				...state,
				error: state.error ? state.error : null,
				loading: true
			}
		case Actions.FETCH_LOCATIONS_SUCCESS:
			return {
				...state,
				loading: false,
				locations: action.payload
			}
		case Actions.FETCH_LOCATIONS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case Actions.SELECT_LOCATION_TO_EDIT:
			return {
				...state,
				locationToEdit: action.payload
			}
		case Actions.UPDATE_LOCATION_SUCCESS:
			return {
				...state,
				locationToEdit: null
			}
		case Actions.UPDATE_LOCATION_ERROR:
			return {
				...state,
				error: action.payload
			}
		default:
			return {
				...state
			}
	}
}