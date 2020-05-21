const initialState = {
  cooler: [],
};

export default function (state = initialState, action) {
  console.log('cooler reducer');
  switch (action.type) {
    case 'COOLER_GET_PRODUCTS':
      return {
        ...state,
      };
    case 'COOLER_ADD_PRODUCT':
      return {
        ...state,
        cooler: state.cooler.concat(action.payload),
      };
    default:
      return state;
  }
}
