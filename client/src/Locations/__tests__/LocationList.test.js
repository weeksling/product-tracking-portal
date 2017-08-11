import React from 'react'

import { shallow, mount } from 'enzyme';


import LocationList from '../LocationList';
import {Location} from '../LocationList';

describe ('Location List component', () => {

	const minProps 				= { locations: null }
	const threeLocationsProps 	= { 
		locations: [ 
			{
		        "id": 1,
		        "product": {
		            "product_id": 1,
		            "description": "Cesna 122"
		        },
		        "longitude": "-81.8149807",
		        "latitude": "-81.8149807",
		        "elevation": 444,
		        "datetime": "2017-08-07T18:25:58Z"
		    },
		    {
		        "id": 2,
		        "product": {
		            "product_id": 1,
		            "description": "Cesna 122"
		        },
		        "longitude": "43.2583264",
		        "latitude": "-81.8149807",
		        "elevation": 500,
		        "datetime": "2016-10-12T17:00:00Z"
		    },
		    {
		        "id": 3,
		        "product": {
		            "product_id": 1,
		            "description": "Cesna 122"
		        },
		        "longitude": "42.5591120",
		        "latitude": "-79.2866930",
		        "elevation": 550,
		        "datetime": "2016-10-13T17:00:00Z"
		    }
		] }
	const twoLocationsProps 	= { 
		locations: [ 
			{
		        "id": 1,
		        "product": {
		            "product_id": 1,
		            "description": "Cesna 122"
		        },
		        "longitude": "-81.8149807",
		        "latitude": "-81.8149807",
		        "elevation": 444,
		        "datetime": "2017-08-07T18:25:58Z"
		    },
		    {
		        "id": 2,
		        "product": {
		            "product_id": 1,
		            "description": "Cesna 122"
		        },
		        "longitude": "43.2583264",
		        "latitude": "-81.8149807",
		        "elevation": 500,
		        "datetime": "2016-10-12T17:00:00Z"
		    }
		] }

	test('mounts without crashing', () => { 
		expect(mount(<LocationList {...minProps}/>).find('.location-list').length).toBe(1);
	})

	describe('Renders Locations', () => {
		it ('Displays 3 Location elements when there are 3 locations in props', () => {
			expect(
				shallow(<LocationList {...threeLocationsProps}/>).find(Location).length
			).toBe(3);
		})

		it ('Displays 5 Location elements for 5 locations in props', () => {
			expect(
				shallow(<LocationList {...twoLocationsProps}/>).find(Location).length
			).toBe(2);
		})

		it ('Assigns Locations a location prop from locations', () => {
			expect(
				shallow(<LocationList {...threeLocationsProps}/>).find(Location).at(0).props().location
			).toEqual(threeLocationsProps.locations[0])
		})
	})

	describe('Table Structure', () => {
		it ('Displays DATETIME, LONGITUDE, LATITUDE, ELEVATION, and EDIT', () => {
			let list = mount( <LocationList {...minProps} /> )

			expect( 
				list.find('th').length 
			).toBe(5);

			expect( 
				list.find('th').at(0).text()
			).toEqual('DATE/TIME')

			expect( 
				list.find('th').at(1).text()
			).toEqual('LONGITUDE')

			expect( 
				list.find('th').at(2).text()
			).toEqual('LATITUDE')

			expect( 
				list.find('th').at(3).text()
			).toEqual('ELEVATION')

			expect(
				list.find('th').at(4).text()
			).toEqual('EDIT')
		})
	})

})


describe('Location component', () => {
	const minProps	= { 
		location: {
	        "id": 1,
	        "product": {
	            "product_id": 1,
	            "description": "Cesna 122"
	        },
	        "longitude": "-79.8149807",
	        "latitude": "-81.8149807",
	        "elevation": 444,
	        "datetime": "2017-08-07T18:25:58Z"
	    }
	}

	test('mounts without crashing', () => {
		expect(mount(<Location {...minProps} />).find('.location').length).toBe(1);
	})

	test('it displays the DATETIME, LONGITUDE, LATITUDE, ELEVATION for each location', () => {
		let location = mount (<Location {...minProps} />)

		expect(
			location.find('td').length
		).toBe(5)

		expect( 
			location.find('td').at(0).text()
		).toEqual(minProps.location.datetime)

		expect( 
			location.find('td').at(1).text()
		).toEqual(String(minProps.location.longitude))

		expect( 
			location.find('td').at(2).text()
		).toEqual(String(minProps.location.latitude))

		expect( 
			location.find('td').at(3).text()
		).toEqual(String(minProps.location.elevation))
	})

	describe('EDIT button', () => {
		let location = mount(<Location {...minProps} />)

		it('Contains an edit button', () => {
			expect(
				location.find('td').at(4).find('.location__edit-button').length
			).toBe(1)
		})

		test ('Pressing the button should call selectLocationToEdit()', () => {
			let selectLocationToEditMock = jest.fn();

			mount(<Location {...minProps} selectLocationToEdit={selectLocationToEditMock} />).find('.location__edit-button').simulate('click')
			expect(selectLocationToEditMock).toHaveBeenCalledWith(minProps.location);
		})

	})
})


