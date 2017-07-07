import React from 'react';

const CartSummary = (props) => {
  const { checkoutObject, cartItems, onRemoveLineItem, onQuantityIncrease, onQuantityDecrease } = props;

  if (cartItems.length == 0) {
    return (
      <div style={{ margin: 0 }} className="text-center alert alert-warning">
        No item added yet.
      </div>
    );
  }

  const renderPrice = (netPrice, originalPrice) => {
    if (netPrice == originalPrice) {
      return `\$${netPrice}`;
    } else {
      return '<del>$' + originalPrice + '</del>' + ` \$${netPrice}`;
    }
  };

  const renderLineItem = (cartItem, index) => {
    const  { sku, quantity } = cartItem;
    const product = checkoutObject.getProduct(cartItem.sku);

    return (
      <tr key={index}>
        <td>{sku}</td>
        <td>{product.price}</td>
        <td>
          {quantity + ' '}
          <div className="btn-group btn-group-xs">
            <button onClick={() => onQuantityIncrease(sku)} className="btn btn-default">
              <i className="glyphicon glyphicon-plus"></i>
            </button>

            <button onClick={() => onQuantityDecrease(sku)} className="btn btn-default">
              <i className="glyphicon glyphicon-minus"></i>
            </button>
          </div>
        </td>
        <td dangerouslySetInnerHTML={{__html: renderPrice(checkoutObject.calculateLineItem(cartItem), product.price * quantity) }} />
        <td>
          <button onClick={() => onRemoveLineItem(sku)} className="btn btn-xs btn-danger">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
        </td>
      </tr>
    );
  };

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
        {cartItems.map(renderLineItem)}
        </tbody>
      </table>
      <div style={{ margin: 0, fontSize: 18 }} className="text-center alert alert-success">
        <strong>${checkoutObject.calculateTotal()}</strong>
      </div>
    </div>
  );
}

export default CartSummary;
