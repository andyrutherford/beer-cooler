import React from 'react';
import { Link } from 'react-router-dom';

export const OrderAddress = ({ address, review }) => {
  return (
    <div className='card-body'>
      <h2 className='mb-2'>
        <i className='fas fa-shipping-fast'></i> Shipping Address
      </h2>
      <h6 className='card-subtitle mb-3 text-muted'>
        Your order will be delivered to:
      </h6>
      <ul>
        <li>{address.fullName}</li>
        <li>
          {address.address1} {address.address2}
        </li>
        <li>
          {address.city}, {address.state}
        </li>
        <li>{address.postCode}</li>
        <li>{address.country}</li>
      </ul>
      {review && (
        <Link to='/checkout' className='card-link float-right'>
          Edit
        </Link>
      )}
    </div>
  );
};
