import { combineReducers } from 'redux';
import products from './products';
import cooler from './cooler';
import alert from './alert';
import user from './user';
export default combineReducers({
  products,
  cooler,
  alert,
  user,
});
