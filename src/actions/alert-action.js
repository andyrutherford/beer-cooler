import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const setAlert = (alert) => (dispatch) => {
  const id = uuidv4();
  alert = toast(alert, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
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
