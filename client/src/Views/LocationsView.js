import React from 'react';

import { Link } from 'react-router-dom';

import {LocationList, LocationAdd, LocationEdit} from "../Locations";

import {mockLocations} from '../fixtures.js';

export default class LocationsView extends React.Component {

  render() {
    return (
      <div className="view--locations">
      	<Link to='/'>Go Back</Link>
        <h2>locations</h2>
          <div>
            <LocationList locations={mockLocations} />
            <h3>ADD</h3>
            <LocationAdd />
            <h3>EDIT</h3>
            <LocationEdit />
          </div>
      </div>
    );
  }
}
