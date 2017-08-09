import React, {Component} from 'react';
import t from 'tcomb-form';



const ProductSchema = t.struct({
	product_id: t.Number, 
	description: t.String
})

export default class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit (event) {
		event.preventDefault()

		const value = this.refs.form.getValue()

		this.props.save(value);
	}

	render () {
		return (
			<form onSubmit={this.onSubmit}>
				<t.form.Form ref="form" type={ProductSchema} />
				<div className="form-group">
					<button type="submit" className="btn btn-primary">Save</button>
				</div>
			</form>
		)
	}
}