const initialState = {
  current: null,
  history: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CURRENT_ORDER': {
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    }
    case 'GET_ORDER_BY_ID':
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case 'GET_ALL_USER_ORDERS':
      return {
        ...state,
        history: action.payload,
        loading: false,
      };
    case 'CLEAR_ORDERS':
      return {
        ...state,
        current: null,
        history: [],
        loading: false,
      };
    default:
      return state;
  }
}
