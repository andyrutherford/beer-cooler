import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { coolerAddProduct, coolerUpdateQuantity } from '../actions/cooler';

const ProductItem = ({ beer, coolerAddProduct, coolerUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCoolerHandler = (e) => {
    e.preventDefault();
    coolerAddProduct(beer, parseInt(quantity));
    setQuantity(1);
    coolerUpdateQuantity();
  };

  return (
    <div className='card product-item'>
      <img className='card-img-top' src={beer.image_url} alt={beer.name} />
      <div className='card-body'>
        <Link to={`/beers/${beer.id}`}>
          <h5 className='card-title product-item'>{beer.name}</h5>
        </Link>
        <form onSubmit={addToCoolerHandler}>
          <div className='form-row'>
            <div className='col'>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type='number'
                className='form-control'
                placeholder='Quantity'
              />
            </div>
            <div className='col'>
              <input className='btn btn-primary' type='submit' value='Add' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { coolerAddProduct, coolerUpdateQuantity })(
  ProductItem
);
