export const coolerGetProducts = () => (dispatch) => {
  console.log('get items in cooler action');
  dispatch({
    type: 'COOLER_GET_PRODUCTS',
  });
};
