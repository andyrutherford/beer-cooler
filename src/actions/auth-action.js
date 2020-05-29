import axios from 'axios';

import { setAlert } from './alert-action';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/v1/auth/signup', userData, config);
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
    const res = await axios.post('/api/v1/auth/login', userData, config);
    dispatch({
      type: 'LOGIN_USER',
      payload: res.data,
    });
  } catch (error) {
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
  dispatch(setAlert('You have successfully logged out.'));
};
