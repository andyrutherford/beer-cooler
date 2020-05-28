import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const signupUser = (userData) => async (dispatch) => {
  console.log(userData);

  try {
    const res = await axios.post('/api/v1/users', userData, config);
    dispatch({
      type: 'SIGNUP_USER',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_USER_ERROR',
      payload: error.reponse.data.error,
    });
  }
};
