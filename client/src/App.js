import React, { Component } from 'react';

import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';

import ProductsView from './Views/ProductsView';
import LocationsView from './Views/LocationsView';

import store from './store'


class App extends Component {

  render() {
    return (
      <div>
        <h1>Product Tracker</h1>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={ProductsView}/>
              <Route exact path="/:product_id" component={LocationsView}/>
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
