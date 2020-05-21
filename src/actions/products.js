import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  console.log('getProducts action');
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
