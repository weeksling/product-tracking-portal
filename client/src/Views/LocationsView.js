import React from 'react';

import {LocationList, LocationAdd, LocationEdit} from "../Locations";

const DEMO_LOCATIONS = [
    {
        "id": 1,
        "product": {
            "product_id": 1,
            "description": "Cesna 122"
        },
        "longitude": "-81.8149807",
        "latitude": "-81.8149807",
        "elevation": 444,
        "datetime": "2017-08-07T18:25:58Z"
    },
    {
        "id": 2,
        "product": {
            "product_id": 1,
            "description": "Cesna 122"
        },
        "longitude": "43.2583264",
        "latitude": "-81.8149807",
        "elevation": 500,
        "datetime": "2016-10-12T17:00:00Z"
    },
    {
        "id": 3,
        "product": {
            "product_id": 1,
            "description": "Cesna 122"
        },
        "longitude": "42.5591120",
        "latitude": "-79.2866930",
        "elevation": 550,
        "datetime": "2016-10-13T17:00:00Z"
    }
]

export default class LocationsView extends React.Component {

  render() {
    return (
      <div className="view--locations">
        <h2>locations</h2>
          <div>
            <LocationList locations={DEMO_LOCATIONS} />
            <h3>ADD</h3>
            <LocationAdd />
            <h3>EDIT</h3>
            <LocationEdit />
          </div>
      </div>
    );
  }
}
