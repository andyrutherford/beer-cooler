const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PROFILE': {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case 'PROFILE_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
