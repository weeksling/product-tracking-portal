import React, { Component } from 'react';

import store from './store'

import { Provider } from 'react-redux';

import {ProductList, ProductAdd, ProductEdit} from "./Products";

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <h2>Product List</h2>
        <Provider store={store}>
          <div>
            <ProductList />
            <h3>ADD</h3>
            <ProductAdd />
            <h3>EDIT</h3>
            <ProductEdit />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
