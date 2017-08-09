import React from 'react';

import {ProductList, ProductAdd, ProductEdit} from "../Products";

export default class ProductsView extends React.Component {

  render() {
    return (
      <div>
        <h2>Products</h2>
          <div>
            <ProductList />
            <h3>ADD</h3>
            <ProductAdd />
            <h3>EDIT</h3>
            <ProductEdit />
          </div>
      </div>
    );
  }
}
