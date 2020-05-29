import { combineReducers } from 'redux';
import products from './products-reducer';
import cooler from './cooler-reducer';
import alert from './alert-reducer';
import auth from './auth-reducer';
export default combineReducers({
  products,
  cooler,
  alert,
  auth,
});
