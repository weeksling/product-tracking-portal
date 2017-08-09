import React, {Component} from 'react';

import ProductForm from './ProductForm';

export class EditProduct extends Component {
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