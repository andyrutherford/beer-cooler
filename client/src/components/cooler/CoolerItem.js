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
  const [quantityChanged, setQuantityChanged] = useState(false);

  const updateQuantityHandler = (e) => {
    e.preventDefault();
    const guest = !isAuth;
    coolerUpdateQuantity(item.id, item.name, parseInt(quantity), guest);
    setQuantityChanged(false);
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
        <p className='d-none d-sm-block'>{item.abv} ABV</p>
        <p className='card-text d-none d-sm-block'>{item.description}</p>
        <form onSubmit={updateQuantityHandler}>
          <div className='form-row m-auto'>
            <label className='align-self-center mr-2 mb-0'>Quantity: </label>

            <input
              type='number'
              className='form-control quantity-input col-3 col-lg-2 mr-2'
              value={quantity}
              min={1}
              onChange={(e) => {
                setQuantityChanged(true);
                setQuantity(e.target.value);
              }}
            />

            <button
              className='btn btn-link mr-2 p-2'
              type='submit'
              disabled={!quantityChanged}
            >
              <i className='fas fa-check fa-lg'></i>
            </button>

            <button
              className='btn text-danger btn-link p-2'
              onClick={removeProductHandler}
            >
              <i className='fas fa-trash-alt fa-lg'></i>
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
