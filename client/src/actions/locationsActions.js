import * as ActionTypes from './ActionTypes';

import axios from 'axios';

export const fetchLocations = (product) => {
	return dispatch => {
		dispatch({
			type: ActionTypes.FETCH_LOCATIONS_REQUEST,
			payload: product
		})

		let request_url = product ? 'http://localhost:8000/api/locations/?product='+product.product_id : 'http://localhost:8000/api/locations/';

		return axios.get(request_url)
			.then( (response) => {
				dispatch({type: ActionTypes.FETCH_LOCATIONS_SUCCESS, payload: response.data})
			});
	}
}