import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { coolerAddProduct } from '../actions/cooler';

const ProductItem = ({ beer, coolerAddProduct }) => {
  const addToCoolerHandler = (e) => {
    coolerAddProduct(beer);
  };

  return (
    <li className='product-item'>
      <Link to={`/beers/${beer.id}`}>
        <img src={beer.image_url} alt={beer.name} />
      </Link>
      <div className='product-item'>{beer.name}</div>
      <button className='btn' onClick={addToCoolerHandler}>
        Add to Cooler
      </button>
    </li>
  );
};

export default connect(null, { coolerAddProduct })(ProductItem);
