import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { coolerPlaceOrder, coolerReview } from '../../actions/cooler-action';
import { OrderAddress } from '../order/OrderAddress';
import { OrderPayment } from '../order/OrderPayment';
import { OrderItems } from '../order/OrderItems';

export const ReviewOrder = ({
  checkout,
  review,
  address,
  payment,
  cooler,
  coolerPlaceOrder,
  checkoutAsGuest,
  coolerReview,
}) => {
  const history = useHistory();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (checkout === false) {
      history.push('/checkout');
    }
  }, [checkout, history]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing your order...');

    const coolerItems = cooler.map((i) => ({
      name: i.name,
      quantity: i.quantity,
    }));

    const newOrder = {
      address,
      payment: {
        cardName: payment.cardName,
        cardNumber: payment.cardNumber,
      },
      cooler: coolerItems,
    };

    try {
      const res = await coolerPlaceOrder(newOrder, checkoutAsGuest);
      coolerReview();
      setTimeout(() => {
        setMessage('');
        history.push(`/my-orders/${res.order._id}`, { newOrder: true });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Review Your Order
      </h1>
      <div className='d-flex justify-content-between'>
        <div>
          <div className='card'>
            <OrderAddress address={address} review={true} />
          </div>
          <div className='card'>
            <OrderPayment payment={payment} review={true} />
          </div>
        </div>
        <div className='card'>
          <OrderItems cooler={cooler} />
        </div>
      </div>

      <div className='form-actions d-flex justify-content-between mt-4'>
        <Link to='/checkout' className='btn pull-left btn-link text-muted pl-0'>
          Back
        </Link>

        <Link to='/review_order'>
          <button
            type='submit'
            className='btn btn-primary btn-lg mb-1'
            onClick={onSubmit}
          >
            Place Your Order <i className='fas fa-chevron-right'></i>
          </button>
        </Link>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.cooler.checkout,
  review: state.cooler.review,
  address: state.profile.address,
  payment: state.profile.payment,
  cooler: state.cooler.cooler,
  checkoutAsGuest: state.cooler.checkoutAsGuest,
});

export default connect(mapStateToProps, {
  coolerPlaceOrder,
  coolerReview,
})(ReviewOrder);
