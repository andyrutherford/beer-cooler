const initialState = {
  user: null,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGIN_USER_ERROR':
    case 'SIGNUP_USER_ERROR':
    default:
      return state;
  }
}
