import React, {Component} from 'react';

import { Link } from 'react-router-dom';


export const Loading = () => <p>Loading...</p>

export const ErrorMsg = () => <p>There's been an error</p>

export class Product extends Component {
	render() {
		let {
			product,
			selectProductToEdit
		} = this.props;

		return (
			<tr>
				<td>{product.product_id}</td>
				<td>{product.description}</td>
				<td><button onClick={ e => { selectProductToEdit(product) } }>edit</button></td>
				<td><button><Link to={"/"+product.product_id}>Track Locations</Link></button></td>
			</tr>
		)
	}
}

export default class ProductList extends Component {
	render() {
		let {
			loading,
			error,
			products,
			selectProductToEdit
		} = this.props;

		if (loading) {
	      return <Loading />
	    }

	    if (error) {
	      return <ErrorMsg />
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
						return <Product product={product} key={index} selectProductToEdit={selectProductToEdit} />
					})}
					</tbody>
				</table>
			</div>
		)
	}
}

