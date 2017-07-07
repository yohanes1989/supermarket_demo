import React, { Component } from 'react';

import ProductList from './ProductList';
import CartSummary from './CartSummary';
import Checkout from '../supermarket_checkout/dist/Checkout';
import catalogData from '../catalogData';

class App extends Component {
  handleAddToCart(sku) {
    this.checkout.addToCart(sku);
    this.setState({ ...this.state, cartItems: this.checkout.getCartContent() });
  }

  handleRemoveFromCart(sku) {
    this.checkout.removeFromCart(sku);
    this.setState({ ...this.state, cartItems: this.checkout.getCartContent() });
  }

  handleQuantityDecrease(sku) {
    this.checkout.updateProductQuantity(sku, this.checkout.getProductQuantityInCart(sku) - 1);
    this.setState({ ...this.state, cartItems: this.checkout.getCartContent() });
  }

  constructor(props) {
    super(props);

    this.checkout = new Checkout();
    this.checkout.setCatalog(catalogData);

    const productsArray = [];
    Object.keys(catalogData).map((key) => {
      productsArray.push(catalogData[key]);
    });

    this.products = productsArray;

    this.state = {
      cartItems: this.checkout.getCartContent()
    };
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-heading">Products</div>
                <div className="panel-body">
                  <ProductList products={this.products} onAddToCart={this.handleAddToCart.bind(this)} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">Summary</div>
              <div className="panel-body">
                <CartSummary
                  checkoutObject={this.checkout}
                  cartItems={this.state.cartItems}
                  onQuantityIncrease={this.handleAddToCart.bind(this)}
                  onQuantityDecrease={this.handleQuantityDecrease.bind(this)}
                  onRemoveLineItem={this.handleRemoveFromCart.bind(this)} />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
