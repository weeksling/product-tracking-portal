import React from 'react'
import { mount } from 'enzyme';

import {BrowserRouter as Router} from 'react-router-dom';

import LocationsView from '../LocationsView';

describe('Locations View', () => {
	it('Mounts without crashing', () => {
		expect(mount(<Router><LocationsView /></Router>).find('.view--locations').length).toBe(1);
	});
})