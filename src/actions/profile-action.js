import { setAlert } from './alert-action';
import api from '../utils/api';
export const getCurrentProfile = () => async (dispatch) => {
  try {
    console.log('get profile');
    const res = await api.get('/profile/me');
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: 'profile error',
    });
  }
};
