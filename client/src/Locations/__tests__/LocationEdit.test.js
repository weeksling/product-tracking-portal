import React from 'react';

import { shallow, mount, render } from 'enzyme';

import LocationEdit from '../LocationEdit';
import LocationForm from '../LocationForm';


describe('Location Edit component', () => {
	const location = {
		datetime: '2017-08-09',
		latitude: -47.9992,
		longitude: -44.111,
		elevation: 460
	}

	it('mounts without crashing', () => {
		expect(mount(<LocationEdit />).find('.location-edit').length).toBe(1);
	})

	it('contains a LocationForm element', () => {
		expect(shallow(<LocationEdit />).find(LocationForm).length).toBe(1);
	})

	it ('Provides its location prop to the LocationForm as existingLocation prop', () => {
		expect(shallow(<LocationEdit location={location} />).find(LocationForm).props()).toEqual({existingLocation:location})
	})
})