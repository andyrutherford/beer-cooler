import { setAlert } from './alert-action';
import api from '../utils/api';
import axios from 'axios';

export const coolerGetProducts = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/cooler');

    dispatch({
      type: 'COOLER_GET_PRODUCTS',
      payload: res.data.profileCooler,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'COOLER_ERROR',
    });
    setAlert('A problem has occurred.');
  }
};

export const coolerGetQuantity = () => (dispatch) => {
  dispatch({
    type: 'COOLER_GET_QUANTITY',
  });
};

export const coolerAddProduct = (beer, quantity) => async (dispatch) => {
  // Add a quantity field to item
  const product = { ...beer, quantity };
  console.log(product);
  const productData = {
    cooler: [product],
  };
  console.log(productData);
  try {
    const res = await api.post('/profile/cooler', productData);
    console.log(product);
    console.log(res.data);
    dispatch({
      type: 'COOLER_ADD_PRODUCT',
      payload: product,
    });
    dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'COOLER_ERROR',
    });
    setAlert('A problem has occurred.');
  }
};

export const coolerRemoveProduct = (id, name) => (dispatch) => {
  dispatch(setAlert(`${name} has been removed.`));
  dispatch({
    type: 'COOLER_REMOVE_PRODUCT',
    payload: id,
  });
  dispatch(coolerGetQuantity());
};

export const coolerRemoveAll = () => (dispatch) => {
  try {
    api.delete('/profile/cooler');
    dispatch({
      type: 'COOLER_REMOVE_ALL',
    });
    setAlert('Your cart has been emptied.');
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'COOLER_ERROR',
    });
    setAlert('A problem has occurred.');
  }
};

export const clearCoolerLogout = () => (dispatch) => {
  dispatch({
    type: 'COOLER_REMOVE_ALL',
  });
};

export const coolerUpdateQuantity = (id, quantity) => (dispatch) => {
  dispatch({
    type: 'COOLER_UPDATE_QUANTITY',
    payload: { id, quantity },
  });
  dispatch(coolerGetQuantity());
};
