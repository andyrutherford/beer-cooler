import { setAlert } from './alert-action';
import api from '../utils/api';

import {
  GET_COOLER,
  COOLER_ERROR,
  COOLER_ADD_PRODUCT,
  COOLER_REMOVE_PRODUCT,
  COOLER_CHECKOUT,
  COOLER_REVIEW,
  COOLER_CHECKOUT_AS_GUEST,
  COOLER_CHECKOUT_AS_MEMBER,
  COOLER_PLACE_ORDER,
  LOAD_CURRENT_ORDER,
  COOLER_REMOVE_ALL,
  COOLER_UPDATE_QUANTITY,
} from './types';

export const getCooler = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/cooler');
    dispatch({
      type: GET_COOLER,
      payload: res.data.profileCooler,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};

export const coolerAddProduct = (beer, quantity, isAuthenticated) => async (
  dispatch
) => {
  // Add a quantity field to item
  const product = { ...beer, quantity };
  const productData = {
    cooler: [product],
  };

  // If user is not logged in, add item to frontend cooler only
  if (!isAuthenticated) {
    dispatch({
      type: COOLER_ADD_PRODUCT,
      payload: product,
    });
    dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));
    return;
  }

  // If user is logged in, save item in db
  try {
    await api.post('/profile/cooler', productData);
    dispatch({
      type: COOLER_ADD_PRODUCT,
      payload: product,
    });
    dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};

export const coolerRemoveProduct = (id, name) => async (dispatch) => {
  try {
    await api.delete(`/profile/cooler/${id}`);
    dispatch(setAlert(`${name} has been removed.`));
    dispatch({
      type: COOLER_REMOVE_PRODUCT,
      payload: id,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};

export const coolerRemoveAll = (guest) => async (dispatch) => {
  if (guest) {
    return dispatch({ type: COOLER_REMOVE_ALL });
  }
  try {
    await api.delete('/profile/cooler');
    dispatch({
      type: COOLER_REMOVE_ALL,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};

export const coolerCheckout = () => (dispatch) => {
  dispatch({
    type: COOLER_CHECKOUT,
  });
};

export const coolerReview = () => (dispatch) => {
  dispatch({
    type: COOLER_REVIEW,
  });
};

export const coolerCheckoutAsGuest = () => (dispatch) => {
  dispatch({
    type: COOLER_CHECKOUT_AS_GUEST,
  });
};

export const coolerCheckoutAsMember = () => (dispatch) => {
  dispatch({
    type: COOLER_CHECKOUT_AS_MEMBER,
  });
};

export const coolerPlaceOrder = (order, checkoutAsGuest) => async (
  dispatch
) => {
  try {
    const res = await api.post(
      checkoutAsGuest ? '/orders/guest-new' : '/orders/new',
      order
    );
    dispatch({
      type: COOLER_PLACE_ORDER,
    });
    dispatch({
      type: LOAD_CURRENT_ORDER,
      payload: res.data.order,
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};

export const clearCoolerLogout = () => (dispatch) => {
  dispatch({
    type: COOLER_REMOVE_ALL,
  });
};

export const coolerUpdateQuantity = (id, name, quantity, guest) => async (
  dispatch
) => {
  if (guest) {
    dispatch({
      type: COOLER_UPDATE_QUANTITY,
      payload: { id, quantity },
    });
    return dispatch(setAlert(`The quantity of ${name} has been updated.`));
  }

  try {
    await api.put('/profile/cooler', { itemId: id, quantity });
    dispatch({
      type: COOLER_UPDATE_QUANTITY,
      payload: { id, quantity },
    });
    dispatch(setAlert(`The quantity of ${name} has been updated.`));
  } catch (error) {
    console.log(error.message);
    dispatch({ type: COOLER_ERROR });
  }
};
