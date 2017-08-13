import React, {Component} from 'react';

export class Location extends Component {
	render() {

		let {
			location,
			selectLocationToEdit
		} = this.props;

		return (
			<tr className="location">
				<td>{location.datetime}</td>
				<td>{location.longitude}</td>
				<td>{location.latitude}</td>
				<td>{location.elevation}</td>
				<td><button onClick={ e => selectLocationToEdit(location) } className='location__edit-button'>EDIT</button></td>
			</tr>
		)
	}
}

export default class LocationList extends Component {
	render () {

		let {
			locations,
			selectLocationToEdit
		} = this.props;

		return (
			<div className="location-list">
				<table>
					<thead>
						<th>DATE/TIME</th>
						<th>LONGITUDE</th>
						<th>LATITUDE</th>
						<th>ELEVATION</th>
						<th>EDIT</th>
					</thead>
					<tbody>
					{ locations ? locations.map( (location, index) => <Location location={location} key={index} selectLocationToEdit/> ) : undefined }
					</tbody>
				</table>
			</div>
		)
	}
}
