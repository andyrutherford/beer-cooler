import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { coolerAddProduct } from '../actions/cooler';

const ProductItem = ({ item, coolerAddProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCoolerHandler = (e) => {
    e.preventDefault();
    coolerAddProduct(item, parseInt(quantity));
    setQuantity(1);
  };

  return (
    <div className='card product-item'>
      <Link to={`/beers/${item.id}`}>
        <img className='card-img-top' src={item.image_url} alt={item.name} />
      </Link>
      <div className='card-body'>
        <Link to={`/beers/${item.id}`}>
          <h5 className='card-title product-item'>{item.name}</h5>
        </Link>
        <form onSubmit={addToCoolerHandler}>
          <div className='form-row'>
            <div className='col-md-5'>
              <input
                value={quantity}
                min={1}
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

export default connect(null, { coolerAddProduct })(ProductItem);
