import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { coolerPlaceOrder } from '../../actions/cooler-action';
import { OrderAddress } from '../order/OrderAddress';
import { OrderPayment } from '../order/OrderPayment';
import { OrderItems } from '../order/OrderItems';

export const ReviewOrder = ({
  checkout,
  address,
  payment,
  cooler,
  coolerPlaceOrder,
}) => {
  const history = useHistory();
  const [message, setMessage] = useState('');

  // TODO
  // Redirect user from this page if checkout is false

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
      const res = await coolerPlaceOrder(newOrder);
      console.log(res.order._id);

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
  address: state.profile.address,
  payment: state.profile.payment,
  cooler: state.cooler.cooler,
});

export default connect(mapStateToProps, { coolerPlaceOrder })(ReviewOrder);
