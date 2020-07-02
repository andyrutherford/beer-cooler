import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

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
  const newOrder = location.state || false;

  // Make sure isAuth is true from userLoaded before getting order
  useEffect(() => {
    if (isAuthenticated) {
      getOrderById(match.params.id);
    }
  }, [isAuthenticated, getOrderById, match]);

  useEffect(() => {
    if (newOrder) {
      const guest = !isAuthenticated;
      coolerRemoveAll(guest);
    }
  }, [newOrder, isAuthenticated, coolerRemoveAll]);

  return (
    <div className='order-container'>
      {order && (
        <div>
          {isAuthenticated && (
            <div className='d-flex justify-content-between mb-3'>
              <Link to='/my-profile'>
                <button className='btn btn-link'>
                  <i className='fas fa-user' /> My Profile
                </button>
              </Link>
              <Link to='/my-orders'>
                <button className='btn btn-link'>
                  <i className='fas fa-list-alt'></i> My Orders
                </button>
              </Link>
            </div>
          )}
          {newOrder && (
            <div>
              <h1 className='display-5'>
                <i className='fas fa-check text-success'></i> Your order has
                been placed
              </h1>
              <p>Your order is still processing, and will be shipped soon.</p>
            </div>
          )}
          <div className='card card-body'>
            <h1>Order #{order.orderId}</h1>
            <p className='text-muted mb-0'>
              <i className='far fa-calendar-alt'></i> Submitted on{' '}
              {formatDate(order.date)}
            </p>
          </div>
          <div className='d-block d-sm-flex justify-content-center'>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.current,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getOrderById, coolerRemoveAll })(
  OrderComplete
);
