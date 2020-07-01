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
    <li className='card cooler-item mb-4'>
      <div className='card-body cooler-item-image m-auto'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className='card-body d-flex flex-column justify-content-between'>
        <h2 className='card-title'>
          <Link to={`/beers/${item.id}`}>{item.name}</Link>
        </h2>
        <h6 className='card-subtitle mb-2 text-muted font-weight-light font-italic'>
          {item.tagline}
        </h6>
        <p>ABV: {item.abv}</p>
        <p className='card-text'>{item.description}</p>
        <form onSubmit={updateQuantityHandler}>
          <div className='form-row m-auto'>
            <label className='align-self-center mr-2 mb-0'>Quantity: </label>

            <input
              type='number'
              className='form-control col-3 mr-2'
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button className='btn btn-primary mr-2' type='submit'>
              <i className='fas fa-check'></i>
            </button>

            <button className='btn btn-danger' onClick={removeProductHandler}>
              <i className='fas fa-trash-alt'></i>
            </button>
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
