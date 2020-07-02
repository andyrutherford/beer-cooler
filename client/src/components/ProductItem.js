import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { coolerAddProduct } from '../actions/cooler-action';

const ProductItem = ({ item, coolerAddProduct, isAuthenticated }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCoolerHandler = (e) => {
    e.preventDefault();
    coolerAddProduct(item, parseInt(quantity), isAuthenticated);
    setQuantity(1);
  };

  return (
    <div className='card product-item'>
      <div className='card-body d-flex flex-column justify-content-between'>
        <Link to={`/beers/${item.id}`} className='m-auto'>
          <img src={item.image_url} alt={item.name} />
        </Link>

        <Link to={`/beers/${item.id}`}>
          <h5 className='card-title product-item mt-2 mb-0'>{item.name}</h5>
        </Link>
      </div>
      <div className='card-footer'>
        <form onSubmit={addToCoolerHandler}>
          <div className='form-row justify-content-center'>
            <div className='col-4 col-md-5 col-lg-6'>
              <input
                value={quantity}
                min={1}
                max={999}
                onChange={(e) => setQuantity(e.target.value)}
                type='number'
                className='form-control quantity-input'
                placeholder='Quantity'
              />
            </div>
            <div className='col-4'>
              <button className='btn btn-primary' type='submit'>
                <i className='fas fa-cart-plus'></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { coolerAddProduct })(ProductItem);
