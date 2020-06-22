import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getOrderById } from '../../actions/order-action';
import { formatDate } from '../../utils/formatDate';

import { OrderAddress } from './OrderAddress';
import { OrderPayment } from './OrderPayment';
import { OrderItems } from './OrderItems';
import { coolerRemoveAll } from '../../actions/cooler-action';

export const OrderComplete = ({
  match,
  getOrderById,
  order,
  isAuthenticated,
  coolerRemoveAll,
}) => {
  const location = useLocation();

  // Make sure isAuth is true from userLoaded before getting order
  useEffect(() => {
    if (!order && isAuthenticated) {
      getOrderById(match.params.id);
    }
  }, [isAuthenticated, order, getOrderById, match]);

  useEffect(() => {
    if (location.state.newOrder && isAuthenticated) {
      coolerRemoveAll();
    }
  }, [location, isAuthenticated, coolerRemoveAll]);

  return (
    <>
      {order && (
        <div>
          {location.state.newOrder && (
            <div>
              <h1 className='display-4'>
                <i className='fas fa-check'></i> Your order has been placed
              </h1>
              <p>Your order is still processing, and will be shipped soon.</p>
            </div>
          )}
          <div className='card card-body'>
            <h1>Order #{order.orderId}</h1>
            <p className='text-muted'>
              <i className='far fa-calendar-alt'></i> Submitted on{' '}
              {formatDate(order.date)}
            </p>
          </div>
          <div className='d-flex justify-content-between'>
            <div>
              <div className='card'>
                <OrderAddress address={order.address} />
              </div>
              <div className='card'>
                <OrderPayment payment={order.payment} />
              </div>
            </div>
            <div className='card'>
              <OrderItems cooler={order.cooler} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.current,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getOrderById, coolerRemoveAll })(
  OrderComplete
);
