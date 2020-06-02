const initialState = {
  token: localStorage.getItem('token'),
  user: {
    name: null,
    email: null,
  },
  isAuthenticated: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'SIGNUP_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'LOGIN_USER_ERROR':
    case 'SIGNUP_USER_ERROR':
    default:
      return state;
  }
}
