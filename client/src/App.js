import React, { Component } from 'react';

import store from './store'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProductsView from './Views/ProductsView';

import { Provider } from 'react-redux';


import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Product Tracker</h1>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={ProductsView}/>
              <Route patch="/locations/:id" component={ProductsView}/>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
