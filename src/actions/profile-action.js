import api from '../utils/api';
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
  console.log(addressData, guest);
  if (guest) {
    return dispatch({
      type: 'UPDATE_ADDRESS',
      payload: addressData,
    });
  }
  try {
    const res = await api.post('/profile/address', addressData);
    console.log(res.data);
    dispatch({
      type: 'UPDATE_ADDRESS',
      payload: res.data.profile.address,
    });
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: error.message,
    });
  }
};

export const savePayment = (paymentData) => async (dispatch) => {
  paymentData.cardNumber =
    'XXXXXXXXXXXX' + paymentData.cardNumber.slice(12, 16);
  try {
    const res = await api.post('/profile/payment', paymentData);
    console.log(res.data);
    dispatch({
      type: 'SAVE_PAYMENT',
      payload: res.data.profile.payment,
    });
  } catch (error) {
    console.log(error.message);
  }
};
