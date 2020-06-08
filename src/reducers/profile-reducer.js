const initialState = {
  address: {
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
  },
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
    case 'UPDATE_ADDRESS': {
      return {
        ...state,
        address: action.payload,
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
