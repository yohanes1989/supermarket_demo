import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCart, removeFromCart, decreaseProduct } from '../actions';

class CartSummary extends Component {
  renderPrice(netPrice, originalPrice) {
    if (netPrice == originalPrice) {
      return `\$${netPrice}`;
    } else {
      return '<del>$' + originalPrice + '</del>' + ` \$${netPrice}`;
    }
  };

  renderLineItem(cartItem, index) {
    const { checkoutObject, addToCart, decreaseProduct, removeFromCart } = this.props;

    const  { sku, quantity } = cartItem;
    const product = checkoutObject.getProduct(cartItem.sku);

    return (
      <tr key={index}>
        <td>{sku}</td>
        <td>{product.price}</td>
        <td>
          {quantity + ' '}
          <div className="btn-group btn-group-xs">
            <button onClick={() => addToCart(sku)} className="btn btn-default">
              <i className="glyphicon glyphicon-plus"></i>
            </button>

            <button onClick={() => decreaseProduct(sku)} className="btn btn-default">
              <i className="glyphicon glyphicon-minus"></i>
            </button>
          </div>
        </td>
        <td dangerouslySetInnerHTML={{__html: this.renderPrice(checkoutObject.calculateLineItem(cartItem), product.price * quantity) }} />
        <td>
          <button onClick={() => removeFromCart(sku)} className="btn btn-xs btn-danger">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
        </td>
      </tr>
    );
  };

  render() {
    const { cartItems, checkoutObject, cartTotal } = this.props;

    if (cartItems.length == 0) {
      return (
        <div style={{ margin: 0 }} className="text-center alert alert-warning">
          No item added yet.
        </div>
      );
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
          {cartItems.map(this.renderLineItem.bind(this))}
          </tbody>
        </table>
        <div style={{ margin: 0, fontSize: 18 }} className="text-center alert alert-success">
          <strong>${cartTotal}</strong>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkoutObject: state.checkout.checkoutObject,
    cartItems: state.checkout.cartItems,
    cartTotal: state.checkout.cartTotal
  };
};

export default connect(mapStateToProps, { addToCart, removeFromCart, decreaseProduct })(CartSummary);
