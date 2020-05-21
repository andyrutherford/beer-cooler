import { combineReducers } from 'redux';
import products from './products';
import cooler from './cooler';
export default combineReducers({
  products,
  cooler,
});
