import React from 'react';

import { mount, shallow } from 'enzyme';

import LocationAdd from '../LocationAdd';
import LocationForm from '../LocationForm';


describe('Location Add component', () => {

	test( 'It mounts without crashing', () => {
		expect( mount(<LocationAdd />).find('.location-add').length ).toBe(1);
	})

	test( 'It contains a LocationForm', () => {
		expect( mount(<LocationAdd />).find(LocationForm).length ).toBe(1);
	})

})