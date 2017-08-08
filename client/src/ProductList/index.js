import React, {Component} from 'react';

import { fetchProducts } from '../actions/productsActions';

import ReactTable from 'react-table';

import { connect } from 'react-redux';


const ProductList = React.createClass({
	render() {
		let {
			products
		} = this.props;

		const columns = [
			{
				Header: 'id',
				accessor: 'id' 
			}, {
				Header: 'description',
				accessor: 'description'
			},
			{
		  		Header: 'track',
				Cell: props => <span className='number'><button>View Details</button></span> 
		  	}
		]

		if (!products) {
			return (
				<p>No data</p>
			)
		}
		return (
			<div>
				<ReactTable 
					data = {products}
					columns = {columns}/>
			</div>
		)
	}
})

class ProductListContainer extends Component {
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

