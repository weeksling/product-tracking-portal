import React from 'react'
import { mount } from 'enzyme';

import LocationsView from '../LocationsView';

describe('Locations View', () => {
	it('Mounts without crashing', () => {
		expect(mount(<LocationsView />).find('.view--locations').length).toBe(1);
	});
})