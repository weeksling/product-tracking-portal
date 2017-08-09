import React from 'react';
import { mount, shallow } from 'enzyme';

import ProductList, { Product } from '../ProductList';

describe('ProductList', () => {

	const minProps = {
		products: []
	}

	const threeProducts = [ {}, {}, {} ];

	test('It doesn\'t blow up', () =>{
		expect(
			shallow(<ProductList {...minProps} />).exists()
		).toBe(true);
	})

	test('Displays "No data" if no products in props', () => {
		expect(
			shallow(<ProductList {...minProps} />).contains(<p>No data</p>)
		).toBe(true);
	})

	test('renders 3 Product elements if 3 products in props', ()=>{
		expect(
			shallow( <ProductList products={threeProducts} />).find(Product).length
		).toBe(3);
	})
})