import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export const ReviewOrder = ({ checkout, address, payment }) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkout) {
      history.push('/cooler');
    }
  }, [checkout, history]);

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Review Your Order
      </h1>
      <div className='d-flex justify-content-between'>
        <div>
          <h2>
            <i className='fas fa-shipping-fast'></i> Shipping Address
          </h2>
          <div className='card'>
            <p>Your order will be delivered to: </p>
            <p>{address.fullName}</p>
            <p>{address.address1}</p>
            <p>{address.address2}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.postcode}</p>
            <p>{address.country}</p>
          </div>
          <h2>
            <i className='fas fa-wallet'></i> Payment
          </h2>
          <div className='card'>
            <p>{payment.cardName}</p>
            <p>{payment.cardNumber}</p>
            <p>
              Exp. {payment.expMonth}/{payment.expYear}
            </p>
          </div>
        </div>
        <div>My Order</div>
      </div>

      <div className='form-actions d-flex justify-content-between'>
        <Link to='/cooler' className='btn pull-left btn-link text-muted pl-0'>
          Back
        </Link>

        <Link to='/review_order'>
          <button type='submit' className='btn btn-primary mb-1'>
            Place Your Order <i className='fas fa-chevron-right'></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.cooler.checkout,
  address: state.profile.address,
  payment: state.profile.payment,
});

export default connect(mapStateToProps)(ReviewOrder);
