const initialState = {
  products: [],
  selectedProduct: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'GET_PRODUCT_BY_ID':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case 'CLEAR_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: null,
      };
    default:
      return state;
  }
}
