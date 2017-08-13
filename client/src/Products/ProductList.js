import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchProducts, selectProductToEdit } from '../actions/productsActions';


const Loading = () => <p>Loading...</p>

export class Product extends Component {
	render() {
		let {
			product,
			selectToEdit
		} = this.props;

		return (
			<tr>
				<td>{product.product_id}</td>
				<td>{product.description}</td>
				<td><button onClick={ e => { selectToEdit(product) } }>edit</button></td>
				<td><button><Link to={"/"+product.product_id}>Track Locations</Link></button></td>
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
					<thead>
						<th>Id</th>
						<th>Description</th>
					</thead>
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
