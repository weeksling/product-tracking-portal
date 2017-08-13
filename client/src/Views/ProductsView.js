import React, {Component} from 'react';

import { connect } from 'react-redux';

import {ProductList, ProductAdd, ProductEdit} from "../Products";

import { fetchProducts, selectProductToEdit } from '../actions/productsActions';

const mapStateToProps = state => ({
  products: state.products,

});

const mapDispatchToProps = dispatch => ({
  selectToEdit: product => dispatch(selectProductToEdit(product)),
  fetchProducts: () => dispatch(fetchProducts())
});



export class ProductListContainer extends Component {
  componentDidMount() {
    console.log('FETCH PRODUCTS')
    this.props.fetchProducts()
  }

  render() {
    let {
      selectToEdit
    } = this.props;

    let {
      loading,
      error,
      products
    } = this.props.products;

    return (
      <div>
        <h2>Products</h2>
          <div>
            <ProductList 
              products = {products}
              error = {error}
              loading = {loading}
              selectProductToEdit = {selectToEdit} />
            <h3>ADD</h3>
            <ProductAdd />
            <h3>EDIT</h3>
            <ProductEdit />
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductListContainer)