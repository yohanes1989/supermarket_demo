import {
  ACTION_ADD_TO_CART,
  ACTION_REMOVE_FROM_CART,
  ACTION_DECREASE_PRODUCT,
  ACTION_FETCH_CATALOG
} from '../actions';

import Checkout from '../supermarket_checkout/dist/Checkout';

const checkout = new Checkout();

const INITIAL_STATE = {
  checkoutObject: checkout,
  catalog: {},
  products: [],
  cartItems: [],
  cartTotal: 0
};

export default (state = INITIAL_STATE, action) => {
  const { checkout: checkoutObject } = state;

  switch (action.type) {
    case ACTION_FETCH_CATALOG:
      const productsArray = [];

      Object.keys(action.payload).map((key) => {
        productsArray.push(action.payload[key]);
      });

      checkout.setCatalog(action.payload);
      return {...state, catalog: checkout.getCatalog(), products: productsArray, cartTotal: checkout.calculateTotal()};
    case ACTION_ADD_TO_CART:
      checkout.addToCart(action.payload);
      return {...state, cartItems: checkout.getCartContent(), cartTotal: checkout.calculateTotal()};
    case ACTION_REMOVE_FROM_CART:
      checkout.removeFromCart(action.payload);
      return {...state, cartItems: checkout.getCartContent(), cartTotal: checkout.calculateTotal()};
    case ACTION_DECREASE_PRODUCT:
      checkout.updateProductQuantity(action.payload, checkout.getProductQuantityInCart(action.payload) - 1);
      return {...state, cartItems: checkout.getCartContent(), cartTotal: checkout.calculateTotal()};
    default:
      return state;
  }
};
