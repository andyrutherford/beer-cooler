import React, { useState } from 'react';
import { connect } from 'react-redux';

import { savePayment } from '../../actions/profile-action';
import { setAlert } from '../../actions/alert-action';

export const CheckoutPayment = ({
  savePayment,
  setAlert,
  payment,
  paymentValid,
  addressValid,
  guest,
}) => {
  const [formData, setFormData] = useState({
    cardName: payment.cardName || '',
    cardNumber: payment.cardNumber || '',
    cardCvc: payment.cardCvc || '',
    expMonth: payment.expMonth || '',
    expYear: payment.expYear || '',
  });

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const { cardName, cardNumber, cardCvc, expMonth, expYear } = formData;

  const onChange = (e) => {
    setPaymentConfirmed(false);
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
      setPaymentConfirmed(true);
    } else {
      setAlert('All payment fields are required.');
    }
  };

  const submitButton = () => {
    if (paymentConfirmed) {
      return (
        <span>
          <i className='fas fa-check'></i> Payment Confirmed
        </span>
      );
    } else {
      return (
        <span>
          <i className='fas fa-save'></i> Confirm Payment
        </span>
      );
    }
  };

  return (
    <div className='mt-4'>
      <h2>
        <i className='fas fa-wallet'></i> Payment
      </h2>
      <form onSubmit={onSubmit}>
        <div className='d-block d-md-flex justify-content-between'>
          <div className='form-group col px-0 w-sm-50'>
            <div className='form-group'>
              <label>Name on Card</label>
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
                <label>Card Number</label>
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
                <label>CVC</label>
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
                <label>Exp. Month (MM)</label>
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
                <label>Exp. Year (YY)</label>
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
                {submitButton()}
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

          <div className='my-auto col w-sm-50'>
            <div className='alert my-4'>
              Please confirm your address and payment before reviewing your
              order.
              <ul className='p-3'>
                {addressValid ? (
                  <li>
                    <i className='fas fa-check text-success'></i>{' '}
                    <span className='text-muted'>
                      <s>Confirm your address</s>
                    </span>
                  </li>
                ) : (
                  <span>
                    <i className='fas fa-exclamation-circle text-danger'></i>{' '}
                    Confirm your address
                  </span>
                )}

                <li>
                  {paymentValid ? (
                    <span>
                      <i className='fas fa-check text-success'></i>{' '}
                      <span className='text-muted'>
                        <s>Confirm your payment</s>
                      </span>
                    </span>
                  ) : (
                    <span>
                      <i className='fas fa-exclamation-circle text-danger'></i>{' '}
                      Confirm your payment
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.profile.payment,
  paymentValid: state.cooler.paymentValid,
  addressValid: state.cooler.addressValid,
});

export default connect(mapStateToProps, { savePayment, setAlert })(
  CheckoutPayment
);
