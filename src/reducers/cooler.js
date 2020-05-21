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
    default:
      return state;
  }
}
