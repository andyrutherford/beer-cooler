import React, { useState } from 'react';
import { connect } from 'react-redux';

import ProfileAddress from '../profile/ProfileAddress';
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

      <h2>
        <i className='fas fa-wallet'></i> Payment
      </h2>
      <form>
        <div className='d-flex justify-content-between'>
          <div className='form-group w-50 pr-2'>
            <label className='control-label'>Name on Card</label>
            <div className='controls'>
              <input
                name='address1'
                type='text'
                className='form-control'
                onChange={onChange}
              />
            </div>
            <div className='d-flex justify-content-between'>
              <div className='form-group w-75 pr-2'>
                <label className='control-label'>Card Number</label>
                <div className='controls'>
                  <input
                    name='address1'
                    type='text'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='form-group w-25 pr-2'>
                <label className='control-label'>CVC</label>
                <div className='controls'>
                  <input
                    name='address1'
                    type='text'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='form-group w-50 pr-2'>
                <label className='control-label'>Exp. Month</label>
                <div className='controls'>
                  <input
                    name='address1'
                    type='text'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='form-group w-50 pr-2'>
                <label className='control-label'>Exp. Year</label>
                <div className='controls'>
                  <input
                    name='address1'
                    type='text'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-6'>
            <label class='control-label'></label>

            <div class='alert alert-info'>
              Please choose your method of payment and hit continue. You will
              then be sent down to pay using your selected payment option.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect()(ReviewOrder);
