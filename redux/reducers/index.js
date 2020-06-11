// export default reducers;
import { combineReducers } from 'redux';
import checkout from "./checkout"; 
import product from './product';
import user from './user';
import chart from './chart';

export default combineReducers({
  user,
  chart,
  product,
  checkout
})