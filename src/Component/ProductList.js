import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';
import { addToCart } from '../actions';

class ProductList extends Component {
  renderProduct({ sku, price }) {
    return (
      <div key={sku} className="col-xs-6 col-md-4">
        <div style={{ border: '1px solid #000', padding: '10px 20px' }} className="text-center">
          <Product sku={sku} price={price} />
          <button onClick={ () => this.props.addToCart(sku) } className="btn btn-primary">
            <i className="glyphicon glyphicon-shopping-cart"></i>
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { products } = this.props;

    if (products.length > 0) {
      return <div className="row">{ products.map(this.renderProduct.bind(this)) }</div>;
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const productsArray = [];

  Object.keys(state.checkout.catalog).map((key) => {
    productsArray.push(state.checkout.catalog[key]);
  });

  return {
    products: productsArray
  };
};

export default connect(mapStateToProps, { addToCart })(ProductList);
