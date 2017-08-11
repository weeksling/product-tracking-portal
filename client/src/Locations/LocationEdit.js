import React, {Component} from 'react';


import LocationForm from './LocationForm';

export default class LocationEdit extends Component {
	render() {
		return (
			<div className="location-edit">
				<LocationForm existingLocation={this.props.location}/>
			</div>
		)
	}
}
