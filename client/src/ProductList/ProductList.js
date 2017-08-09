import React, {Component} from 'react';

import { fetchProducts } from '../actions/productsActions';

import {Table} from 'material-ui/Table';

import { connect } from 'react-redux';


export class Product extends Component {
	render() {
		let {
			product
		} = this.props;

		return (
			<tr>
				<td>{product.product_id}</td>
				<td>{product.description}</td>
			</tr>
		)
	}
}

class ProductList extends Component {
	render() {
		let {
			products
		} = this.props;

		if (!products.length) {
			return (
				<p>No data</p>
			)
		}
		return (
			<div>
				<Table>
					{products.map( (product, index) =>{
						return <Product product={product} key={index} />
					})}
				</Table>
			</div>
		)
	}
}

export default ProductList;

