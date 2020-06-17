import { setAlert } from './alert-action';
import api from '../utils/api';

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
      type: 'COOLER_ADD_PRODUCT',
      payload: product,
    });
    dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));
    return;
  }

  // If user is logged in, save item in db
  try {
    await api.post('/profile/cooler', productData);
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

export const coolerRemoveProduct = (id, name) => async (dispatch) => {
  try {
    await api.delete(`/profile/cooler/${id}`);
    dispatch(setAlert(`${name} has been removed.`));
    dispatch({
      type: 'COOLER_REMOVE_PRODUCT',
      payload: id,
    });
    dispatch(coolerGetQuantity());
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'COOLER_ERROR',
    });
    setAlert('A problem has occurred.');
  }
};

export const coolerRemoveAll = () => async (dispatch) => {
  try {
    await api.delete('/profile/cooler');
    dispatch({
      type: 'COOLER_REMOVE_ALL',
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'COOLER_ERROR',
    });
    dispatch(setAlert('A problem has occurred.'));
  }
};

export const coolerCheckout = () => (dispatch) => {
  dispatch({
    type: 'COOLER_CHECKOUT',
  });
};

export const coolerPlaceOrder = (order) => async (dispatch) => {
  console.log(order);
  try {
    const res = await api.post('/orders/new', order);
    console.log(res.data);
    dispatch({
      type: 'COOLER_PLACE_ORDER',
    });
    dispatch(coolerRemoveAll());
    return res.data;
  } catch (error) {
    console.log(error.message);
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
