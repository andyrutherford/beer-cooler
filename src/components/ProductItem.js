import React from 'react';

export const ProductItem = ({ beer }) => {
  return (
    <li className='product-item'>
      <img src={beer.image_url} />
      <div className='product-item'>{beer.name}</div>
    </li>
  );
};
