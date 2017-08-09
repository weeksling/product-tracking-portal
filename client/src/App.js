import React, { Component } from 'react';

import store from './store'

import { Provider } from 'react-redux';

import ProductList from "./ProductList";

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <h2>Product List</h2>
        <Provider store={store}>
          <ProductList />
        </Provider>
      </div>
    );
  }
}

export default App;
