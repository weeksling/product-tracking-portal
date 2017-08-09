import React, {Component} from 'react';

import { connect } from 'react-redux';

import { updateProduct } from '../actions/productsActions';

import ProductForm from './ProductForm';

export class ProductEdit extends Component {
	render() {
		let {
			updateProduct,
			product
		} = this.props;


		return (
			<div>
				<ProductForm save={updateProduct} existingProduct={product} />
			</div>
		)
	}
}

export class ProductEditContainer extends Component {
	render() {
		let {
			productToEdit
		} = this.props.products;


		return (
			<ProductEdit 
				product = {productToEdit}
				updateProduct = { product => { this.props.dispatch(updateProduct(product)) } }/>
		)
	}
}

export default connect( (store) => {
	return {
		products: store.products
	}
}) (ProductEditContainer)
