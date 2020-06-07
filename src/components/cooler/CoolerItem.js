import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  coolerUpdateQuantity,
  coolerRemoveProduct,
} from '../../actions/cooler-action';

const CoolerItem = ({ item, coolerUpdateQuantity, coolerRemoveProduct }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantityHandler = (e) => {
    e.preventDefault();
    coolerUpdateQuantity(item.id, parseInt(quantity));
  };

  const removeProductHandler = () => {
    console.log('frm');
    coolerRemoveProduct(item.id, item.name);
  };

  return (
    <li className='card cooler-item'>
      <div className='cooler-item-image'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className='card-body'>
        <h2 className='card-title'>
          <Link to={`/beers/${item.id}`}>{item.name}</Link>
        </h2>
        <h6 className='card-subtitle mb-2 text-muted font-weight-light font-italic'>
          {item.tagline}
        </h6>
        <p>ABV: {item.abv}</p>
        <p className='card-text'>{item.description}</p>
        <form onSubmit={updateQuantityHandler}>
          <div className='form-row'>
            <label className='col'>Quantity: </label>
            <div className='col'>
              <input
                type='number'
                className='form-control'
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className='col'>
              <input className='btn btn-primary' type='submit' value='Update' />
            </div>
            <div className='col'>
              <button className='btn btn-danger' onClick={removeProductHandler}>
                Remove
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
  );
};

export default connect(null, { coolerUpdateQuantity, coolerRemoveProduct })(
  CoolerItem
);
