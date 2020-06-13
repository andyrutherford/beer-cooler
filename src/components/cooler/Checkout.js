import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileAddress from '../profile/ProfileAddress';
import CheckoutPayment from './CheckoutPayment';
import './ReviewOrder.css';

export const Checkout = () => {
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
          <button type='submit' className='btn btn-primary mb-1'>
            Review Your Order <i className='fas fa-chevron-right'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect()(Checkout);
