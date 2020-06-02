import { setAlert } from './alert-action';
import api from '../utils/api';

export const coolerGetProducts = () => (dispatch) => {
  dispatch({
    type: 'COOLER_GET_PRODUCTS',
  });
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

export const coolerUpdateQuantity = (id, quantity) => (dispatch) => {
  dispatch({
    type: 'COOLER_UPDATE_QUANTITY',
    payload: { id, quantity },
  });
  dispatch(coolerGetQuantity());
};
