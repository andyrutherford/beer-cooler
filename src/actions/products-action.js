import axios from 'axios';

import {
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID,
  CLEAR_SELECTED_PRODUCT,
} from './types';

export const getProducts = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.punkapi.com/v2/beers?page=${page}`
    );

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.slice(0, res.data.length - 1),
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: err.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);

    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data[0],
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: err.message,
    });
  }
};

export const clearSelectedProduct = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELECTED_PRODUCT,
  });
};
