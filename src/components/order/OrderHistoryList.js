import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils/formatDate';

export const OrderHistoryList = ({ history }) => {
  return (
    <ul className='list-group list-group-flush'>
      {history.map((i) => (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          {' '}
          <Link to={`/my-orders/${i._id}`} key={i._id}>
            {i.orderId}
          </Link>
          <span>{formatDate(i.date)}</span>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  history: state.order.history,
});

export default connect(mapStateToProps)(OrderHistoryList);
