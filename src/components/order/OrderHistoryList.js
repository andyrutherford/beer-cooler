import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const OrderHistoryList = ({ history }) => {
  return (
    <ul className='list-group list-group-flush'>
      {history.map((i) => (
        <Link
          to={`/my-orders/${i._id}`}
          className='list-group-item d-flex justify-content-between'
          key={i._id}
        >
          {i._id}
          {i.date}
        </Link>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  history: state.order.history,
});

export default connect(mapStateToProps)(OrderHistoryList);
