import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  coolerUpdateQuantity,
  coolerRemoveProduct,
} from '../../actions/cooler-action';

const CoolerItem = ({
  item,
  coolerUpdateQuantity,
  coolerRemoveProduct,
  isAuth,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantityHandler = (e) => {
    e.preventDefault();
    const guest = !isAuth;
    coolerUpdateQuantity(item.id, item.name, parseInt(quantity), guest);
  };

  const removeProductHandler = (e) => {
    e.preventDefault();
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  coolerUpdateQuantity,
  coolerRemoveProduct,
})(CoolerItem);
