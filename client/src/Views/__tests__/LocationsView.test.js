import React from 'react'
import { Provider } from 'react-redux';


import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promises from 'redux-promise-middleware';


import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import { mockLocations } from '../../fixtures';

import { LocationsViewContainer as LocationsView } from '../LocationsView';


const middleWares = [promises(), thunk];
const mockStore = configureMockStore(middleWares);


describe('Locations View', () => {
	it('Mounts without crashing', () => {
		let fetchSpy = jest.fn()

		let props = {
			locations: mockLocations,
			fetchLocations: fetchSpy
		}
		expect(mount(<Router><LocationsView {...props} /></Router>).find('.view--locations').length).toBe(1);

		expect(fetchSpy).toHaveBeenCalled();
	});
})