import React, { Component } from 'react';

import store from './store'

import { Provider } from 'react-redux';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h2>Product List</h2>
        <Provider store={store}>
          <p>This needs to show the product list</p>
        </Provider>
      </div>
    );
  }
}

export default App;
