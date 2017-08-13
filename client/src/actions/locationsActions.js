import * as ActionTypes from './ActionTypes';

import moment from 'moment';

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
			})
	}
}

export const selectLocationToEdit = (location) => {
	return {
		type: ActionTypes.SELECT_LOCATION_TO_EDIT,
		payload: location
	}
}

export const updateLocation = (location) => {
	return dispatch => {
		let update = {
			...location,
			longitude: parseFloat(location.longitude),
			latitude: parseFloat(location.latitude)
		}

		dispatch({ type: ActionTypes.UPDATE_LOCATION, payload: {...location} })

		return axios.put('http://localhost:8000/api/locations/'+location.id+'/', {...location})
			.then ( (response) => {
				dispatch({type: ActionTypes.UPDATE_LOCATION_SUCCESS})
			}, (err) => {
				dispatch({ type: ActionTypes.UPDATE_LOCATION_ERROR, payload: err })
			})
	}
}
