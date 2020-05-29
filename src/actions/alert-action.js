import { v4 as uuidv4 } from 'uuid';

export const setAlert = (alert) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: 'SET_ALERT',
    payload: { alert, id },
  });

  setTimeout(() => {
    dispatch({
      type: 'REMOVE_ALERT',
      payload: id,
    });
  }, 5000);
};
