export const ACTION_ADD_TO_CART = 'add_to_cart';

export const addToCart = sku => {
  return {
    type: ACTION_ADD_TO_CART,
    payload: sku
  };
};
