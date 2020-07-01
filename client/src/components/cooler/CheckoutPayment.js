import React, { useState } from 'react';
import { connect } from 'react-redux';

import { savePayment } from '../../actions/profile-action';
import { setAlert } from '../../actions/alert-action';

export const CheckoutPayment = ({ savePayment, setAlert, payment, guest }) => {
  const [formData, setFormData] = useState({
    cardName: payment.cardName || '',
    cardNumber: payment.cardNumber || '',
    cardCvc: payment.cardCvc || '',
    expMonth: payment.expMonth || '',
    expYear: payment.expYear || '',
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
      savePayment(formData, guest);
    } else {
      setAlert('All payment fields are required.');
    }
  };

  return (
    <div className='mt-4'>
      <h2>
        <i className='fas fa-wallet'></i> Payment
      </h2>
      <form onSubmit={onSubmit}>
        <div className='d-block d-sm-flex justify-content-between'>
          <div className='form-group w-sm-50'>
            <div className='form-group'>
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
            </div>
            <div className='row d-flex justify-content-between'>
              <div className='col-9 form-group'>
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
              <div className='col-3 form-group pl-0'>
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
            <div className='row d-flex justify-content-between'>
              <div className='form-group col w-50 pr-2'>
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
              <div className='form-group col w-50 pl-2'>
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
              <button className='btn btn-primary my-auto'>
                <i className='fas fa-save'></i> Confirm Payment
              </button>
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

          <div className='my-auto w-sm-50'>
            <div className='alert'>
              Please confirm your address and payment before reviewing your
              order.
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

export default connect(mapStateToProps, { savePayment, setAlert })(
  CheckoutPayment
);
