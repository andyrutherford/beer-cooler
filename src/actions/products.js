import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('https://api.punkapi.com/v2/beers');

    dispatch({
      type: 'GET_PRODUCTS',
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);

    dispatch({
      type: 'GET_PRODUCT_BY_ID',
      payload: res.data[0],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const clearSelectedProduct = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_SELECTED_PRODUCT',
  });
};
