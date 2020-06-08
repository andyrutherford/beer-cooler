import { setAlert } from './alert-action';
import api from '../utils/api';
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data.profile,
    });
    setAlert('Your address has been updated.');
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: error.message,
    });
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
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
