import React from 'react';

export const CoolerItem = ({ item }) => {
  return (
    <li className='cooler-item'>
      <div>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div>
        <p>{item.name}</p>
        <p>Description: {item.description}</p>
        <p>ABV: {item.abv}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </li>
  );
};
