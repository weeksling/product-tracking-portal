import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LocationList, LocationAdd, LocationEdit } from "../Locations";

import { fetchLocations, selectLocationToEdit, updateLocation, createLocation } from '../actions/locationsActions';

const mapStateToProps = state => ({
  locations: state.locations,

});

const mapDispatchToProps = dispatch => ({
  selectToEdit: location => dispatch(selectLocationToEdit(location)),
  fetchLocations: query => dispatch(fetchLocations(query)),
  updateLocation: location => dispatch(updateLocation(location)),
  createLocation: location => dispatch(createLocation(location))
});

export class LocationsViewContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount () {

    let product_id = this.props.match.params.product_id
    this.props.fetchLocations({product_id});
  }

  handleCreate(newLocation) {
    let {
      createLocation,
      fetchLocations
    } = this.props;

    const product_id = this.props.match.params.product_id;

    newLocation.product = product_id;

    return createLocation(newLocation)
      .then ( () => {
        fetchLocations({ product_id })
      });
  }

  handleUpdate(location) {
    let {
      updateLocation,
      fetchLocations
    } = this.props;

    return updateLocation(location)
      .then ( ()=> {
        fetchLocations(this.props.match.params)
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
            <LocationAdd createLocation={this.handleCreate}/>
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


