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
  cooler: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PROFILE': {
      return {
        ...state,
        address: action.payload.address,
        cooler: action.payload.cooler,
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
    case 'CLEAR_PROFILE': {
      return {
        ...state,
        address: null,
        loading: false,
        cooler: [],
      };
    }
    default:
      return state;
  }
}
