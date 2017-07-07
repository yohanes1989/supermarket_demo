export const ACTION_ADD_TO_CART = 'add_to_cart';
export const ACTION_REMOVE_FROM_CART = 'remove_from_cart';
export const ACTION_DECREASE_PRODUCT = 'decrease_product';

export const addToCart = (sku) => {
  return {
    type: ACTION_ADD_TO_CART,
    payload: sku
  };
};

export const removeFromCart = (sku) => {
  return {
    type: ACTION_REMOVE_FROM_CART,
    payload: sku
  };
};

export const decreaseProduct = (sku) => {
  return {
    type: ACTION_DECREASE_PRODUCT,
    payload: sku
  };
};
