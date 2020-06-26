import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  UPDATE_ADDRESS,
  UPDATE_PAYMENT,
} from '../actions/types';

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
  payment: {
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
  },
  loading: true,
  error: {},
  cooler: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        address: action.payload.address ? action.payload.address : {},
        cooler: action.payload.cooler ? action.payload.cooler : [],
        payment: action.payload.payment ? action.payload.payment : {},
        loading: false,
      };
    }
    case UPDATE_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case PROFILE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        address: {
          fullName: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          postCode: '',
          country: '',
        },
        payment: {
          cardName: '',
          cardNumber: '',
          expMonth: '',
          expYear: '',
        },
        error: {},
        loading: false,
        cooler: [],
      };
    }
    case UPDATE_PAYMENT: {
      return {
        ...state,
        payment: action.payload,
      };
    }
    default:
      return state;
  }
}
