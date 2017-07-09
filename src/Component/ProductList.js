import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';
import { addToCart, fetchCatalog } from '../actions';

class ProductList extends Component {
  componentWillMount() {
    this.props.fetchCatalog();
  }

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
    } else {
      return <div className="text-center">Loading products...</div>;
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.checkout.products
  };
};

export default connect(mapStateToProps, { addToCart, fetchCatalog })(ProductList);
