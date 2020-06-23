import api from '../utils/api';
import { setAlert } from './alert-action';
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data.profile,
    });
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: error.message,
    });
  }
};

export const updateAddress = (addressData, guest) => async (dispatch) => {
  if (guest) {
    dispatch({ type: 'COOLER_ADDRESS_VALID' });
    dispatch(setAlert('Your address has been confirmed.'));
    return dispatch({
      type: 'UPDATE_ADDRESS',
      payload: addressData,
    });
  }
  try {
    const res = await api.post('/profile/address', addressData);
    dispatch({
      type: 'UPDATE_ADDRESS',
      payload: res.data.profile.address,
    });
    dispatch({ type: 'COOLER_ADDRESS_VALID' });
    dispatch(setAlert('Your address has been confirmed.'));
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: error.message,
    });
  }
};

export const savePayment = (paymentData, guest) => async (dispatch) => {
  paymentData.cardNumber =
    'XXXXXXXXXXXX' + paymentData.cardNumber.slice(12, 16);

  if (guest) {
    dispatch({ type: 'COOLER_PAYMENT_VALID' });
    dispatch(setAlert('Your payment method has been confirmed.'));
    return dispatch({
      type: 'SAVE_PAYMENT',
      payload: paymentData,
    });
  }

  try {
    const res = await api.post('/profile/payment', paymentData);
    dispatch({
      type: 'SAVE_PAYMENT',
      payload: res.data.profile.payment,
    });
    dispatch({ type: 'COOLER_PAYMENT_VALID' });
    dispatch(setAlert('Your payment method has been confirmed.'));
  } catch (error) {
    console.log(error.message);
  }
};
