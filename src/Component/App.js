import React, { Component } from 'react';

import ProductList from './ProductList';
import CartSummary from './CartSummary';
import Checkout from '../supermarket_checkout/dist/Checkout';
import catalogData from '../catalogData';

class App extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-heading">Products</div>
                <div className="panel-body">
                  <ProductList />
                </div>
              </div>
            </div>
            <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">Summary</div>
              <div className="panel-body">
                <CartSummary />
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
