import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { coolerAddProduct } from '../actions/cooler';

const ProductItem = ({ beer, coolerAddProduct }) => {
  const addToCoolerHandler = (e) => {
    coolerAddProduct(beer);
  };

  return (
    <div className='card product-item'>
      <img className='card-img-top' src={beer.image_url} alt={beer.name} />
      <div className='card-body'>
        <Link to={`/beers/${beer.id}`}>
          <h5 className='card-title product-item'>{beer.name}</h5>
        </Link>
        <button className='btn btn-primary' onClick={addToCoolerHandler}>
          Add to Cooler
        </button>
      </div>
    </div>
  );
};

export default connect(null, { coolerAddProduct })(ProductItem);
