import React, {Component} from 'react';
import t from 'tcomb-form';



const ProductSchema = t.struct({
	//product_id: t.Number, 
	description: t.String
})

export default class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			formValue: {}
		}

	}

	componentWillReceiveProps (nextProps) {
		console.log({nextProps})
		if (nextProps.existingProduct) {
			this.setState({formValue: nextProps.existingProduct})
		}
	}

	onSubmit (event) {
		event.preventDefault()

		//const value = this.refs.form.getValue()

		this.props.save(this.state.formValue);
	}

	handleChange (formValue) {
		console.log('UPDATE', formValue)
		this.setState({formValue})
	}

	render () {
		return (
			<form onSubmit={this.onSubmit}>
				<t.form.Form ref="form" type={ProductSchema} value={this.state.formValue} onChange={this.handleChange}/>
				<div className="form-group">
					<button type="submit" className="btn btn-primary">Save</button>
				</div>
			</form>
		)
	}
}