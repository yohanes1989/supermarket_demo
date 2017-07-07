import {
  ACTION_ADD_TO_CART,
  ACTION_REMOVE_FROM_CART,
  ACTION_DECREASE_PRODUCT
} from '../actions';

import Checkout from '../supermarket_checkout/dist/Checkout';
import catalogData from '../catalogData';

const checkout = new Checkout();
checkout.setCatalog(catalogData);

const INITIAL_STATE = {
  checkoutObject: checkout,
  catalog: checkout.getCatalog(),
  cartItems: checkout.getCartContent()
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_ADD_TO_CART:
      checkout.addToCart(action.payload);
      return {...state, cartItems: checkout.getCartContent()};
    case ACTION_REMOVE_FROM_CART:
      checkout.removeFromCart(action.payload);
      return {...state, cartItems: checkout.getCartContent()};
    case ACTION_DECREASE_PRODUCT:
      checkout.updateProductQuantity(action.payload, checkout.getProductQuantityInCart(action.payload) - 1);
      return {...state, cartItems: checkout.getCartContent()};
    default:
      return state;
  }
};
