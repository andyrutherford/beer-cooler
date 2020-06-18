import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileAddress from '../profile/ProfileAddress';
import CheckoutPayment from './CheckoutPayment';

import { getCurrentProfile } from '../../actions/profile-action';
import { coolerCheckout } from '../../actions/cooler-action';

export const Checkout = ({
  coolerCheckout,
  getCurrentProfile,
  isAuthenticated,
  address,
  payment,
}) => {
  useEffect(() => {
    console.log('abc');
    getCurrentProfile();
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    coolerCheckout();
  };

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Checkout
      </h1>
      {address.fullName && <ProfileAddress className='mb-5' />}
      {payment.cardName && <CheckoutPayment />}
      <div className='form-actions d-flex justify-content-between'>
        <Link to='/cooler' className='btn pull-left btn-link text-muted pl-0'>
          Back
        </Link>
        <div>
          <Link to='/' className='btn btn-link text-muted mr-3'>
            Reset
          </Link>

          <Link to='/review-order'>
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
  isAuthenticated: state.auth.isAuthenticated,
  address: state.profile.address,
  payment: state.profile.payment,
});

export default connect(mapStateToProps, { coolerCheckout, getCurrentProfile })(
  Checkout
);
