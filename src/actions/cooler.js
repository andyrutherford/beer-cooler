export const coolerGetProducts = () => (dispatch) => {
  console.log('get items in cooler action');
  dispatch({
    type: 'COOLER_GET_PRODUCTS',
  });
};

export const coolerAddProduct = (id) => (dispatch) => {
  console.log('cooler add product');
  dispatch({
    type: 'COOLER_ADD_PRODUCT',
    payload: id,
  });
};
