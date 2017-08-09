import React, {Component} from 'react';

import { fetchProducts } from '../actions/productsActions';

import ReactTable from 'react-table';

import { connect } from 'react-redux';

import ProductList from './ProductList';

export class ProductListContainer extends Component {
	componentDidMount() {
		this.props.dispatch(fetchProducts())
	}

	render() {
		let {
			loading,
			error,
			products
		} = this.props.products;

		return (
			<ProductList products = {products} />
		)
	}
}

export default connect( (store) => {
	return {
		products: store.products
	}
}) (ProductListContainer)

