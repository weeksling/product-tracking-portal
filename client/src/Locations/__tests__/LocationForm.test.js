import React from 'react';

import { shallow, mount, render } from 'enzyme'

import LocationForm from '../LocationForm';

import * as fixtures from '../../fixtures';

describe('Location Form component', () => {

	const minProps = {
		save: function () {
			return
		}
	}

	it('Mounts without crashing', () => {
		expect(mount(<LocationForm {...minProps}/>).find('.location-form').length).toBe(1)
	})

	it('Contains 4 input fields', () => {
		expect(mount(<LocationForm  {...minProps}/>).find('input').length).toBe(4);
	})

	it('Initializes with empty formValue', () => {
		expect(
			mount(<LocationForm {...minProps}/>).state('formValue')
		).toEqual({})
	})

	it('Sets state.formValue to the provided existingLocation prop (if included)', () => {
		const {
			mockOneLocation: location
		} = fixtures

		expect(
			mount(<LocationForm {...minProps} existingLocation={location} /> ).state('formValue')
		).toEqual(location)
	})

	it('Calls this.props.save() when the "save" button is clicked', () => {
		let saveMock = jest.fn();

		const form = mount(<LocationForm save={saveMock} />)

		form.setState({
			formValue: fixtures.mockOneLocation
		})
		form.find('button').simulate('click')

		expect(saveMock).toHaveBeenCalledWith(fixtures.mockOneLocation);
	})
})
