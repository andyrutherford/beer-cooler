import api from '../utils/api';

export const getOrderById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/orders/${id}`);

    dispatch({
      type: 'GET_ORDER_BY_ID',
      payload: res.data.order,
    });
  } catch (error) {
    console.log(error.message);
  }
};
