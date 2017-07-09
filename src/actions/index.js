export const ACTION_FETCH_CATALOG = 'fetch_catalog';
export const ACTION_SAVE_CATALOG = 'save_catalog';
export const ACTION_ADD_TO_CART = 'add_to_cart';
export const ACTION_REMOVE_FROM_CART = 'remove_from_cart';
export const ACTION_DECREASE_PRODUCT = 'decrease_product';

let CATALOG_API_PATH = 'http://localhost:3000/api';

if (process.env.NODE_ENV === 'production') {
  CATALOG_API_PATH = 'http://nodejs.webpresso.co.id/supermarket_demo_catalog/api';
}

export const fetchCatalog = (onCompleteCallback) => {
  const FETCH_URL = CATALOG_API_PATH + '/catalog';

  return (dispatch) => {
    fetch(FETCH_URL)
      .then(response => response.json())
      .then(results => {
        if (onCompleteCallback) {
          onCompleteCallback();
        }

        dispatch({
          type: ACTION_FETCH_CATALOG,
          payload: results
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ACTION_FETCH_CATALOG,
          payload: []
        });
      });
  };
};

export const saveCatalog = (values, onCompleteCallback) => {
  const SAVE_CATALOG_URL = CATALOG_API_PATH + '/catalog';

  fetch(SAVE_CATALOG_URL, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((result) => {
      if(onCompleteCallback) {
        onCompleteCallback();
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    type: ACTION_SAVE_CATALOG,
    payload: null
  };
};

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
