const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      console.log('get products reducer');
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
