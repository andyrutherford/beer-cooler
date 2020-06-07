import { setAlert } from './alert-action';
import { clearCoolerLogout, coolerGetProducts } from './cooler-action';
import api from '../utils/api';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
    dispatch(coolerGetProducts());
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/signup', userData, config);
    // const createProfile = await api.post('/profile');
    // console.log(createProfile.data);
    dispatch({
      type: 'SIGNUP_USER',
      payload: res.data,
    });

    dispatch(setAlert('user registration successful'));
  } catch (error) {
    dispatch({
      type: 'SIGNUP_USER_ERROR',
    });

    dispatch(setAlert(error.response.data.error));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/login', userData, config);
    dispatch({
      type: 'LOGIN_USER',
      payload: res.data,
    });
    dispatch(coolerGetProducts());
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'LOGIN_USER_ERROR',
    });
    dispatch(setAlert(error.response.data.error));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT_USER',
  });
  dispatch(clearCoolerLogout());
  dispatch(setAlert('You have successfully logged out.'));
};
