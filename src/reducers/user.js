const initialState = {
  user: null,
  isAuthenticated: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
