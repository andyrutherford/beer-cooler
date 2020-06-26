import {
  USER_LOADED,
  SIGNUP_USER,
  LOGIN_USER,
  PASSWORD_CHANGE_SUCCESS,
  DELETE_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  LOGIN_USER_ERROR,
  SIGNUP_USER_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: {
    name: null,
    email: null,
  },
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SIGNUP_USER:
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: { email: action.payload.email, name: action.payload.name },
        isAuthenticated: true,
        loading: false,
      };
    case PASSWORD_CHANGE_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER:
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_USER_ERROR:
    case SIGNUP_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
