import { setAlert } from './alert-action';
import { clearCoolerLogout, getCooler } from './cooler-action';
import { getCurrentProfile } from './profile-action';
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
    dispatch(getCooler());
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
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
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
    dispatch({
      type: 'COOLER_CHECKOUT_AS_MEMBER',
    });
    dispatch(loadUser());
    dispatch(getCurrentProfile());
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
  dispatch({ type: 'CLEAR_PROFILE' });
  dispatch({ type: 'CLEAR_ORDERS' });
  dispatch(clearCoolerLogout());

  dispatch(setAlert('You have successfully logged out.'));
};

export const changePassword = (userData) => async (dispatch) => {
  try {
    const res = await api.put('/auth', userData);
    dispatch({
      type: 'PASSWORD_CHANGE_SUCCESS',
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg));
  } catch (error) {
    dispatch(setAlert(error.response.data.error));
  }
};

export const deleteUser = () => async (dispatch) => {
  if (window.confirm('Are you sure?  This cannot be undone.')) {
    try {
      await api.delete('/auth');
      dispatch({
        type: 'DELETE_USER',
      });
      dispatch(setAlert('Your account has been successfully deleted.'));
    } catch (error) {
      dispatch(setAlert(error.response.data.error));
    }
  }
};
