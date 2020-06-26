import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllUserOrders } from '../../actions/order-action';

import OrderHistoryList from './OrderHistoryList';
import Spinner from '../layout/Spinner';

const OrderHistory = ({ getAllUserOrders, history, loading }) => {
  useEffect(() => {
    getAllUserOrders();
  }, [getAllUserOrders]);

  if (loading) {
    return <Spinner />;
  }

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
};

const mapStateToProps = (state) => ({
  history: state.order.history,
  loading: state.order.loading,
});

export default connect(mapStateToProps, { getAllUserOrders })(OrderHistory);
