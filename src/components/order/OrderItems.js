import React from 'react';

export const OrderItems = ({ cooler }) => {
  return (
    <div className='card-body'>
      <h2 className='mb-2'>
        <i className='fas fa-beer'></i> My Items
      </h2>
      <h6 className='card-subtitle mb-3 text-muted'>
        The following items will be delivered to you:
      </h6>
      <ul>
        {cooler.map((i, index) => (
          <li key={index}>
            {i.quantity}x {i.name}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};
