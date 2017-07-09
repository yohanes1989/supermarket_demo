import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProductList from './ProductList';
import CartSummary from './CartSummary';

class App extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Products
                  <div className="pull-right">
                    <Link className="btn btn-xs btn-default" to="/catalog-form">Edit Catalog</Link>
                  </div>
                </div>
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
