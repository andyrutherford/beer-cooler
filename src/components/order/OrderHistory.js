import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllUserOrders } from '../../actions/order-action';

import OrderHistoryList from './OrderHistoryList';

const OrderHistory = ({ getAllUserOrders, history }) => {
  useEffect(() => {
    getAllUserOrders();
  }, [getAllUserOrders]);

  return (
    <div>
      <h1 className='large'>
        <i className='fas fa-history'></i> My Orders
      </h1>
      {history.length < 1 ? (
        <h3>
          <i className='fas fa-exclamation-circle'></i> You have no previous or
          existing orders.
        </h3>
      ) : (
        <OrderHistoryList />
      )}
    </div>
  );

  //   If user has orders display order list
  //      If no orders, show message
};

const mapStateToProps = (state) => ({
  history: state.order.history,
});

export default connect(mapStateToProps, { getAllUserOrders })(OrderHistory);
