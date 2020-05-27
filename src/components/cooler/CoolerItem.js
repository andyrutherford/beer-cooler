import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  coolerUpdateQuantity,
  coolerRemoveProduct,
} from '../../actions/cooler';

const CoolerItem = ({ item, coolerUpdateQuantity, coolerRemoveProduct }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantityHandler = (e) => {
    e.preventDefault();
    coolerUpdateQuantity(item.id, parseInt(quantity));
  };

  const removeProductHandler = () => {
    coolerRemoveProduct(item.id);
  };

  return (
    <li className='card cooler-item'>
      <div className='cooler-item-image'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{item.name}</h5>
        <h6 className='card-subtitle mb-2 text-muted font-weight-light font-italic'>
          {item.tagline}
        </h6>
        <p>ABV: {item.abv}</p>
        <p className='card-text'>{item.description}</p>
        <form onSubmit={updateQuantityHandler}>
          <div className='form-row'>
            <label>Quantity: </label>
            <div>
              <input
                type='number'
                className='form-control'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className='col'>
              <input className='btn btn-primary' type='submit' value='Update' />
            </div>
          </div>
        </form>
        <button className='btn btn-danger' onClick={removeProductHandler}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default connect(null, { coolerUpdateQuantity, coolerRemoveProduct })(
  CoolerItem
);
