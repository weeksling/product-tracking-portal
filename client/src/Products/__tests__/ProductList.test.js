import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { mockProducts } from '../../fixtures.js';

import { MemoryRouter as Router } from 'react-router-dom';

import ProductList, { Product, ErrorMsg, Loading } from '../ProductList';

describe('ProductList', () => {

	const minProps = {
		products: [],
		loading: false,
		error: null
	}

	test('It doesn\'t blow up', () =>{
		expect(
			mount(<Router><ProductList {...minProps} /></Router>).exists()
		).toBe(true);
	})

	test('Displays a Loading element if loading is true', () => {
		expect(
			mount(<Router><ProductList {...minProps} loading={true} /></Router>).find(Loading).length
		).toBe(1);
	})

	test('Displays an Error if error is defined', () => {
		expect(
			mount(<Router><ProductList {...minProps} error={new Error()}/></Router>).find(ErrorMsg).length
		).toBe(1)
	})

	test('renders 3 Product elements if 3 products in props', ()=>{
		expect(
			mount(<Router><ProductList {...minProps} products={mockProducts} /></Router>).find(Product).length
		).toBe(3);
	})


	describe('Snapshots', () => {
		test('It renders properly with 3 products', () => {
			const tree = renderer.create(
			    <Router><ProductList {...minProps} products={mockProducts} /></Router>
			  ).toJSON();

			  expect(tree).toMatchSnapshot();
		})

		test('It renders properly with loading===true', () => {
			const tree = renderer.create(
			    <Router><ProductList {...minProps} loading={true} /></Router>
			  ).toJSON();
			
			  expect(tree).toMatchSnapshot();
		})

		test('It renders properly with error', () => {
			const tree = renderer.create(
			    <Router><ProductList {...minProps} error={new Error()} /></Router>
			  ).toJSON();
			
			  expect(tree).toMatchSnapshot();
		})
	})

})