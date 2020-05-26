import { setAlert } from './alert';

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

export const coolerAddProduct = (beer) => (dispatch) => {
  dispatch(setAlert('Item added to cooler.'));

  // Add a quantity field to item
  const product = { ...beer, quantity: 1 };

  dispatch({
    type: 'COOLER_ADD_PRODUCT',
    payload: product,
  });
};
