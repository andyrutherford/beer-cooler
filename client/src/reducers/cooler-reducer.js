import {
  GET_COOLER,
  COOLER_GET_QUANTITY,
  COOLER_ADD_PRODUCT,
  COOLER_REMOVE_PRODUCT,
  COOLER_CHECKOUT,
  COOLER_REVIEW,
  COOLER_CHECKOUT_AS_GUEST,
  COOLER_CHECKOUT_AS_MEMBER,
  COOLER_ADDRESS_VALID,
  COOLER_PAYMENT_VALID,
  COOLER_ADDRESS_INVALID,
  COOLER_PAYMENT_INVALID,
  COOLER_PLACE_ORDER,
  COOLER_REMOVE_ALL,
  COOLER_UPDATE_QUANTITY,
  COOLER_ERROR,
} from '../actions/types';

const initialState = {
  cooler: [],
  quantity: 0,
  loading: true,
  checkout: false,
  checkoutAsGuest: false,
  addressValid: false,
  paymentValid: false,
  review: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COOLER:
      return {
        ...state,
        cooler: action.payload,
        loading: false,
      };
    case COOLER_GET_QUANTITY:
      return {
        ...state,
        quantity:
          state.cooler.length > 0
            ? state.cooler.map((i) => i.quantity).reduce((a, b) => a + b)
            : 0,
      };
    case COOLER_ADD_PRODUCT:
      // If item is already in cooler, increment quantity
      const itemExists = state.cooler.find((i) => i.id === action.payload.id);

      if (itemExists) {
        const updateQuantity = {
          ...itemExists,
          quantity: (itemExists.quantity += action.payload.quantity),
        };
        return {
          ...state,
          cooler: state.cooler.filter((i) =>
            i.id === updateQuantity.id ? updateQuantity : i
          ),
        };
      } else {
        return {
          ...state,
          cooler: state.cooler.concat(action.payload),
        };
      }
    case COOLER_REMOVE_PRODUCT:
      return {
        ...state,
        cooler: state.cooler.filter((i) => i.id !== action.payload),
      };
    case COOLER_CHECKOUT:
      return {
        ...state,
        checkout: true,
      };
    case COOLER_REVIEW:
      return {
        ...state,
        review: true,
      };
    case COOLER_CHECKOUT_AS_GUEST:
      return {
        ...state,
        checkoutAsGuest: true,
      };
    case COOLER_CHECKOUT_AS_MEMBER:
      return {
        ...state,
        checkoutAsGuest: false,
      };
    case COOLER_ADDRESS_VALID:
      return {
        ...state,
        addressValid: true,
      };
    case COOLER_ADDRESS_INVALID:
      return {
        ...state,
        addressValid: false,
      };
    case COOLER_PAYMENT_VALID:
      return {
        ...state,
        paymentValid: true,
      };
    case COOLER_PAYMENT_INVALID:
      return {
        ...state,
        paymentValid: false,
      };
    case COOLER_PLACE_ORDER:
      return {
        ...state,
        review: true,
      };
    case COOLER_REMOVE_ALL:
      return {
        ...state,
        cooler: [],
        review: false,
        checkout: false,
        loading: false,
      };
    case COOLER_UPDATE_QUANTITY:
      const update = state.cooler.find((i) => i.id === action.payload.id);
      update.quantity = action.payload.quantity;
      return {
        ...state,
        cooler: state.cooler.map((i) =>
          i.id !== action.payload.id ? i : update
        ),
      };
    case COOLER_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
