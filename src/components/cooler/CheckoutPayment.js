import React, { useState } from 'react';
import { connect } from 'react-redux';

import { savePayment } from '../../actions/profile-action';

export const CheckoutPayment = ({ savePayment, payment }) => {
  const [formData, setFormData] = useState({
    cardName: payment.cardName ? payment.cardName : '',
    cardNumber: payment.cardNumber ? payment.cardNumber : '',
    cardCvc: payment.cardCvc ? payment.cardCvC : '',
    expMonth: payment.expMonth ? payment.expMonth : '',
    expYear: payment.expYear ? payment.expYear : '',
    message: '',
  });
  const { cardName, cardNumber, cardCvc, expMonth, expYear } = formData;

  const onChange = (e) => {
    if (e.target.name === 'cardNumber') {
      if (e.target.value.length <= 16) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      } else return;
    }
    if (e.target.name === 'cardCvc') {
      if (e.target.value.length <= 4) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      } else return;
    }
    if (e.target.name === 'expMonth' || e.target.name === 'expYear') {
      if (e.target.value.length <= 2) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      } else return;
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      error: '',
    });
    if (cardName && cardNumber && cardCvc && expMonth && expYear) {
      setFormData({
        ...formData,
        message: 'Payment information saved.',
      });
      console.log(formData);
      savePayment(formData);
    } else {
      setFormData({
        ...formData,
        message: 'All payment fields are required.',
      });
    }
  };

  return (
    <div>
      <h2>
        <i className='fas fa-wallet'></i> Payment
      </h2>
      <form onSubmit={onSubmit}>
        <div className='d-flex justify-content-between'>
          <div className='form-group w-50 pr-2'>
            <label className='control-label'>Name on Card</label>
            <div className='controls'>
              <input
                name='cardName'
                type='text'
                className='form-control'
                onChange={onChange}
                value={cardName}
              />
            </div>
            <div className='d-flex justify-content-between'>
              <div className='form-group w-75 pr-2'>
                <label className='control-label'>Card Number</label>
                <div className='controls'>
                  <input
                    name='cardNumber'
                    type='string'
                    className='form-control'
                    onChange={onChange}
                    value={cardNumber}
                  />
                </div>
              </div>
              <div className='form-group w-25 pr-2'>
                <label className='control-label'>CVC</label>
                <div className='controls'>
                  <input
                    name='cardCvc'
                    type='number'
                    className='form-control'
                    onChange={onChange}
                    value={cardCvc}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='form-group w-50 pr-2'>
                <label className='control-label'>Exp. Month (MM)</label>
                <div className='controls'>
                  <input
                    name='expMonth'
                    type='number'
                    max={12}
                    className='form-control'
                    onChange={onChange}
                    value={expMonth}
                  />
                </div>
              </div>
              <div className='form-group w-50 pr-2'>
                <label className='control-label'>Exp. Year (YY)</label>
                <div className='controls'>
                  <input
                    name='expYear'
                    type='number'
                    className='form-control'
                    onChange={onChange}
                    value={expYear}
                  />
                </div>
              </div>
            </div>
            <div className='form-group d-flex justify-content-between'>
              <input
                type='submit'
                value='Save'
                className='btn btn-primary float-left'
              />
              {formData.message &&
                formData.message === 'Payment information saved.' && (
                  <p className='text-success'>{formData.message}</p>
                )}
              {formData.message &&
                formData.message === 'All payment fields are required.' && (
                  <p className='text-danger'>{formData.message}</p>
                )}
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='alert alert-info'>
              Please choose your method of payment and hit continue. You will
              then be sent down to pay using your selected payment option.
            </div>
            <br />
            <div className='btn-group-vertical btn-block'>
              <a
                className='btn btn-default text-left'
                data-toggle='tab'
                href='#stripe'
              >
                Stripe/Credit Card
              </a>
              <a
                className='btn btn-default text-left'
                data-toggle='tab'
                href='#paypal'
              >
                Cash on Delivery (COD)
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.profile.payment,
});

export default connect(mapStateToProps, { savePayment })(CheckoutPayment);
