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
        profile: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
