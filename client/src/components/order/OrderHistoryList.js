import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils/formatDate';

export const OrderHistoryList = ({ history }) => {
  const getQuantity = (item) => {
    return item.cooler.reduce((acc, i) => {
      return acc + i.quantity;
    }, 0);
  };

  return (
    <ul className='list-group list-group-flush'>
      {history.map((i) => (
        <li
          className='list-group-item d-flex justify-content-between align-items-center'
          key={i._id}
        >
          <span>
            <Link to={`/my-orders/${i._id}`}>#{i.orderId}</Link> -{' '}
            {getQuantity(i)} Items
          </span>

          <span className='text-muted'>
            <i className='far fa-calendar-alt'></i> {formatDate(i.date)}
          </span>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  history: state.order.history,
});

export default connect(mapStateToProps)(OrderHistoryList);
