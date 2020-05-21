import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProductItem = ({ beer }) => {
  return (
    <li className='product-item'>
      <Link to={`/beers/${beer.id}`}>
        <img src={beer.image_url} alt={beer.name} />
      </Link>
      <div className='product-item'>{beer.name}</div>
    </li>
  );
};
