import { ADD_FRIEND, GET_USERS } from '../types';
import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import Axios from 'react-native-axios'; 

export const getUsers = () => (
  {
    type: 'GET_USERS',
    payload: Axios.get(`${REACT_APP_URL_STRING}user`, {
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    })
  }
);

var ApiUtils = {  
  checkStatus: function(response) {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};

export const login = (id, password) => { 
  return{
    type: 'LOGIN',
    payload: Axios.post(`${REACT_APP_URL_STRING}user/login2`, {id:id, password:password, headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded', 
    }}) 
  }
};

export const logout = (id) => { 
  return{
    type: 'LOGOUT',
    payload: 'logout'
  }
};
