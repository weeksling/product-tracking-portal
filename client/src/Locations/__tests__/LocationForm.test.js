import React from 'react';

import { shallow, mount, render } from 'enzyme'

import LocationForm from '../LocationForm';


describe('Location Form component', () => {

	const minProps = {
		save: function () {
			return
		}
	}

	const sampleEntry = {
		datetime: '2017-08-09',
		latitude: -47.9992,
		longitude: -44.111,
		elevation: 460
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
		expect(
			mount(<LocationForm {...minProps} existingLocation={sampleEntry} /> ).state('formValue')
		).toEqual(sampleEntry)
	})

	it('Calls this.props.save() when the "save" button is clicked', () => {
		let saveMock = jest.fn();

		const form = mount(<LocationForm save={saveMock} />)

		form.setState({
			formValue: sampleEntry
		})
		form.find('button').simulate('click')

		expect(saveMock).toHaveBeenCalledWith(sampleEntry);
	})
})
