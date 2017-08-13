import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LocationList, LocationAdd, LocationEdit } from "../Locations";

import { fetchLocations, selectLocationToEdit } from '../actions/locationsActions';

const mapStateToProps = state => ({
  locations: state.locations,

});

const mapDispatchToProps = dispatch => ({
  selectToEdit: product => dispatch(selectLocationToEdit(product)),
  fetchLocations: () => dispatch(fetchLocations())
});

export class LocationsViewContainer extends React.Component {

  componentDidMount () {
    this.props.fetchLocations();
  }

  render () {

    let {
      locations
    } = this.props.locations;

    return (
      <div className="view--locations">
      	<Link to='/'>Go Back</Link>
        <h2>locations</h2>
          <div>
            <LocationList locations={locations} />
            <h3>ADD</h3>
            <LocationAdd />
            <h3>EDIT</h3>
            <LocationEdit />
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationsViewContainer)


