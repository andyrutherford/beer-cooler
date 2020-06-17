import React from 'react';
import { Link } from 'react-router-dom';

export const OrderPayment = ({ payment, review }) => {
  return (
    <div className='card-body'>
      <h2 className='mb-2'>
        <i className='fas fa-wallet'></i> Payment
      </h2>
      <h6 className='card-subtitle mb-3 text-muted'>Your payment method:</h6>
      <ul>
        <li>{payment.cardName}</li>
        <li>{payment.cardNumber}</li>
        {review && (
          <li>
            Exp. {payment.expMonth}/{payment.expYear}
          </li>
        )}
        {review && (
          <Link to='/checkout' className='card-link float-right'>
            Edit
          </Link>
        )}
      </ul>
    </div>
  );
};
