import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileAddress from '../profile/ProfileAddress';
import CheckoutPayment from './CheckoutPayment';

import { coolerCheckout } from '../../actions/cooler-action';

export const Checkout = ({ checkout, coolerCheckout }) => {
  const onSubmit = (e) => {
    coolerCheckout();
  };

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Checkout
      </h1>
      <ProfileAddress reviewOrder={true} />
      <CheckoutPayment />
      <div className='form-actions d-flex justify-content-between'>
        <Link to='/cooler' className='btn pull-left btn-link text-muted pl-0'>
          Back
        </Link>
        <div>
          <Link to='/' className='btn btn-link text-muted mr-3'>
            Reset
          </Link>

          <Link to='/review_order'>
            <button
              type='submit'
              className='btn btn-primary mb-1'
              onClick={onSubmit}
            >
              Review Your Order <i className='fas fa-chevron-right'></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.cooler.checkout,
});

export default connect(mapStateToProps, { coolerCheckout })(Checkout);
