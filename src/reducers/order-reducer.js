const initialState = {
  current: null,
  history: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_BY_ID':
      return {
        ...state,
        current: action.payload,
      };
    case 'GET_ALL_USER_ORDERS':
      return {
        ...state,
        history: action.payload,
      };
    case 'CLEAR_ORDERS':
      return {
        ...state,
        current: null,
        history: [],
      };
    default:
      return state;
  }
}
