import React, { useState } from 'react';
import { connect } from 'react-redux';

import ProfileAddress from '../profile/ProfileAddress';
import ReviewOrderPayment from './ReviewOrderPayment';
import './ReviewOrder.css';

export const ReviewOrder = () => {
  const [differentShippingAddress, setDifferentShippingAddress] = useState(
    false
  );

  const onChange = (e) => {
    console.log(e.target.name);
    setDifferentShippingAddress(!differentShippingAddress);
  };

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Review Your Order
      </h1>
      <ProfileAddress reviewOrder={true} />
      <ReviewOrderPayment />
    </div>
  );
};

export default connect()(ReviewOrder);
