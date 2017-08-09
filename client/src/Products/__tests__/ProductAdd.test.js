import React from 'react';

import { mount, shallow } from 'enzyme';

import {ProductAdd} from '../ProductAdd';

describe('Product Add Form', () => {

	test('it can mount', () => {
		expect(
			mount(<ProductAdd />).exists()
		)
		.toBe(true);
	});

})
