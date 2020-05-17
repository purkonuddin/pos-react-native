// export default reducers;
import { combineReducers } from 'redux';
// import user from "./user";
import checkout from "./checkout";
// import cart from './cart'
import product from './product';
import user from './user';

export default combineReducers({
  user,
  // cart,
  product,
  checkout
})