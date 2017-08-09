import React, {Component} from 'react';

import {connect} from 'react-redux';

import {createProduct} from '../actions/productsActions';

import ProductForm from './ProductForm';

export class ProductAdd extends Component {
	render() {

		return (
			<div>
				<ProductForm save={this.props.createProduct} />
			</div>
		)

	}
}
export class ProductAddContainer extends Component {
	render() {
		
		return (
			<ProductAdd createProduct= {(product) => {
				this.props.dispatch(createProduct(product))
			}} />
		)
	}
}

export default connect( (store) => {
	return {
		products: store.products
	}
}) (ProductAddContainer)