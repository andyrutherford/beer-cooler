const initialState = {
  cooler: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'COOLER_GET_PRODUCTS':
      return {
        ...state,
      };
    case 'COOLER_ADD_PRODUCT':
      // If item is already in cooler, increment quantity
      const itemExists = state.cooler.find((i) => i.id === action.payload.id);

      if (itemExists) {
        const updateQuantity = {
          ...itemExists,
          quantity: itemExists.quantity++,
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
    default:
      return state;
  }
}
