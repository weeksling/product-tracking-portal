import React, {Component} from 'react';


import LocationForm from './LocationForm';

export default class LocationEdit extends Component {
	render() {
		return (
			<div className="location-edit">
				<LocationForm save={this.props.updateLocation} existingLocation={this.props.location}/>
			</div>
		)
	}
}
