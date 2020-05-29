import { setAlert } from './alert-action';

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

export const coolerAddProduct = (beer, quantity) => (dispatch) => {
  dispatch(setAlert(`${quantity}x ${beer.name} added to cooler.`));

  // Add a quantity field to item
  const product = { ...beer, quantity };

  dispatch({
    type: 'COOLER_ADD_PRODUCT',
    payload: product,
  });
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
