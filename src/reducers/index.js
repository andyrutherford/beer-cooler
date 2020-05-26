import { combineReducers } from 'redux';
import products from './products';
import cooler from './cooler';
import alert from './alert';
export default combineReducers({
  products,
  cooler,
  alert,
});
