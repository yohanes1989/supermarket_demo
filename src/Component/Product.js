import React from 'react';

const Product = ({ sku, price }) => {
  return (
    <div>
      <h3>SKU: { sku }</h3>
      <h4>Price: ${ price }</h4>
    </div>
  );
}

export default Product;
