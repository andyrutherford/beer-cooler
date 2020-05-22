export const coolerGetProducts = () => (dispatch) => {
  console.log('get items in cooler action');
  dispatch({
    type: 'COOLER_GET_PRODUCTS',
  });
};

export const coolerAddProduct = (beer) => (dispatch) => {
  // Add a quantity field to item
  const product = { ...beer, quantity: 1 };

  dispatch({
    type: 'COOLER_ADD_PRODUCT',
    payload: product,
  });
};
