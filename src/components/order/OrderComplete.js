import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getOrderById } from '../../actions/order-action';
import { formatAddress, formatDate } from '../../utils/formatDate';

import { OrderAddress } from './OrderAddress';
import { OrderPayment } from './OrderPayment';
import { OrderItems } from './OrderItems';

export const OrderComplete = ({
  match,
  getOrderById,
  order,
  isAuthenticated,
  newOrder,
}) => {
  const location = useLocation();
  const orderId = match.params.id;

  // Make sure isAuth is true from userLoaded before getting order
  useEffect(() => {
    getOrderById(match.params.id);
  }, [isAuthenticated]);

  return (
    <>
      {order && (
        <div>
          {location.state && (
            <div>
              <h1 className='display-4'>
                <i className='fas fa-check'></i> Your order has been placed
              </h1>
              <p>Your order is still processing, and will be shipped soon.</p>
            </div>
          )}
          <div className='card card-body'>
            <h2>Order {order.orderId}</h2>
            <p className='text-muted'>
              Order submitted on {formatDate(order.date)}
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
          <button onClick={() => getOrderById(match.params.id)}>Click</button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.current,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getOrderById })(OrderComplete);
