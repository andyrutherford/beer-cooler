import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { coolerPlaceOrder, coolerReview } from '../../actions/cooler-action';
import { OrderAddress } from '../order/OrderAddress';
import { OrderPayment } from '../order/OrderPayment';
import { OrderItems } from '../order/OrderItems';

import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert-action';

export const ReviewOrder = ({
  checkout,
  address,
  payment,
  cooler,
  coolerPlaceOrder,
  checkoutAsGuest,
  coolerReview,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkout === false) {
      history.push('/checkout');
    }
  }, [checkout, history]);

  if (loading) {
    return <Spinner message='Submitting your order...' />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        history.push(`/my-orders/${res.order._id}`, { newOrder: true });
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlert('A problem occurred.  Please try again.');
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
