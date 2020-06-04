import { setAlert } from './alert-action';
import api from '../utils/api';
import axios from 'axios';

export const coolerGetProducts = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/cooler');

    const ids = res.data.profileCooler.map((i) => i.id).join('|');

    const res2 = await axios.get(`https://api.punkapi.com/v2/beers?ids=${ids}`);

    dispatch({
      type: 'COOLER_GET_PRODUCTS',
      payload: res2.data,
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
  const productData = {
    cooler: [{ id: product.id, quantity }],
  };
  const res = await api.post('/profile/cooler', productData);

  dispatch({
    type: 'COOLER_ADD_PRODUCT',
    payload: product,
  });

  dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));
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
