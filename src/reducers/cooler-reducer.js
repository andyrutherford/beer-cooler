const initialState = {
  cooler: [],
  quantity: 0,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'COOLER_GET_PRODUCTS':
      return {
        ...state,
        cooler: action.payload,
        loading: false,
      };
    case 'COOLER_GET_QUANTITY':
      return {
        ...state,
        quantity:
          state.cooler.length > 0
            ? state.cooler.map((i) => i.quantity).reduce((a, b) => a + b)
            : 0,
      };
    case 'COOLER_ADD_PRODUCT':
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
    case 'COOLER_REMOVE_PRODUCT':
      return {
        ...state,
        cooler: state.cooler.filter((i) => i.id !== action.payload),
      };
    case 'COOLER_REMOVE_ALL':
      return {
        ...state,
        cooler: [],
      };
    case 'COOLER_UPDATE_QUANTITY':
      const update = state.cooler.find((i) => i.id === action.payload.id);
      update.quantity = action.payload.quantity;
      return {
        ...state,
        cooler: state.cooler.map((i) =>
          i.id !== action.payload.id ? i : update
        ),
      };
    default:
      return state;
  }
}
