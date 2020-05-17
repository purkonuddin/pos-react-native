import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import {CLEAR_CART, ADD_CART, PLUS_ITEM_CART, REDUCE_ITEM_CART, REDUCE_CART} from '../types';
// export const getAllProduct = () => {
//   return {
//     type: "GET_PRODUCT", // string yang mendiskripsikan perintah
//     payload: Axios.get("http://localhost:8080/api/product", {headers: {
//           "x-access-token": localStorage.getItem("token")
//         }})
//   };
// };

export const clearCart = () => {
  return {
    type: "CLEAR_CART" 
  };
};

export const addToCart = item => {
  return {
    type: "ADD_CART",
    payload: item
  };
};

export const reduceCart = id =>{
  return {
    type: "REDUCE_CART",
    payload: id
  }
}

export const plusItemOnCart = id =>{
  return {
    type: "PLUS_ITEM_CART",
    payload: id
  }
}

export const reduceItemOnCart = id =>{
  return {
    type: "REDUCE_ITEM_CART",
    payload: id
  }
}

export const getProducts = () => {
  return {
    type: "GET_PRODUCT",
    payload: Axios.get(`${REACT_APP_URL_STRING}product`, {
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  };
};

export const pagingProducts = (page, per) => {
  return { 
      type: "PAGING_PRODUCT",
      payload: Axios.get(`${REACT_APP_URL_STRING}pagination/products?page=${page}&limit=${per}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        } 
    })
  }  
};