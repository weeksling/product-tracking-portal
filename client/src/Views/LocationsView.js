import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LocationList, LocationAdd, LocationEdit } from "../Locations";

import { fetchLocations, selectLocationToEdit, updateLocation } from '../actions/locationsActions';

const mapStateToProps = state => ({
  locations: state.locations,

});

const mapDispatchToProps = dispatch => ({
  selectToEdit: location => dispatch(selectLocationToEdit(location)),
  fetchLocations: () => dispatch(fetchLocations()),
  updateLocation: location => dispatch(updateLocation(location))
});

export class LocationsViewContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount () {
    this.props.fetchLocations();
  }

  handleUpdate(location) {
    let {
      updateLocation,
      fetchLocations
    } = this.props;

    return updateLocation(location)
      .then ( () => {
        return fetchLocations()
      })
  }

  render () {
    let {
      selectToEdit
    } = this.props;

    let {
      locations,
      locationToEdit
    } = this.props.locations;

    return (
      <div className="view--locations">
      	<Link to='/'>Go Back</Link>
        <h2>locations</h2>
          <div>
            <LocationList locations={locations} selectLocationToEdit={selectToEdit} />
            <h3>ADD</h3>
            <LocationAdd />
            <h3>EDIT</h3>
            <LocationEdit 
              updateLocation={this.handleUpdate}
              location={locationToEdit}/>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationsViewContainer)


