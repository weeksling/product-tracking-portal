import React, {Component} from 'react';
import t from 'tcomb-form';

import PropTypes from 'prop-types';

const LocationSchema = t.struct({
	datetime: t.String,
	longitude: t.Number,
	latitude: t.Number,
	elevation: t.Number
})

export default class LocationForm extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);

		if (props.existingLocation){
			this.state = {
				formValue: props.existingLocation
			}
		} else {
			this.state = {
				formValue: {}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		let {
			existingLocation
		} = nextProps;

		if (existingLocation) {
			this.setState({ formValue: existingLocation })
		}
		else if (this.props.existingLocation) {
			this.setState({ formValue: null })
		}
	}

	handleChange(formValue) {
		this.setState({ formValue });
	}

	handleSave(e) {
		e.preventDefault()

		this.props.save(this.state.formValue)
	}

	render() {
		console.log(this.state)
		let {
			formValue
		} = this.state;

		return (
			<form className="location-form">
				<t.form.Form type={LocationSchema} value={formValue} onChange={this.handleChange} />
				<button onClick={ this.handleSave }>Save</button>
			</form>
		)
	}
}

LocationForm.propTypes = {
	save: PropTypes.func.isRequired
}
