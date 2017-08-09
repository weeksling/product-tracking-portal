import React, {Component} from 'react';


import { connect } from 'react-redux';

import { fetchProducts, selectProductToEdit } from '../actions/productsActions';


const Loading = () => <p>Loading...</p>

export class Product extends Component {
	render() {
		let {
			product
		} = this.props;

		return (
			<tr>
				<td>{product.product_id}</td>
				<td>{product.description}</td>
				<td><button onClick={ e => { this.props.selectToEdit(product) } }>edit</button></td>
			</tr>
		)
	}
}

export class ProductList extends Component {
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
				<table>
					<tbody>
					{products.map( (product, index) =>{
						return <Product product={product} key={index} selectToEdit={this.props.selectToEdit} />
					})}
					</tbody>
				</table>
			</div>
		)
	}
}

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

		if (loading) {
			return <Loading />
		}

		if (error) {
			return <p>There's been an error</p>
		}

		return (
			<ProductList products = {products}
				selectToEdit = { product => {
					console.log(product)
					this.props.dispatch(selectProductToEdit(product))
				}} />
		)
	}
}

export default connect( (store) => {
	return {
		products: store.products
	}
}) (ProductListContainer)